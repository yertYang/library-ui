import { Text, View } from '@tarojs/components'

export type ListFooterProps = {
  visible: boolean
  hasMore: boolean
  loadingMore: boolean
  total: number
  unit?: string
  loadingText?: string
  endText?: string
  onLoadMore: () => void
}

export function ListFooter({
  visible,
  hasMore,
  loadingMore,
  total,
  unit = '条',
  loadingText = '正在加载…',
  endText,
  onLoadMore
}: ListFooterProps) {
  if (!visible) return null
  return (
    <View className='list-footer'>
      {hasMore ? (
        <View className={`list-footer__more ${loadingMore ? 'is-loading' : ''}`} onClick={onLoadMore}>
          <Text>{loadingMore ? loadingText : '加载更多'}</Text>
        </View>
      ) : (
        <Text className='list-footer__end'>{endText ?? `已显示全部 ${total} ${unit}`}</Text>
      )}
    </View>
  )
}
