import type { PropsWithChildren } from 'react'
import { View } from '@tarojs/components'

export type CardProps = PropsWithChildren<{ className?: string; onClick?: () => void }>

export function Card({
  children,
  className = '',
  onClick
}: CardProps) {
  return (
    <View
      className={`card ${className}`}
      hoverClass={onClick ? 'card--pressed' : 'none'}
      hoverStayTime={100}
      onClick={onClick}
    >
      {children}
    </View>
  )
}
