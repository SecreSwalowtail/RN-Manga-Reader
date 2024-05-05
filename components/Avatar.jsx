import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";

function ProfileIconNotification() {
    return (
        <View style={styles.popoutContainer}>
            <LinearGradient
                colors={['#A2B2FC', '#FFF1BE']}
                style={styles.linearGradient}
            >
                <Text style={styles.popoutText}>3</Text>
            </LinearGradient>
        </View>
    )
}

function ReturnGreetingMessage() {
    const data = ['Stay Trening!', 'Welcome to Manga Reader!', 'Welcome back.', 'Happy Reading', 'Gojo comes back next chapter']
    return data[Math.floor(Math.random() * data.length)]
}

export default function ProfileIcon() {
    const guestImage = { uri: 'https://ui-avatars.com/api/?name=Guest+Account' }

    const state = useSelector((state) => state.login)
    const userData = useSelector((state) => state.user)
    return (
        <View style={styles.profileImageContainer}>
            {userData.accountData || state.isGuest ? (
                <>
                    <ImageBackground style={styles.image} source={state.isGuest ? guestImage : { uri: userData.accountData.picture }} imageStyle={styles.imageStyle}>
                        <ProfileIconNotification />
                    </ImageBackground>
                    <View style={styles.textContainer}>
                        <Text
                            numberOfLines={2}
                            style={styles.textMessage}
                        >{ReturnGreetingMessage()}</Text>
                        <Text style={styles.textName}>{!state.isGuest ? userData.accountData.name : 'Guest Account'}</Text>
                    </View>
                </>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    profileImageContainer: {
        flexDirection: 'row',
        flex: 1,

    },
    image: {
        width: 60,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
    },
    imageStyle: {
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1
    },
    textContainer: {
        flexDirection: 'column',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingLeft: 12
    },
    textMessage: {
        fontFamily: 'UbuntuRegular',
        fontSize: 12,
        letterSpacing: 0,
        color: '#9D9D9D'
    },
    textName: {
        fontFamily: 'UbuntuRegular',
        color: '#424242',
        fontSize: 16
    },
    popoutContainer: {
        position: 'relative',
        left: 42,
        bottom: 3,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 22

    },
    popoutText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'UbuntuRegular',
        fontSize: 15
    },
    linearGradient: {
        borderRadius: 50,
        width: 20,
        height: 20,
    }
});