import type { PropsWithChildren, ReactNode } from 'react'
import { Text, View } from '@tarojs/components'
import { AppIcon } from './AppIcon'
import { Card } from './Card'

export type SettingsListProps = PropsWithChildren<{ className?: string }>
export function SettingsList({ children, className = '' }: SettingsListProps) {
  return <Card padding='none' className={`settings-list ${className}`}>{children}</Card>
}

export type SettingsRowProps = {
  title: string
  description?: string
  danger?: boolean
  disabled?: boolean
  trailing?: ReactNode
  onClick?: () => void
}
/** Each row owns its horizontal inset, independent of Card padding or load order. */
export function SettingsRow({ title, description, danger = false, disabled = false, trailing, onClick }: SettingsRowProps) {
  return (
    <View className={`settings-row ${danger ? 'settings-row--danger' : ''} ${disabled ? 'is-disabled' : ''}`} aria-disabled={disabled} hoverClass={onClick && !disabled ? 'settings-row--pressed' : 'none'} onClick={disabled ? undefined : onClick}>
      <View className='settings-row__content'><Text className='settings-row__title'>{title}</Text>{description && <Text className='settings-row__copy'>{description}</Text>}</View>
      {trailing ?? (onClick && <AppIcon name='chevron-right' />)}
    </View>
  )
}
