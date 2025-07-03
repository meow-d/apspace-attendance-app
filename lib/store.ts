import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { isWeb } from './isWeb'


export async function getItem(key: string): Promise<string | null> {
  if (isWeb) return await AsyncStorage.getItem(key)
  return await SecureStore.getItemAsync(key)
}

export async function setItem(key: string, value: string): Promise<void> {
  if (isWeb) return await AsyncStorage.setItem(key, value)
  return await SecureStore.setItemAsync(key, value)
}

export async function deleteItem(key: string): Promise<void> {
  if (isWeb) return await AsyncStorage.removeItem(key)
  return await SecureStore.deleteItemAsync(key)
}
