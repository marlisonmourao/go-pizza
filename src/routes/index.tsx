import { NavigationContainer } from '@react-navigation/native'

import { UserStackRoutes } from '@routes/user.stack.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  )
}
