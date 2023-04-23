import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'

import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native'

import { Loading } from '@components/Loading'
import theme from './src/theme'
import { SignIn } from '@screens/SignIn'

import { AuthProvider } from '@contexts/auth'

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>{fontsLoaded ? <SignIn /> : <Loading />}</AuthProvider>
    </ThemeProvider>
  )
}
