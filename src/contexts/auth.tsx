import { createContext, ReactNode, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { userDTO } from '@dtos/userDTO'
import { storageUserGet, storageUserSave } from '@storage/storageUser'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  singIn: (email: string, password: string) => Promise<void>
  isLogin: boolean
  user: userDTO | null
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState<userDTO | null>(null)

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
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as userDTO

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              }
              setUser(userData)
              await storageUserSave(userData)
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

  async function loadUserStorageData() {
    try {
      setIsLogin(true)

      const userLogged = await storageUserGet()
      console.log(userLogged)
      setUser(userLogged)
      setIsLogin(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ singIn, isLogin, user }}>
      {children}
    </AuthContext.Provider>
  )
}
