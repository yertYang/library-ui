import { useState } from 'react'
import { Text, View } from '@tarojs/components'

export interface AppSelectOption {
  value: string
  label: string
  hint?: string
}

export type AppSelectProps = {
  value: string
  options: AppSelectOption[]
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  eyebrow?: string
  leadingMark?: string
  triggerLabel?: string
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AppSelect({
  value,
  options,
  onChange,
  className = '',
  placeholder = '请选择',
  eyebrow,
  leadingMark,
  triggerLabel,
  disabled = false,
  onOpenChange
}: AppSelectProps) {
  const [open, setOpen] = useState(false)
  const selected = options.find(item => item.value === value)

  function choose(nextValue: string) {
    setOpen(false)
    onOpenChange?.(false)
    if (nextValue !== value) onChange(nextValue)
  }

  return (
    <View className={`app-select ${open ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''} ${className}`.trim()}>
      {open && (
        <View
          className='app-select__backdrop'
          onClick={() => {
            setOpen(false)
            onOpenChange?.(false)
          }}
        />
      )}
      <View
        className='app-select__trigger'
        data-value={value}
        onClick={event => {
          event.stopPropagation()
          if (!disabled && options.length) {
            setOpen(current => {
              const next = !current
              onOpenChange?.(next)
              return next
            })
          }
        }}
      >
        {leadingMark && <View className='app-select__mark'>{leadingMark}</View>}
        {eyebrow && <Text className='app-select__eyebrow'>{eyebrow}</Text>}
        <Text className='app-select__value'>{triggerLabel || selected?.label || placeholder}</Text>
        <Text className='app-select__arrow'>{open ? '⌃' : '⌄'}</Text>
      </View>
      {open && (
        <View className='app-select__menu'>
          {options.map(option => (
            <View
              key={option.value}
              className={`app-select__option ${option.value === value ? 'is-selected' : ''}`}
              data-value={option.value}
              onClick={event => {
                event.stopPropagation()
                choose(option.value)
              }}
            >
              <View>
                <Text>{option.label}</Text>
                {option.hint && <Text>{option.hint}</Text>}
              </View>
              {option.value === value && <Text className='app-select__check'>✓</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
