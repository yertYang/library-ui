import type { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'

export type CardProps = PropsWithChildren<{
  className?: string
  /** 内容内边距；图片等铺满容器的场景使用 none。 */
  padding?: 'none' | 'normal' | 'large'
  /** 轻色容器，用于概览指标或重点信息。 */
  tone?: 'default' | 'mint' | 'sage'
  onClick?: () => void
}>

export function Card({
  children,
  className = '',
  padding = 'normal',
  tone = 'default',
  onClick
}: CardProps) {
  return (
    <View
      className={`card card--padding-${padding} card--${tone} ${className}`}
      hoverClass={onClick ? 'card--pressed' : 'none'}
      hoverStayTime={100}
      onClick={onClick}
    >
      {children}
    </View>
  )
}
