import React from 'react'
import { Container, Title, Load, TypeProps } from './styles'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  type?: TypeProps
  isLoading?: boolean
}

export function Button({
  isLoading = false,
  title,
  type = 'primary',
  ...rest
}: Props) {
  return (
    <Container activeOpacity={0.7} type={type} disabled={isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  )
}
