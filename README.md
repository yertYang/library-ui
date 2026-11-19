# Library UI

面向 **React 18 + Taro 4.2** 的独立组件库，适用于 H5 和微信小程序。提供展示与表单组件、完整 TypeScript Props 类型、统一设计变量和 Sass 样式。

## 组件文档站（共享书屋工作区）

在共享书屋仓库的 `frontend/` 目录运行 `npm run dev:ui`，打开 `http://127.0.0.1:10087/`。文档站包含组件分类与搜索、真实交互示例、可复制的示例源码、从 Props 自动生成的属性/事件/插槽表，以及品牌色预览。可通过地址中的 `component` 参数分享指定组件，浏览器后退也可恢复上一页。

运行 `npm run build:ui` 生成独立静态站到 `frontend/ui-docs-dist/`，然后运行 `npm run preview:ui` 本地预览。业务 H5 和小程序使用各自的入口与输出目录（`dist/`、`dist-weapp/`），不会包含文档站。Props 变更后运行 `npm run docs:api` 更新文档类型；示例源码与运行示例来自同一文件。

组件文档站随共享书屋仓库维护，不包含在本仓库中。本仓库 `main` 已同步组件源码；以下 GitHub `v0.1.0` 安装方式仍对应旧的固定版本，新组件尚未发布新标签。

指标摘要使用 `MetricStrip`，每项接受唯一名称 `label`、数值 `value` 和可选的 `unit`、`detail`。组合输入使用 `AppInputGroup`。新挂载的栏目可用 `ui-content-enter` 短暂淡入，系统开启减少动态效果时直接显示。

这是一套基础组件库，尚未覆盖 Element Plus 的全部后台能力。已提供基础输入、多行输入、搜索和受控选择器；表单规则校验、通用弹窗、表格、分页、日期选择、上传等仍需后续建设。

## 安装

当前通过 GitHub 分发，尚未发布到 npm registry。建议固定版本：

```bash
npm install git+https://github.com/yertYang/library-ui.git#v0.1.0
```

也可以使用 `npm install github:yertYang/library-ui` 跟随仓库默认分支。安装后的包名是 `@library/ui`，导入时使用这个名称。

本包交付 TypeScript/TSX 和 Sass 源码，由宿主 Taro 编译器完成跨端转换、`rpx` 适配和打包；并非可直接在 Node.js 中执行的 JavaScript 包，也不是原生 DOM React 组件库。宿主需安装 React 18、`@tarojs/components` 4.2.1 或兼容的 4.x，以及 Sass。适配基准宽度为 750。

## 使用

在应用入口统一引入一次样式；JavaScript 入口不隐式引入全局样式：

```tsx
// app.tsx
import '@library/ui/styles.scss'
```

```tsx
import { useState } from 'react'
import { AppButton, AppField, Card, PageLayout, SectionTitle } from '@library/ui'
import type { AppButtonProps } from '@library/ui'

export default function Example() {
  const [name, setName] = useState('')
  const button: AppButtonProps = { variant: 'primary', block: true }

  return (
    <PageLayout title='示例页面'>
      <SectionTitle>基本资料</SectionTitle>
      <Card>
        <AppField label='名称' value={name} onChange={setName} />
        <AppButton {...button} onClick={() => console.log(name)}>保存</AppButton>
      </Card>
    </PageLayout>
  )
}
```

组件库只处理展示和用户交互回调。登录状态、业务接口、路由跳转、权限、图片地址及原生生命周期由宿主应用负责。

## 组件

所有组件均从 `@library/ui` 导出，并提供同名 `组件名Props` 类型。

| 组件 | 用途 | 主要参数 |
| --- | --- | --- |
| `AppButton` | 按钮 | `variant`、`size`、`block`、`loading`、`disabled`、`formType`、`onClick` |
| `AppField` | 输入框 | `label`、`leading`、`value`、`placeholder`、`password`、`maxLength`、`onChange` |
| `AppInput` / `AppTextarea` | 基础输入 | Taro 原生输入属性、`variant`；保留微信授权、输入法和确认事件能力 |
| `AppSearchField` | 搜索框 | `value`、`onChange`、`onSearch`、`onClear`、`placeholder` |
| `AppSelect` | 选择器 | `value`、`options`、`onChange`、`disabled`、`onOpenChange` |
| `Card` | 卡片 | `children`、`padding`、`tone`、`className`、`onClick` |
| `Pill` | 状态标签 | `tone`、`children` |
| `SectionTitle` | 分区标题 | `children`、`action`、`onAction` |
| `AppIcon` | CSS 图标 | `name: AppIconName`、`className` |
| `Segmented<T>` | 分段选择 | `value`、`options`、`onChange`；选项支持数字 `badge` |
| `ListFooter` | 分页底部 | `visible`、`hasMore`、`loadingMore`、`total`、`onLoadMore` |
| `AsyncState` | 加载、错误、空内容、后台刷新 | `loading`、`error`、`empty`、`refreshing`、`onRetry` 及文案参数 |
| `InlineNotice` | 行内提示 | `tone`、`children`、`className` |
| `ServiceNotice` | 带图标的提示卡片 | `title`、`description`、`icon`、`tone`、操作区 `children` |
| `PageLayout` | 页面框架 | `title`、`subtitle`、`back`、`onBack`、`headerAction`、`footer`、`style`、`appearance` |
| `StatusActions` | 状态文字与一至两个等宽操作按钮，手机分行展示 | `status`、`primary`、`secondary` |
| `BottomNavigation<T>` | 受控底部导航 | `items`、`active`、`pending`、`onChange` |

