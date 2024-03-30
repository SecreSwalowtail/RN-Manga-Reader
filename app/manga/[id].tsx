import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native"
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import useFetchCharactersManga from "~/utils/useFetchCharactersManga"
import { Image } from "expo-image"
import FavoriteButton from "~/components/FavoriteButton"
import CharacterCard from "~/components/CharacterCard"
import { useEffect } from "react"

export default function MangaView() {
    const params = useLocalSearchParams()
    const router = useRouter()
    const charactersData = useFetchCharactersManga(params.id)

    useEffect(() => {
        console.log(charactersData)
    }, [charactersData])

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: params.title,
                    headerTransparent: true,
                    headerTitleStyle: styles.headerTextStyle,
                    headerTitleAlign: 'center'
                }}
            />
            <Image
                transition={1000}
                source={params.image}
                style={styles.mangaImage}
                contentFit="cover"
            />
            <View style={styles.secondaryContainer}>
                <Text style={styles.titleText}>{params.title}</Text>
                <FavoriteButton />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttonManga}>
                    <Text>Manga</Text>
                </Pressable>
                <Pressable style={styles.buttonCharacters}>
                    <Text>Characters</Text>
                </Pressable>
            </View>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                {charactersData ? charactersData.map((item : any, index : Number) => (
                    <CharacterCard key={index} image={item.image} roles={item.role} name={item.character} id={item.id} about={item.about}/>
                )) : null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    headerTextStyle: {
        fontFamily: 'UbuntuRegular'
    },
    headerStyle: {
        justifyContent: 'center'
    },
    mangaImage: {
        width: '100%',
        height: '25%',
        borderRadius: 22
    },
    secondaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 33,
        paddingRight: 22,
        paddingTop: 16
    },
    titleText: {
        fontFamily: 'UbuntuRegular',
        fontSize: 22
    },
    scrollViewContainer: {
        flex: 1,
    },
    buttonContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 46,
        paddingLeft: 33,
        gap: 16,
        marginTop: 20,
        marginBottom: 40
    },
    buttonManga: {
        elevation: 12,
        width: '50%',
        height: '100%',
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCharacters: {
        width: '50%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 24,
        shadowColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    }
})