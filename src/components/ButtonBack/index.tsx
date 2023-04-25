import { TouchableOpacityProps } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Container } from './styles'

export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme()

  return (
    <Container {...rest} activeOpacity={0.7}>
      <MaterialIcons name="chevron-left" size={18} color={COLORS.TITLE} />
    </Container>
  )
}
