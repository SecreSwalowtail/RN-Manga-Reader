import AsyncStorage from '@react-native-async-storage/async-storage';

//https://react-native-async-storage.github.io/async-storage/docs/usage/

export const storeDataString = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const storeDataObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const readStringData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.log(e)
    }
}

export const readObjectData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.log(e)
    }
}

export const clearData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log('Error occured while clearing storage data: ', e)
    }
}