import { useCallback, useState } from 'react'
import { Alert, TouchableOpacity, FlatList } from 'react-native'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreettingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  NewProductButton,
  Title,
} from './styles'

import happyEmoji from '@assets/happy.png'
import { Search } from '@components/Search'
import { ProductCard } from '@components/ProductCard'
import { ProductProps } from '@dtos/productDTO'

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([])
  const [search, setSearch] = useState('')

  const { COLORS } = useTheme()
  const navigation = useNavigation()

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

  function handleSearch() {
    fetchPizzas(search)
  }

  function handleSearchClear() {
    setSearch('')
    fetchPizzas('')
  }

  function handleOpen(id: string) {
    navigation.navigate('product', { id })
  }

  function handleAdd() {
    navigation.navigate('product', {})
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas('')
    }, []),
  )

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

      <Search
        onChangeText={setSearch}
        value={search}
        onClear={handleSearchClear}
        onSearch={handleSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />

      <NewProductButton
        title="Cadastrar"
        type="secondary"
        onPress={handleAdd}
      />
    </Container>
  )
}
