import type { PropsWithChildren } from 'react'
import { Text } from '@tarojs/components'

/** Presentation only: the page owns visibility, message and recovery actions. */
export type InlineNoticeProps = PropsWithChildren<{
  tone?: 'danger' | 'warning' | 'primary'
  className?: string
}>

export function InlineNotice({
  children,
  tone = 'danger',
  className = ''
}: InlineNoticeProps) {
  return <Text className={`inline-notice inline-notice--${tone} ${className}`}>{children}</Text>
}
