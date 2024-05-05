import { StyleSheet, View, Text, Pressable, ScrollView, FlatList } from "react-native"
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import useFetchCharactersManga from '../../utils/useFetchCharactersManga'
import { Image } from "expo-image"
import FavoriteButton from '../../components/FavoriteButton'
import CharacterCard from "../../components/CharacterCard"
import { useEffect, useState } from "react"
import useFetchMangaDescription from "../../utils/useFetchMangaDescription"

export default function MangaView() {
    const params = useLocalSearchParams()
    const charactersData = useFetchCharactersManga(params.id)
    const mangaDataDetails = useFetchMangaDescription(params.id)
    const [activeButton, setActiveButton] = useState('character')

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
                <View style={{flexDirection: 'row', width: 'auto'}}>
                    <Text style={styles.titleText}>{params.title}</Text>
                </View>
                <Text style={{fontFamily: 'UbuntuRegular'}}>Score: {params.score}</Text>
                <FavoriteButton />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.innerTextContainer}>
                    <Pressable
                        onPress={() => { setActiveButton('manga') }}
                        style={activeButton === 'manga' ? styles.buttonMangaPressed : styles.buttonManga}>
                        <Text style={activeButton === 'manga' ? { color: 'white' } : { color: 'black' }}>Manga</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => { setActiveButton('character') }}
                        style={activeButton === 'character' ? styles.characterButtonPressed : styles.buttonCharacters}>
                        <Text style={activeButton === 'character' ? { color: 'white' } : { color: 'black' }}>Characters</Text>
                    </Pressable>
                </View>
            </View>
            {/* <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                {charactersData ? charactersData.map((item : any, index : Number) => (
                    <CharacterCard key={index} image={item.image} roles={item.role} name={item.character} id={item.id} about={item.about}/>
                )) : null}
            </ScrollView> */}
            {charactersData && activeButton === 'character' ? (<FlatList
                data={charactersData}
                renderItem={({ item }) => {
                    return (
                        <CharacterCard image={item.image} roles={item.role} name={item.character} id={item.id} about={item.about} />
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewContainer}
            />) : (<FlatList
                data={mangaDataDetails}
                renderItem={({ item }) => {
                    return (
                        null
                    )
                }}
            />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    characterButtonPressed: {
        width: '50%',
        height: '100%',
        backgroundColor: '#00325e',
        borderBottomRightRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
    },
    innerTextContainer: {
        flex: 1,
        borderRadius: 24,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        shadowColor: '#000',
        elevation: 17,
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
        //alignItems: 'center',
        paddingRight: 46,
        paddingLeft: 33,
        gap: 0.4,
        marginTop: 20,
        marginBottom: 40
    },
    buttonManga: {
        width: '50%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderTopLeftRadius: 24
    },
    buttonMangaPressed: {
        width: '50%',
        height: '100%',
        backgroundColor: '#00325e',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderTopLeftRadius: 24,
        borderWidth: 1,

    },
    buttonCharacters: {
        width: '50%',
        height: '100%',
        backgroundColor: 'white',
        borderBottomRightRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    }
})