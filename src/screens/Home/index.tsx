import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreettingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  Title,
} from './styles'

import happyEmoji from '@assets/happy.png'
import { Search } from '@components/Search'

export function Home() {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreettingText>Olá, Admin</GreettingText>
        </Greeting>

        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>

      <Search onClear={() => {}} onSearch={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>
    </Container>
  )
}
