import { Text, View } from '@tarojs/components'

export type SegmentedProps<T extends string> = {
  value: T
  options: Array<{ value: T; label: string; badge?: number }>
  className?: string
  onChange: (value: T) => void
}

export function Segmented<T extends string>({
  value,
  options,
  className = '',
  onChange
}: SegmentedProps<T>) {
  const selectedIndex = options.findIndex(option => option.value === value)
  return (
    <View className={`segmented ${className}`}>
      {selectedIndex >= 0 && (
        <View className='segmented__track' aria-hidden>
          <View className='segmented__indicator' style={{ width: `${100 / options.length}%`, transform: `translateX(${selectedIndex * 100}%)` }} />
        </View>
      )}
      {options.map(option => (
        <View
          key={option.value}
          className={`segmented__item ${option.value === value ? 'is-active' : ''}`}
          aria-selected={option.value === value}
          onClick={() => option.value !== value && onChange(option.value)}
        >
          <Text>{option.label}</Text>
          {!!option.badge && <Text className='segmented__badge'>{option.badge}</Text>}
        </View>
      ))}
    </View>
  )
}
