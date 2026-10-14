import { Input, Text, View } from '@tarojs/components'

export type AppFieldProps = {
  label: string
  leading?: string
  value: string
  placeholder?: string
  password?: boolean
  maxLength?: number
  className?: string
  onChange: (value: string) => void
}

export function AppField({
  label,
  leading,
  value,
  placeholder,
  password = false,
  maxLength = 140,
  className = '',
  onChange
}: AppFieldProps) {
  return (
    <View className={`app-field ${className}`}>
      <Text className='app-field__label'>{label}</Text>
      <View className={`app-field__frame ${leading ? 'app-field__frame--with-leading' : 'app-field__frame--plain'}`}>
        {leading && (
          <View className='app-field__leading' aria-hidden>
            <Text className='app-field__leading-text'>{leading}</Text>
          </View>
        )}
        <Input
          className='app-field__control'
          value={value}
          password={password}
          maxlength={maxLength}
          placeholder={placeholder}
          onInput={event => onChange(event.detail.value)}
        />
      </View>
    </View>
  )
}
