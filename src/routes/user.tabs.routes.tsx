import { Platform } from 'react-native'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { Orders } from '@screens/Orders'

import { BottomMenu } from '@components/BottomMenu'
const { Navigator, Screen } = createBottomTabNavigator()

export function UserTabsNavigator() {
  const { COLORS } = useTheme()

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          ),
        }}
      />

      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Pedidos" color={color} notifications="5" />
          ),
        }}
      />
    </Navigator>
  )
}
