import { createContext, ReactNode, useState } from 'react'
import { Alert } from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

type AuthProviderProps = {
  children: ReactNode
}

type User = {
  id: string
  name: string
  isAdmin: boolean
}

type AuthContextData = {
  singIn: (email: string, password: string) => Promise<void>
  isLogin: boolean
  user: User | null
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function singIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe e-mail e senha.')
    }

    setIsLogin(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then((profile) => {
            const { name, isAdmin } = profile.data() as User

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              }
              setUser(userData)
            }
          })
          .catch(() => Alert.alert('Login', 'Erro ao fazer login.'))
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
    <AuthContext.Provider value={{ singIn, isLogin, user }}>
      {children}
    </AuthContext.Provider>
  )
}
