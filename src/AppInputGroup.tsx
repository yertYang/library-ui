import type { ReactNode } from 'react'
import { View } from '@tarojs/components'

export type AppInputGroupProps = {
  /** 使用 variant='plain' 的 AppInput；输入事件与受控值由宿主管理。 */
  children: ReactNode
  /** 单位、说明或操作按钮。 */
  trailing?: ReactNode
  className?: string
}

/** 为输入框与单位/按钮提供统一外框和聚焦反馈。 */
export function AppInputGroup({ children, trailing, className = '' }: AppInputGroupProps) {
  return (
    <View className={`app-input-group ${className}`.trim()}>
      {children}
      {trailing != null && <View className='app-input-group__trailing'>{trailing}</View>}
    </View>
  )
}
