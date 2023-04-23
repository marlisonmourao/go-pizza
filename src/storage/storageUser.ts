import { userDTO } from '@dtos/userDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_COLLECTION } from './storageConfig'

export async function storageUserSave(user: userDTO) {
  await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user))
}
