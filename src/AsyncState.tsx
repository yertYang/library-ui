import { Text, View } from '@tarojs/components'
import { AppButton } from './AppButton'

export type AsyncStateProps = {
  loading?: boolean
  refreshing?: boolean
  error?: string
  empty?: boolean
  emptyTitle?: string
  emptyDescription?: string
  onRetry?: () => void
  loadingTitle?: string
  loadingDescription?: string
  errorTitle?: string
  retryLabel?: string
}

export function AsyncState({
  loading,
  refreshing,
  error,
  empty,
  emptyTitle = '这里还没有内容',
  emptyDescription = '稍后再来看看，或尝试其他操作。',
  onRetry,
  loadingTitle = '正在加载',
  loadingDescription = '请稍候…',
  errorTitle = '暂时无法加载',
  retryLabel = '重新加载'
}: AsyncStateProps) {
  if (loading) {
    return (
      <View className='async-state'>
        <View className='loading-ring' />
        <Text className='async-state__title'>{loadingTitle}</Text>
        <Text className='async-state__description'>{loadingDescription}</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View className='async-state'>
        <Text className='async-state__symbol'>!</Text>
        <Text className='async-state__title'>{errorTitle}</Text>
        <Text className='async-state__description'>{error}</Text>
        {onRetry && (
          <AppButton variant='secondary' onClick={onRetry}>{retryLabel}</AppButton>
        )}
      </View>
    )
  }
  if (empty) {
    return (
      <View className='async-state'>
        <View className='async-state__symbol async-state__symbol--book' aria-hidden>
          <View className='async-state__book-icon'>
            <View className='async-state__book-page async-state__book-page--left' />
            <View className='async-state__book-page async-state__book-page--right' />
            <View className='async-state__book-spine' />
          </View>
        </View>
        <Text className='async-state__title'>{emptyTitle}</Text>
        <Text className='async-state__description'>{emptyDescription}</Text>
      </View>
    )
  }
  if (refreshing) return <View className='list-update' aria-label='正在更新列表'><View className='list-update__bar' /></View>
  return null
}
