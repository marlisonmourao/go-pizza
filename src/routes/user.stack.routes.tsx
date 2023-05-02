import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@screens/Home'
import { Products } from '@screens/Products'
import { Order } from '@screens/Order'

import { UserTabsNavigator } from './user.tabs.routes'

import { useAuth } from '@hooks/useAuth'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function UserStackRoutes() {
  const { user } = useAuth()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="product" component={Products} />
        </Group>
      ) : (
        <Group>
          <Screen name="userTabs" component={UserTabsNavigator} />
          <Screen name="order" component={Order} />
        </Group>
      )}
    </Navigator>
  )
}
