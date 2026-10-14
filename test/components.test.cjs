const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const sourceRoot = path.resolve(__dirname, '../src')
const cache = new Map()
function load(filename) {
  assert.ok(filename.startsWith(sourceRoot + path.sep), 'UI must not import application code')
  if (cache.has(filename)) return cache.get(filename)
  const exports = {}
  cache.set(filename, exports)
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2017 }
  }).outputText
  vm.runInNewContext(code, { exports, require: id => {
    if (id === 'react' || id === 'react/jsx-runtime') return require(id)
    if (id === '@tarojs/components') return new Proxy({}, { get: (_, key) => key })
    assert.ok(id.startsWith('.'), `Unexpected runtime dependency: ${id}`)
    const base = path.resolve(path.dirname(filename), id)
    return load(['.ts', '.tsx'].map(ext => base + ext).find(file => fs.existsSync(file)))
  } }, { filename })
  return exports
}
const ui = load(path.join(sourceRoot, 'index.ts'))
function expand(node) {
  if (Array.isArray(node)) return node.flatMap(expand)
  if (node == null || typeof node === 'boolean') return []
  if (typeof node !== 'object') return [node]
  if (typeof node.type === 'function') return expand(node.type(node.props))
  return [{ ...node, props: { ...node.props, children: expand(node.props.children) } }]
}
const flatten = nodes => nodes.flatMap(node => typeof node === 'object' ? [node, ...flatten(node.props.children)] : [])
const text = nodes => nodes.map(node => typeof node === 'object' ? text(node.props.children) : node).join('')
const render = node => expand(node)
const byClass = (nodes, name) => flatten(nodes).find(node => node.props.className?.split(' ').includes(name))

test('public entry exports the complete component set without app or style side effects', () => {
  assert.deepEqual(Object.keys(ui).sort(), ['AppButton', 'AppField', 'AppIcon', 'AsyncState', 'BottomNavigation', 'Card', 'InlineNotice', 'ListFooter', 'PageLayout', 'Pill', 'SectionTitle', 'Segmented', 'ServiceNotice'].sort())
})

test('buttons preserve form submission and suppress clicks when loading or disabled', () => {
  let calls = 0
  const props = { children: '保存', onClick: () => calls++, formType: 'submit' }
  const active = ui.AppButton(props)
  assert.equal(active.props.formType, 'submit')
  active.props.onClick()
  assert.equal(calls, 1)
  for (const state of [{ loading: true }, { disabled: true }]) {
    const button = render(ui.AppButton({ ...props, ...state }))
    assert.equal(button[0].props.disabled, true)
    assert.equal(button[0].props.onClick, undefined)
    assert.equal(button[0].props.hoverClass, 'none')
    assert.equal(Boolean(byClass(button, 'app-button__spinner')), Boolean(state.loading))
  }
})

test('fields forward input values, password and length constraints', () => {
  let value
  const tree = render(ui.AppField({ label: '名称', value: '', password: true, maxLength: 12, onChange: next => { value = next } }))
  const input = flatten(tree).find(node => node.type === 'Input')
  assert.equal(input.props.password, true)
  assert.equal(input.props.maxlength, 12)
  input.props.onInput({ detail: { value: '新的名称' } })
  assert.equal(value, '新的名称')
})

test('segmented controls stay controlled and handle an empty option list', () => {
  const changes = []
  const tree = render(ui.Segmented({ value: 'a', options: [{ value: 'a', label: '全部' }, { value: 'b', label: '待办', badge: 3 }], onChange: next => changes.push(next) }))
  const options = flatten(tree).filter(node => node.props.className?.includes('segmented__item'))
  options[0].props.onClick(); options[1].props.onClick()
  assert.deepEqual(changes, ['b'])
  assert.equal(options[0].props['aria-selected'], true)
  assert.equal(byClass(tree, 'segmented__indicator').props.style.width, '50%')
  const empty = render(ui.Segmented({ value: 'a', options: [], onChange: () => assert.fail() }))
  assert.equal(byClass(empty, 'segmented__indicator'), undefined)
})

test('async feedback preserves state priority, text overrides and recovery callback', () => {
  let retries = 0
  const loading = render(ui.AsyncState({ loading: true, error: '失败', empty: true, loadingDescription: '正在读取资料' }))
  assert.match(text(loading), /正在读取资料/)
  assert.doesNotMatch(text(loading), /失败/)
  const error = render(ui.AsyncState({ error: '连接中断', empty: true, errorTitle: '请稍后重试', retryLabel: '再试一次', onRetry: () => retries++ }))
  assert.match(text(error), /请稍后重试连接中断再试一次/)
  byClass(error, 'app-button').props.onClick()
  assert.equal(retries, 1)
  assert.match(text(render(ui.AsyncState({ empty: true, emptyTitle: '暂无结果' }))), /暂无结果/)
  assert.ok(byClass(render(ui.AsyncState({ refreshing: true })), 'list-update'))
  assert.equal(ui.AsyncState({}), null)
})

test('navigation ignores active/pending clicks and forwards the selected item unchanged', () => {
  const changes = []
  const items = [{ key: 'home', label: '首页', icon: 'home' }, { key: 'profile', label: '我的', icon: 'user', url: '/profile' }]
  const props = { items, active: 'home', onChange: item => changes.push(item) }
  const controls = tree => flatten(tree).filter(node => node.props.className?.split(' ').includes('bottom-nav__item'))
  const ready = controls(render(ui.BottomNavigation(props)))
  ready[0].props.onClick(); ready[1].props.onClick()
  assert.deepEqual(changes, [items[1]])
  assert.equal(ready[0].props['aria-current'], 'page')
  const pending = controls(render(ui.BottomNavigation({ ...props, pending: 'profile' })))
  pending[1].props.onClick()
  assert.equal(changes.length, 1)
  assert.equal(pending[1].props['aria-busy'], true)
})

test('page layout renders slots and delegates back navigation to the caller', () => {
  let back = 0
  const style = { '--page-safe-area-top': '36px' }
  const tree = render(ui.PageLayout({ title: '示例', subtitle: '组件库', back: true, onBack: () => back++, style, appearance: 3, headerAction: '操作', children: '正文', footer: '底部' }))
  assert.equal(tree[0].props.style, style)
  assert.ok(byClass(tree, 'page-shell--with-nav'))
  assert.ok(byClass(tree, 'page-content--arrive-1'))
  assert.match(text(tree), /示例组件库操作正文底部/)
  byClass(tree, 'icon-button').props.onClick()
  assert.equal(back, 1)
  assert.ok(byClass(render(ui.PageLayout({ title: '首页' })), 'page-shell--root'))
})

test('list footer hides when requested and delegates pagination', () => {
  let loads = 0
  const props = { visible: true, hasMore: true, loadingMore: false, total: 5, onLoadMore: () => loads++ }
  byClass(render(ui.ListFooter(props)), 'list-footer__more').props.onClick()
  assert.equal(loads, 1)
  assert.equal(ui.ListFooter({ ...props, visible: false }), null)
  assert.match(text(render(ui.ListFooter({ ...props, hasMore: false, unit: '本' }))), /已显示全部 5 本/)
})
