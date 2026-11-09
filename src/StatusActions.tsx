import { Text, View } from '@tarojs/components'
import { AppButton } from './AppButton'

type Action = { label: string; ariaLabel?: string; onClick: () => void }

export type StatusActionsProps = { status: string; primary?: Action; secondary: Action }

export function StatusActions({ status, primary, secondary }: StatusActionsProps) {
  return <View className='status-actions'>
    <Text className='status-actions__status'>{status}</Text>
    <View className='status-actions__buttons'>
      {primary && <AppButton size='small' aria-label={primary.ariaLabel} onClick={primary.onClick}>{primary.label}</AppButton>}
      <AppButton size='small' variant='secondary' aria-label={secondary.ariaLabel} onClick={secondary.onClick}>{secondary.label}</AppButton>
    </View>
  </View>
}
