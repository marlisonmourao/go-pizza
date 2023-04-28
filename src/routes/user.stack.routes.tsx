import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@screens/Home'
import { Products } from '@screens/Products'

const { Navigator, Screen } = createNativeStackNavigator()

export function UserStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="product" component={Products} />
    </Navigator>
  )
}
