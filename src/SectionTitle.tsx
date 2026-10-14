import type { PropsWithChildren } from 'react'
import { Text, View } from '@tarojs/components'

export type SectionTitleProps = PropsWithChildren<{ action?: string; onAction?: () => void }>

export function SectionTitle({
  children,
  action,
  onAction
}: SectionTitleProps) {
  return (
    <View className='section-title'>
      <Text className='section-title__text'>{children}</Text>
      {action && <Text className='section-title__action' onClick={onAction}>{action}</Text>}
    </View>
  )
}
