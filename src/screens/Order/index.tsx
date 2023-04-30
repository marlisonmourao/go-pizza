import { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from './styles'

import { ButtonBack } from '@components/ButtonBack'
import { RadioButton } from '@components/RadioButton'

import { PIZZA_TYPES } from '@utils/pizzaTypes'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { OrderNavigationProps } from 'src/@types/navigation'
import { ProductProps } from '@dtos/productDTO'

import { useAuth } from '@hooks/useAuth'

type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number
  }
}

export function Order() {
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse)
  const [quantity, setQuantity] = useState(0)
  const [tableNumber, setTableNumber] = useState('')
  const [size, setSize] = useState('')
  const [sendingOrder, setSendingOrder] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params as OrderNavigationProps
  const { user } = useAuth()

  const amount = size ? pizza?.price_sizes[size] * quantity : '0:00'

  function handleGoBack() {
    navigation.goBack()
  }

  function handleOrder() {
    if (!size) {
      return Alert.alert('Pedido', 'Selecione o tamanho da pizza.')
    }

    if (!tableNumber) {
      return Alert.alert('Pedido', 'Informe o número da mesa.')
    }

    if (!quantity) {
      return Alert.alert('Pedido', 'Informe a quantidade.')
    }

    setSendingOrder(true)

    firestore()
      .collection('orders')
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => navigation.navigate('home'))
      .catch(() => Alert.alert('Pedido', 'Não foi possível realizar o pedido'))

    setSendingOrder(false)
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then((response) => {
          setPizza(response.data() as PizzaResponse)
        })
        .catch(() =>
          Alert.alert('Pedido', 'Não foi possível carregar o produto'),
        )
    }
  }, [id])

  if (!pizza?.photo_url) {
    return <Loading />
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </Header>

        <Photo source={{ uri: pizza?.photo_url }} alt="" />

        <Form>
          <Title>{pizza?.name}</Title>
          <Label>Selecione um tamanho</Label>

          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                title={item.name}
                key={item.id}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" onChangeText={setTableNumber} />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  )
}
