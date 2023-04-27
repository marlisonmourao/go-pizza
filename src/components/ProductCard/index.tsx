import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import {
  Container,
  Content,
  Description,
  Details,
  Identification,
  Image,
  Line,
  Name,
} from './styles'

import { ProductProps } from '@dtos/productDTO'

type Props = TouchableOpacityProps & {
  data: ProductProps
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} alt="" />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-left" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  )
}
