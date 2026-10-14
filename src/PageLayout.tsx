import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { Button, Text, View } from '@tarojs/components'
import { AppIcon } from './AppIcon'

export type PageLayoutProps = PropsWithChildren<{
  title: string
  subtitle?: string
  back?: boolean
  onBack?: () => void
  headerAction?: ReactNode
  footer?: ReactNode
  style?: CSSProperties
  className?: string
  /** Increment when a cached page becomes visible to replay its short transition. */
  appearance?: number
}>

export function PageLayout({
  title, subtitle, back = false, onBack, headerAction, footer,
  style, className = '', appearance = 0, children
}: PageLayoutProps) {
  return (
    <View
      className={`page-shell ${footer ? 'page-shell--with-nav' : ''} ${back ? '' : 'page-shell--root'} ${className}`}
      style={style}
    >
      <View className='page-safe-top' />
      <View className='page-header'>
        <View className='page-header__side'>
          {back && (
            <Button className='icon-button' aria-label='返回上一页' onClick={onBack}>
              <AppIcon name='chevron-left' />
            </Button>
          )}
        </View>
        <View className='page-header__copy'>
          <Text className='page-header__title'>{title}</Text>
          {subtitle && <Text className='page-header__subtitle'>{subtitle}</Text>}
        </View>
        <View className='page-header__side page-header__side--end'>{headerAction}</View>
      </View>
      <View className={`page-content ${footer ? `page-content--arrive-${appearance % 2}` : ''}`}>{children}</View>
      {footer}
    </View>
  )
}
