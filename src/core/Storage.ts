import AsyncStorage from '@react-native-async-storage/async-storage'

async function getFromStorage(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (err) {
    console.error(err)
  }
}

async function setFromStorage(key: string, items: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items))
  } catch (err) {
    console.error(err)
  }
}

export {
  getFromStorage,
  setFromStorage
}

