import { Input, Textarea } from '@tarojs/components'
import type { InputProps, TextareaProps } from '@tarojs/components'

export type AppInputProps = InputProps & { variant?: 'default' | 'plain'; size?: 'normal' | 'small' }
export type AppTextareaProps = TextareaProps & { variant?: 'default' | 'plain' }

/** Plain controls are for composition inside AppField and search frames. */
export function AppInput({ className = '', variant = 'default', size = 'normal', ...props }: AppInputProps) {
  return <Input {...props} className={`app-input app-input--${variant} app-input--${size} ${props.disabled ? 'is-disabled' : ''} ${className}`.trim()} />
}

export function AppTextarea({ className = '', variant = 'default', ...props }: AppTextareaProps) {
  return <Textarea {...props} className={`app-textarea app-textarea--${variant} ${props.disabled ? 'is-disabled' : ''} ${className}`.trim()} />
}
