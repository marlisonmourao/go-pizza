import { userDTO } from '@dtos/userDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_COLLECTION } from './storageConfig'

async function storageUserSave(user: userDTO) {
  await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user))
}

async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_COLLECTION)

  const user: userDTO = storage ? JSON.parse(storage) : null

  return user
}

async function storageUserRemove() {
  AsyncStorage.removeItem(USER_COLLECTION)
}

export { storageUserSave, storageUserGet, storageUserRemove }
