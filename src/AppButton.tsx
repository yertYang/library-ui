import type { PropsWithChildren } from 'react'
import { Button, Text, View } from '@tarojs/components'
import type { ButtonProps } from '@tarojs/components'

import { AppIcon, type AppIconName } from './AppIcon'

export type AppButtonProps = PropsWithChildren<Omit<ButtonProps, 'size' | 'loading' | 'children'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'unstyled'
  size?: 'normal' | 'small'
  leadingIcon?: AppIconName
  trailingIcon?: AppIconName
  block?: boolean
  loading?: boolean
  disabled?: boolean
}>

export function AppButton({
  children,
  variant = 'primary',
  size = 'normal',
  leadingIcon, trailingIcon,
  block = false,
  loading = false,
  disabled = false,
  formType,
  onClick,
  className = '',
  hoverClass,
  ...props
}: AppButtonProps) {
  const inactive = disabled || loading

  return (
    <Button
      {...props}
      className={`${variant === 'unstyled' ? 'app-action' : `app-button app-button--${variant} app-button--${size}`} ${block ? 'app-button--block' : ''} ${loading ? 'is-loading' : ''} ${disabled && !loading ? 'is-disabled' : ''} ${className}`.trim()}
      disabled={inactive || undefined}
      formType={formType}
      hoverClass={inactive ? 'none' : hoverClass || 'app-button--pressed'}
      hoverStayTime={80}
      onClick={inactive ? undefined : onClick}
    >
      {loading ? <View className='app-button__spinner' /> : leadingIcon && <AppIcon name={leadingIcon} />}
      {variant === 'unstyled' ? children : <Text className='app-button__label'>{children}</Text>}
      {trailingIcon && <AppIcon name={trailingIcon} />}
    </Button>
  )
}
