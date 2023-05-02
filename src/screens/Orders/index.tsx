import { Alert } from 'react-native'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Container, Header, Title } from './styles'

import { useFocusEffect } from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore'

import { OrderCard, OrderProps } from '@components/OrderCard'
import { Separator } from '@components/ItemSeparator/styles'
import { useAuth } from '@hooks/useAuth'

export function Orders() {
  const [orders, setOrders] = useState<OrderProps[]>([])
  const { user } = useAuth()

  function handlePizzaDelivered(id: string) {
    Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().collection('orders').doc(id).update({
            status: 'Entregue',
          })
        },
      },
    ])
  }

  useFocusEffect(
    useCallback(() => {
      const subscriber = firestore()
        .collection('orders')
        .where('waiter_id', '==', user?.id)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          }) as OrderProps[]
          setOrders(data)
        })

      return () => subscriber()
    }, [user?.id]),
  )

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => String(item)}
        renderItem={({ index, item }) => (
          <OrderCard
            data={item}
            index={index}
            disabled={item.status === 'Entregue'}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  )
}
