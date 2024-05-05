import { SplashScreen } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import * as Font from 'expo-font'
import ProfileArea from '../components/ProfileArea'
import Search from '../components/Search'
import TrendingView from '../components/TrendingView'
import CurrentlyReading from '../components/CurrentlyReading'
import { useSelector, useDispatch } from 'react-redux'
import LoginPage from '../components/LoginPage'
import { fetchGuestState, fetchLoggedState, fetchMangaDexToken } from '../redux/reducers/loginSlice'
import { fetchData } from '../redux/reducers/userSlice'
import { readStringData } from '../utils/storageFunctions'

export default function Page() {

  const [fontsLoaded, fontError] = Font.useFonts({
    'UbuntuRegular': require('../assets/fonts/Ubuntu-Regular.ttf'),
    'UbuntuBold': require('../assets/fonts/Ubuntu-Bold.ttf')
  })
  const state = useSelector((state) => state.login)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const test = async () => {
  //     await AsyncStorage.clear()
  //   }
  //   test()
  // }, [])

  useEffect(() => {
    // These values will be null if its the first start-up so populate them accordingly
    const checkInitialStart = async () => {
      dispatch(fetchLoggedState())
      dispatch(fetchGuestState())
    }
    checkInitialStart()
  }, [])

  useEffect(() => {
    // If the log-in is sucesfull, get all user data
    const fetchUserData = async () => {
      if (state.isLogged) {
        dispatch(fetchData())
        dispatch(fetchData('/mangalist'))
      }
    }
    fetchUserData()
  }, [state.isLogged])

  useEffect(() => {
    // Get the tokens on app start-up
    // The token always expires in 900 seconds, redux reject should handle that response and refetch automatically
    const fetchMdStorageTokens = async () => {
      dispatch(fetchMangaDexToken())
    }
    fetchMdStorageTokens()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
      <SafeAreaView style={styles.mainContainer} onLayout={onLayoutRootView}>
        {!state.isLogged && !state.isGuest ? (
          <LoginPage/>
        ) : (
          <>
            <ProfileArea />
            <Search />
            <TrendingView />
            <CurrentlyReading />
          </>
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 58,
  }
});
