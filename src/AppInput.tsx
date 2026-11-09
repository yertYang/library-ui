import { Input, Textarea } from '@tarojs/components'
import type { InputProps, TextareaProps } from '@tarojs/components'

export type AppInputProps = InputProps & { variant?: 'default' | 'plain' }
export type AppTextareaProps = TextareaProps & { variant?: 'default' | 'plain' }

/** Plain controls are for composition inside AppField and search frames. */
export function AppInput({ className = '', variant = 'default', ...props }: AppInputProps) {
  return <Input {...props} className={`app-input app-input--${variant} ${className}`.trim()} />
}

export function AppTextarea({ className = '', variant = 'default', ...props }: AppTextareaProps) {
  return <Textarea {...props} className={`app-textarea app-textarea--${variant} ${className}`.trim()} />
}
