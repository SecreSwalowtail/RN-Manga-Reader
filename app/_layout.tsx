import { SplashScreen, Stack } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    )

}
