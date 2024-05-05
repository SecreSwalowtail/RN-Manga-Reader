import { SplashScreen, Stack } from 'expo-router'
import { Provider as StoreProvider } from 'react-redux'
import { store } from '../redux/store'
SplashScreen.preventAutoHideAsync()

export default function Layout() {

    return (
        <StoreProvider store={store}>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='viewMangaModal' options={{headerShown: false, presentation: 'transparentModal'}}/>
            </Stack>
        </StoreProvider>
    )

}
