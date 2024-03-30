import { useState } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Image } from 'expo-image';
import PlaceholderImage from '../assets/image_scheleton.png'
import { LinearGradient } from 'expo-linear-gradient';

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

export default function ProfileIcon() {
    const [isGuest, setGuest] = useState(true)
    const image = { uri: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" };

    return (
        <View style={styles.profileImageContainer}>
            <ImageBackground style={styles.image} source={image} imageStyle={styles.imageStyle}>
                <ProfileIconNotification />
            </ImageBackground>
            <View style={styles.textContainer}>
                <Text
                    numberOfLines={1}
                    style={styles.textMessage}
                >Stay Trending!</Text>
                <Text style={styles.textName}>Illia Frunza</Text>
            </View>
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