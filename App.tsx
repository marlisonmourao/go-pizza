import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'

import { ThemeProvider } from 'styled-components/native'

import { Loading } from '@components/Loading'
import theme from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  })

  if (!fontsLoaded) {
    ;<Loading />
  }
  return <ThemeProvider theme={theme}></ThemeProvider>
}
