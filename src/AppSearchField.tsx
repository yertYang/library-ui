import { View } from '@tarojs/components'
import { AppInput } from './AppInput'
import { AppIcon } from './AppIcon'
import { AppButton } from './AppButton'

export type AppSearchFieldProps = {
  value: string
  placeholder?: string
  maxLength?: number
  className?: string
  onChange: (value: string) => void
  onSearch: () => void
  onClear?: () => void
}

export function AppSearchField({ value, placeholder = '搜索', maxLength = 80, className = '', onChange, onSearch, onClear }: AppSearchFieldProps) {
  return (
    <View className={`app-search-field ${className}`.trim()}>
      <AppIcon name='search' />
      <AppInput variant='plain' value={value} maxlength={maxLength} placeholder={placeholder} aria-label={placeholder} confirmType='search' onInput={event => onChange(event.detail.value)} onConfirm={onSearch} />
      {value && <AppButton className='app-search-field__clear' size='small' variant='ghost' onClick={() => { onChange(''); onClear?.() }}>清空</AppButton>}
      <AppButton size='small' variant='secondary' onClick={onSearch}>搜索</AppButton>
    </View>
  )
}
