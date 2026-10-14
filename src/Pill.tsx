import type { PropsWithChildren } from 'react'
import { Text } from '@tarojs/components'

export type PillProps = PropsWithChildren<{ tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' }>

export function Pill({
  children,
  tone = 'neutral'
}: PillProps) {
  return <Text className={`pill pill--${tone}`}>{children}</Text>
}
