import React from 'react'
import { Container, Title, Load, TypeProps } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'

type Props = RectButtonProps & {
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
    <Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  )
}
