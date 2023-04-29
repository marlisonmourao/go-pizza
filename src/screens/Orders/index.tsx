import { FlatList } from 'react-native-gesture-handler'
import { Container, Header, Title } from './styles'

import { OrderCard } from '@components/OrderCard'
import { Separator } from '@components/ItemSeparator/styles'

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => String(item)}
        renderItem={({ index }) => <OrderCard index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  )
}
