import type { PropsWithChildren } from 'react'
import { Text, View } from '@tarojs/components'
import { AppIcon, type AppIconName } from './AppIcon'
import { Card } from './Card'

export type ServiceNoticeProps = PropsWithChildren<{
  title: string
  description: string
  icon?: AppIconName
  tone?: 'primary' | 'warning'
  className?: string
}>

export function ServiceNotice({
  title,
  description,
  icon = 'book',
  tone = 'primary',
  className = '',
  children
}: ServiceNoticeProps) {
  return (
    <Card className={`service-notice service-notice--${tone} ${className}`}>
      <View className='service-notice__header'>
        <View className='service-notice__mark'>
          <AppIcon name={icon} />
        </View>
        <Text className='service-notice__title'>{title}</Text>
      </View>
      <Text className='service-notice__description'>{description}</Text>
      {children && <View className='service-notice__actions'>{children}</View>}
    </Card>
  )
}