`AppButton.leadingIcon / trailingIcon` 接受组件库图标名称，用于带图标的标准按钮。

`AppButton.variant` 支持 `primary / secondary / ghost / danger / unstyled`；`Pill.tone` 支持 `neutral / primary / success / warning / danger`。输入框和分段选择是受控组件，回调后由调用方更新值。

`Card.padding` 默认 `normal`（40rpx），支持 `none`（0）和 `large`（48rpx）。不要在同一层同时叠加业务 padding 和组件内层 padding。共享书屋原有自定义卡片通过业务适配层保持页面管理的留白；新建内容卡片可显式使用 `padding='normal'`。

`Card.tone` 支持 `default / mint / sage`。轻色卡片用于概览指标和重点内容，普通表单与列表继续使用白色容器。后台、H5 和微信小程序共用浅绿底深绿字的主按钮、白底浅边框的次要按钮和淡绿辅助按钮；桌面（801px 起）使用 42px 主按钮、34px 小按钮与固定字号，移动端保留触控尺寸。后台概览已复用轻色卡片。

`AppField` 使用 80rpx 高的容器和左右 24rpx 的内边距，统一 H5 内部原生输入框的高度、字体与边框；聚焦反馈由外框提供。`Pill` 按内容取宽，不会在 grid/flex 容器里撑满整行。

`AsyncState` 优先级为加载 → 错误 → 空内容 → 后台刷新，可用 `loadingTitle / loadingDescription / errorTitle / retryLabel / emptyTitle / emptyDescription` 定制文案。错误状态只调用传入的 `onRetry`，不会自行跳转。

`BottomNavigation` 的每个选项包含 `key / label / icon`，可以附带应用自己的字段。点击当前项或存在 `pending` 时不触发切换；宿主应在异步导航期间设置 `pending`，并在结束后清除。`ListFooter.onLoadMore` 的异步去重也由宿主负责。

`PageLayout.footer` 传入底部导航时自动预留底部空间。自定义导航栏的状态栏和菜单胶囊高度由宿主测量，通过 `style={{ '--page-safe-area-top': '48px' } as React.CSSProperties}` 注入；未设置时使用 CSS 安全区。`appearance` 用于宿主页面重新显示时触发短暂入场动画。

## 统一主题

控件共用 `--radius-control`（桌面 10px，手机 24rpx）；卡片使用 `--radius-card`，弹窗使用 `--radius-dialog`，标签使用 `--radius-tag`。标签共用高度、字号和内边距，必填状态只改变颜色与文字。头像、加载环和图标保留其圆形或绘制形状。

桌面主标题 24px、分区标题 18px、常规按钮 14px、小按钮 13px、标签 12px；手机分别使用 40/32/28/26/22rpx。页面不得另设标准按钮字号和圆角。`AppButton` 透传原生按钮属性，`unstyled` 用于微信授权按钮、图标按钮和复合卡片等需要自定义布局的场景，不把其子节点包入文字容器。

所有主题变量位于 [`styles/theme.scss`](styles/theme.scss)，组件样式按模块位于 `styles/_*.scss`。业务项目可在组件库样式之后加载覆盖值：

```scss
// theme-overrides.scss
page,
body,
#app {
  --color-primary: #315f8a;
  --color-primary-dark: #204666;
  --color-primary-soft: #e7eff7;
  --button-radius: 16rpx;
  --radius-xl: 24rpx;
  --duration-fast: 0.12s;
}
```

```tsx
import '@library/ui/styles.scss'
import './theme-overrides.scss'
```

仅需主题变量时可引入 `@library/ui/theme.scss`。组件样式包含自身必要的盒模型、按钮重置、底部安全区和减少动效适配；应用根节点的字体、背景、页面重置和 Taro 原生弹窗样式由宿主设置。部分类名保留通用名称（如 `.card`），同页接入其他组件库时需避免类名冲突。

## 独立开发与验证

```bash
git clone https://github.com/yertYang/library-ui.git
cd library-ui
npm ci
npm run check
npm pack --dry-run
```

本仓库的 `npm run check` 执行类型检查、组件行为测试和 Sass 编译。

代码按单组件文件维护在 `src/`，公共出口位于 `src/index.ts`。增加组件时同步导出组件及 Props、引入对应样式并补充行为测试。兼容修改递增补丁版本，新增能力递增次版本，破坏性修改递增主版本；更新 `package.json` 后创建同名 `vX.Y.Z` 标签。

当前许可标记为 `UNLICENSED`（保留权利）；公开源码不自动授予开源许可证。

### 设置列表与 AI 导航

`SettingsList` 使用无内边距的卡片，`SettingsRow` 固定维护左右 `--space-lg` 留白和内缩分隔线，避免卡片 padding 样式覆盖造成文字贴边。支持 `title`、`description`、`danger`、`disabled`、`trailing` 和 `onClick`。个人中心、账号与隐私页面已共用。

`BottomNavigationItem.prominent` 可突出中间入口。`AppIcon` 增加 `chat`、`voice`、`send`、`compose`，适用于手机对话界面。文档站包含五项底部导航和设置列表示例。
