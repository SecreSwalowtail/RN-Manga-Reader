import {View, StyleSheet, Text, Pressable} from 'react-native'
import GithubLogo from '../assets/github.svg'
import DiscordLogo from '../assets/discord.svg'
import { useDispatch } from 'react-redux'
import { storeDataString } from '../utils/storageFunctions'
import { fetchGuestState, fetchLoggedState } from '../redux/reducers/loginSlice'

export default function LoginPage({setIsLogged, setIsGuest, isGuest, isLogged}) {
    // States are not available right away so states needs to be used
    // to check the login/guest status right when the user enters the application
    const dispatch = useDispatch()

    const onGuestButtonPress = async () => {
        // Change the isGuest state
        setIsGuest(!isGuest)
        // Change the isLogged state just to be sure
        setIsLogged(false)
        // Update the storage state
        storeDataString('isGuest', !isGuest)
        storeDataString('isLogged', false)
        // Update redux slice
        dispatch(fetchGuestState())
        dispatch(fetchLoggedState())

    }

    const onLoginButtonPress = () => {
        null
        // Future implementation of O2 Auth from MAL
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Welcome</Text>
                <Text>Sign in with MAL</Text>
            </View>
            <View style={styles.secondaryView}>
                <View style={{borderRadius: 25, overflow: 'hidden'}}>
                    <Pressable style={styles.loginButton} android_ripple={{color: '#A2B2FC'}} onPress={onLoginButtonPress}>
                        <Text style={styles.loginButtonText}>Continue with MAL</Text>
                    </Pressable>
                </View>
                <View style={{borderRadius: 25, backgroundColor: 'white', overflow: 'hidden'}}>
                    <Pressable style={styles.guestButton} android_ripple={{color: '#A2B2FC'}} onPress={onGuestButtonPress}>
                        <Text style={styles.guestButtonText}>Continue as Guest</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.links}>
                <View>
                    <Text style={{fontFamily: 'UbuntuRegular', fontSize: 18, textAlign: 'center'}}>Github</Text>
                    <GithubLogo width={60} height={60}/>
                </View>
                <View>
                    <Text style={{fontFamily: 'UbuntuRegular', fontSize: 18, textAlign: 'center'}}>Discord</Text>
                    <DiscordLogo width={60} height={60}/>
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