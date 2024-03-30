import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import React, { useEffect } from "react"
import { View, StyleSheet, Text, Pressable, Linking, ScrollView} from "react-native"
import useFetchCharacterDescription from "~/utils/useFetchCharacterDescription"
import { Image } from "expo-image"

export default function CharacterView() {
    const params = useLocalSearchParams()
    const router = useRouter()
    console.log(params)

    const characterData = useFetchCharacterDescription(params.id)

    return (
        <>
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: params.name,
                    headerTransparent: true,
                    headerTitleStyle: styles.headerTextStyle,
                    headerTitleAlign: 'center',
                    
                }}
            />
            <Image
                source={characterData ? characterData[0].image : null}
                contentFit="cover"
                style={styles.image}
                transition={1000}
            />
            {characterData ? (
                <View style={styles.textContainer}>
                    <View style={styles.innerTextContainer}>
                        <Text style={styles.textOne}>Kanji Name</Text>
                        <Text style={styles.textTwo}>{characterData ? characterData[0].kanji_name : 'Unknown'}</Text>
                    </View>
                    <View style={styles.innerTextContainer}>
                        <Text style={styles.textOne}>Nicknames</Text>
                        <Text style={styles.textTwo}>{characterData[0].nicknames ? characterData[0].nicknames : 'Unknown'}</Text>
                    </View>
                </View>
            ) : (
                null
            )}
            {characterData ? (
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutText}>{characterData[0].about}</Text>
                </View>
            ) : (
                null
            )}
        </ScrollView>
        {characterData ? (
                <Pressable style={styles.urlButton} onPress={async () => {
                    await Linking.openURL(characterData[0].url)
                }}>
                    <Text style={styles.buttonText}>Wiki</Text>
                </Pressable>
            ) : (
                null
            )}
        </>

    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'UbuntuRegular',
        fontSize: 24,
        
    },
    urlButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        top: '90%',
        left: '32%',
        position: 'absolute',
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 18,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 12,
        },
    },
    aboutText: {
        fontFamily: 'UbuntuRegular',
        fontSize: 18
    },
    aboutContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 33
    },
    container: {
        flex: 1,
        marginBottom: 5
    },
    headerTextStyle: {
        fontFamily: 'UbuntuRegular'
    },
    image: {
        flex: 1,
        width: '100%',
        height: 200,
        marginTop: 100,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 15
    },
    innerTextContainer: {
        alignItems: 'center',
        gap: 4
    },
    textOne: {
        fontFamily: 'UbuntuRegular',
        fontSize: 18
    },
    textTwo: {
        fontFamily: 'UbuntuRegular',
        fontSize: 12
    }
})