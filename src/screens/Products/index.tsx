import { Platform, TouchableOpacity } from 'react-native'
import { Container, DeleteLabel, Header, Title } from './styles'

import { ButtonBack } from '@components/ButtonBack'
import { Photo } from '@components/Photo'

export function Products() {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack />
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <Photo uri="" />
    </Container>
  )
}
