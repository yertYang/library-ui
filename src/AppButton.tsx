import type { PropsWithChildren } from 'react'
import { Button, Text, View } from '@tarojs/components'
import type { ButtonProps } from '@tarojs/components'

export type AppButtonProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'normal' | 'small'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  formType?: ButtonProps['formType']
  onClick?: () => void
}>

export function AppButton({
  children,
  variant = 'primary',
  size = 'normal',
  block = false,
  loading = false,
  disabled = false,
  formType,
  onClick
}: AppButtonProps) {
  const inactive = disabled || loading

  return (
    <Button
      className={`app-button app-button--${variant} app-button--${size} ${block ? 'app-button--block' : ''} ${loading ? 'is-loading' : ''} ${disabled && !loading ? 'is-disabled' : ''}`}
      disabled={inactive || undefined}
      formType={formType}
      hoverClass={inactive ? 'none' : 'app-button--pressed'}
      hoverStayTime={80}
      onClick={inactive ? undefined : onClick}
    >
      {loading && <View className='app-button__spinner' />}
      <Text className='app-button__label'>{children}</Text>
    </Button>
  )
}
