import { SplashScreen } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import ProfileArea from '~/components/ProfileArea';
import Search from '~/components/Search';
import TrendingView from '~/components/TrendingView';
import CurrentlyReading from '~/components/CurrentlyReading';

export default function Page() {

  const [fontsLoaded, fontError] = Font.useFonts({
    'UbuntuRegular': require('../assets/fonts/Ubuntu-Regular.ttf'),
  })

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
      <ProfileArea />
      <Search />
      <TrendingView />
      <CurrentlyReading />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 58,
  }
});
