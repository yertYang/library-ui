# Library UI

面向 **React 18 + Taro 4.2** 的独立组件库，适用于 H5 和微信小程序。提供 13 个展示组件、完整 TypeScript Props 类型、统一设计变量和 Sass 样式。

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
| `Card` | 卡片 | `children`、`className`、`onClick` |
| `Pill` | 状态标签 | `tone`、`children` |
| `SectionTitle` | 分区标题 | `children`、`action`、`onAction` |
| `AppIcon` | CSS 图标 | `name: AppIconName`、`className` |
| `Segmented<T>` | 分段选择 | `value`、`options`、`onChange`；选项支持数字 `badge` |
| `ListFooter` | 分页底部 | `visible`、`hasMore`、`loadingMore`、`total`、`onLoadMore` |
| `AsyncState` | 加载、错误、空内容、后台刷新 | `loading`、`error`、`empty`、`refreshing`、`onRetry` 及文案参数 |
| `InlineNotice` | 行内提示 | `tone`、`children`、`className` |
| `ServiceNotice` | 带图标的提示卡片 | `title`、`description`、`icon`、`tone`、操作区 `children` |
| `PageLayout` | 页面框架 | `title`、`subtitle`、`back`、`onBack`、`headerAction`、`footer`、`style`、`appearance` |
| `BottomNavigation<T>` | 受控底部导航 | `items`、`active`、`pending`、`onChange` |

`AppButton.variant` 支持 `primary / secondary / ghost / danger`；`Pill.tone` 支持 `neutral / primary / success / warning / danger`。输入框和分段选择是受控组件，回调后由调用方更新值。

`AsyncState` 优先级为加载 → 错误 → 空内容 → 后台刷新，可用 `loadingTitle / loadingDescription / errorTitle / retryLabel / emptyTitle / emptyDescription` 定制文案。错误状态只调用传入的 `onRetry`，不会自行跳转。

`BottomNavigation` 的每个选项包含 `key / label / icon`，可以附带应用自己的字段。点击当前项或存在 `pending` 时不触发切换；宿主应在异步导航期间设置 `pending`，并在结束后清除。`ListFooter.onLoadMore` 的异步去重也由宿主负责。

`PageLayout.footer` 传入底部导航时自动预留底部空间。自定义导航栏的状态栏和菜单胶囊高度由宿主测量，通过 `style={{ '--page-safe-area-top': '48px' } as React.CSSProperties}` 注入；未设置时使用 CSS 安全区。`appearance` 用于宿主页面重新显示时触发短暂入场动画。

## 统一主题

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

`npm run check` 执行严格类型检查、组件行为测试和 Sass 编译。测试覆盖加载及禁用按钮、受控输入、分段选项、异步状态优先级、分页回调、导航待处理状态和页面插槽；运行时依赖检查阻止引入业务模块。

代码按单组件文件维护在 `src/`，公共出口位于 `src/index.ts`。增加组件时同步导出组件及 Props、引入对应样式并补充行为测试。兼容修改递增补丁版本，新增能力递增次版本，破坏性修改递增主版本；更新 `package.json` 后创建同名 `vX.Y.Z` 标签。

当前许可标记为 `UNLICENSED`（保留权利）；公开源码不自动授予开源许可证。
