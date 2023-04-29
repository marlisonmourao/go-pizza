import { TouchableOpacityProps } from 'react-native'

import {
  Container,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
} from './styles'

type Props = TouchableOpacityProps & {
  index: number
}

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: 'https://picsum.photos/200' }} alt="" />

      <Name>4 Queijos</Name>

      <Description>Mesa 5 ● Qnt: 1</Description>
      <StatusContainer status="Preparando">
        <StatusLabel status="Preparando">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  )
}
