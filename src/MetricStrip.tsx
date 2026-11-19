import { Text, View } from '@tarojs/components'

export interface MetricStripProps {
  items: Array<{ label: string; value: string | number; unit?: string; detail?: string }>
}

export function MetricStrip({ items }: MetricStripProps) {
  if (!items.length) return null
  return (
    <View className='metric-strip'>
      {items.map(item => (
        <View key={item.label} className='metric-strip__item'>
          <Text className='metric-strip__label'>{item.label}</Text>
          <View className='metric-strip__reading'>
            <Text className='metric-strip__value'>{item.value}</Text>
            {item.unit && <Text className='metric-strip__unit'>{item.unit}</Text>}
          </View>
          {item.detail && <Text className='metric-strip__detail'>{item.detail}</Text>}
        </View>
      ))}
    </View>
  )
}
