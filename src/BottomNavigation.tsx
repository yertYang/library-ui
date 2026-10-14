import { Text, View } from '@tarojs/components'
import { AppIcon, type AppIconName } from './AppIcon'

export interface BottomNavigationItem {
  key: string
  label: string
  icon: AppIconName
}

export interface BottomNavigationProps<T extends BottomNavigationItem = BottomNavigationItem> {
  items: readonly T[]
  active: string
  pending?: string
  onChange: (item: T) => void
}

/** Controlled presentation; the application owns navigation and async failures. */
export function BottomNavigation<T extends BottomNavigationItem>({
  items, active, pending, onChange
}: BottomNavigationProps<T>) {
  return (
    <View className='bottom-nav safe-bottom'>
      {items.map(item => (
        <View
          key={item.key}
          className={`bottom-nav__item ${active === item.key ? 'is-active' : ''} ${pending === item.key ? 'is-pending' : ''}`}
          aria-current={active === item.key ? 'page' : undefined}
          aria-busy={pending === item.key}
          onClick={() => item.key !== active && !pending && onChange(item)}
        >
          <View className='bottom-nav__mark'><AppIcon name={item.icon} /></View>
          <Text className='bottom-nav__label'>{item.label}</Text>
        </View>
      ))}
    </View>
  )
}
