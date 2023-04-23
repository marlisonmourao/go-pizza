import { createContext, ReactNode, useState } from 'react'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  singIn: (email: string, password: string) => Promise<void>
  isLogin: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogin, setIsLogin] = useState(false)

  async function singIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe e-mail e senha.')
    }

    setIsLogin(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        console.log(account)
      })
      .catch((error) => {
        const { code } = error

        if (code === 'auth/not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválida.')
        } else {
          return Alert.alert('Login', 'Erro ao fazer login.')
        }
      })
      .finally(() => setIsLogin(false))
  }

  return (
    <AuthContext.Provider value={{ singIn, isLogin }}>
      {children}
    </AuthContext.Provider>
  )
}
