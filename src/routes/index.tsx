import { NavigationContainer } from '@react-navigation/native'

import { UserStackRoutes } from '@routes/user.stack.routes'
import { useAuth } from '@hooks/useAuth'

import { SignIn } from '@screens/SignIn'

export function Routes() {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user?.name ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}
