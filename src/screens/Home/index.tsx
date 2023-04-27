import { useEffect, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'

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
import { ProductCard } from '@components/ProductCard'
import { ProductProps } from '@dtos/productDTO'
import { FlatList } from 'react-native-gesture-handler'

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([])

  const { COLORS } = useTheme()

  function fetchPizzas(value: string) {
    const formatedValue = value.toLowerCase().trim()

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formatedValue)
      .endAt(`${formatedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[]

        setPizzas(data)
      })
      .catch(() =>
        Alert.alert('Consulta', 'Não foi possível consultar os dados.'),
      )
  }

  useEffect(() => {
    fetchPizzas('')
  }, [])

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

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
    </Container>
  )
}
