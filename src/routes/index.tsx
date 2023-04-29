import { NavigationContainer } from '@react-navigation/native'

// import { UserStackRoutes } from '@routes/user.stack.routes'
import { UserTabsNavigator } from './user.tabs.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <UserTabsNavigator />
    </NavigationContainer>
  )
}
