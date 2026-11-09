import type { PropsWithChildren } from 'react'
import { Text } from '@tarojs/components'

export type PillProps = PropsWithChildren<{ tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'; className?: string }>

export function Pill({
  children,
  tone = 'neutral',
  className = ''
}: PillProps) {
  return <Text className={`pill pill--${tone} ${className}`.trim()}>{children}</Text>
}
