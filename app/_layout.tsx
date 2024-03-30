import { SplashScreen, Stack } from 'expo-router';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }}/>
        </Stack>
    )

}
