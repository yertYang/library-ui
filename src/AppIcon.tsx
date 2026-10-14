import { View } from '@tarojs/components'

export type AppIconName =
  | 'home'
  | 'search'
  | 'book-search'
  | 'book'
  | 'tasks'
  | 'user'
  | 'scan'
  | 'mail'
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'check'
  | 'eye'
  | 'eye-off'

export type AppIconProps = {
  name: AppIconName
  className?: string
}

export function AppIcon({
  name,
  className = ''
}: AppIconProps) {
  return (
    <View className={`app-icon app-icon--${name} ${className}`} aria-hidden>
      {name === 'home' && <View className='app-icon__home-roof' />}
      {name === 'eye-off' && <View className='app-icon__eye-slash' />}
      {name === 'book-search' && <View className='app-icon__search-book' />}
    </View>
  )
}
