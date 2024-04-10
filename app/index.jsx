import { SplashScreen } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import * as Font from 'expo-font'
import ProfileArea from '../components/ProfileArea'
import Search from '../components/Search'
import TrendingView from '../components/TrendingView'
import CurrentlyReading from '../components/CurrentlyReading'
import { Provider as StoreProvider } from 'react-redux'
import LoginPage from '../components/LoginPage'
import { readStringData, storeDataString } from '../utils/storageFunctions'
import { store } from '../redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Page() {

  const [fontsLoaded, fontError] = Font.useFonts({
    'UbuntuRegular': require('../assets/fonts/Ubuntu-Regular.ttf'),
  })
  
  const [isLogged, setIsLogged] = useState(null)
  const [isGuest, setIsGuest] = useState(null)

  useEffect(() => {
    const test = async () => {
      await AsyncStorage.clear()
    }
    test()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  useEffect(() => {
    const checkLoggedStatus = async () => {
      const response = await readStringData('isLogged')
      if (response === null || response === undefined) {
        setIsLogged(false)
        await storeDataString('isLogged', false)
      } else {
        setIsLogged(response)
      }
    }
    const checkGuestStatus = async () => {
      const response = await readStringData('isGuest')
      if (response === null || response === undefined) {
        setIsGuest(false)
        await storeDataString('isGuest', false)
      } else {
        setIsGuest(response)
      }
    }

    checkGuestStatus()
    checkLoggedStatus()
  }, [])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <StoreProvider store={store}>
      <SafeAreaView style={styles.mainContainer} onLayout={onLayoutRootView}>
        {!isLogged && !isGuest ? ( 
          <LoginPage setIsLogged={setIsLogged} setIsGuest={setIsGuest} isLogged={isLogged} isGuest={isGuest}/> 
        ) : (
          <>
            <>
              <ProfileArea />
              <Search />
              <TrendingView />
              <CurrentlyReading />
            </>
          </>
        )}
      </SafeAreaView>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 58,
  }
});
