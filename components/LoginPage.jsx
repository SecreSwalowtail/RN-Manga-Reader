import { View, StyleSheet, Text, Pressable } from 'react-native'
import GithubLogo from '../assets/github.svg'
import DiscordLogo from '../assets/discord.svg'
import { useDispatch, useSelector } from 'react-redux'
import { readObjectData, storeDataObject, storeDataString } from '../utils/storageFunctions'
import { fetchGuestState, fetchLoggedState, fetchUserTokens } from '../redux/reducers/loginSlice'
import { getNewCodeVerifier } from '../utils/PckeGenerator'
import { useEffect, useState } from 'react'
import * as Linking from 'expo-linking';

export default function LoginPage() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.login)
    const [pcke, setPcke] = useState(getNewCodeVerifier()) // Idk why but if do a simple variable with it, it does not run

    const onGuestButtonPress = async () => {
        await storeDataString('isGuest', true)
        await storeDataString('isLogged', false)
        // Update redux slice
        dispatch(fetchGuestState())
        dispatch(fetchLoggedState())
    }

    const onLoginButtonPress = () => {
        // Create the url that will be used to sign in
        // Later listen to the deep url that will be returned with
        // the tokens data
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            code_challenge: pcke,
            state: 'logged'
        })
        url = `https://myanimelist.net/v1/oauth2/authorize?${params.toString()}`
        Linking.openURL(url)
    }

    const handleDeepLink = async (e) => {
        try {
            const data = Linking.parse(e.url);
            const { queryParams } = data;
            dispatch(fetchUserTokens({ pcke: pcke, code: queryParams.code }))
        } catch (e) {
            console.log('Error in handleDeepLink', e)
            await storeDataObject('isLogged', false)
        } 
    }

    useEffect(() => {
        const urlSubscription = Linking.addEventListener('url', handleDeepLink)
        return (() => {
            urlSubscription.remove()
        })
        // Add an event listener
        // When the component unmounts return a clean-up function
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Welcome</Text>
                <Text>Sign in</Text>
            </View>
            <View style={styles.secondaryView}>
                <View style={{ borderRadius: 25, overflow: 'hidden' }}>
                    <Pressable style={styles.loginButton} android_ripple={{ color: '#A2B2FC' }} onPress={onLoginButtonPress}>
                        <Text style={styles.loginButtonText}>Continue with MAL</Text>
                    </Pressable>
                </View>
                <View style={{ borderRadius: 25, backgroundColor: 'white', overflow: 'hidden' }}>
                    <Pressable style={styles.guestButton} android_ripple={{ color: '#A2B2FC' }} onPress={onGuestButtonPress}>
                        <Text style={styles.guestButtonText}>Continue as Guest</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.links}>
                <View>
                    <Text style={{ fontFamily: 'UbuntuRegular', fontSize: 18, textAlign: 'center' }}>Github</Text>
                    <GithubLogo width={60} height={60} />
                </View>
                <View>
                    <Text style={{ fontFamily: 'UbuntuRegular', fontSize: 18, textAlign: 'center' }}>Discord</Text>
                    <DiscordLogo width={60} height={60} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 90,
        paddingLeft: 48,
        paddingRight: 48,
        paddingBottom: 12
    },
    titleView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'UbuntuRegular',
    },
    title: {
        fontSize: 36
    },
    secondaryTitle: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'UbuntuRegular'
    },
    loginButton: {
        width: '100%',
        height: 60,
        backgroundColor: '#00325e',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18
    },
    guestButton: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestButtonText: {
        color: 'black',
        fontSize: 18
    },
    secondaryView: {
        marginTop: 72,
        gap: 32
    },
    links: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row'

    },
})