import { View, StyleSheet, Text, Pressable } from "react-native"
import { Image } from "expo-image"
import { useEffect } from "react"
import useFetchCharacterDescription from "~/utils/useFetchCharacterDescription"
import { Link } from "expo-router"

export default function CharacterCard({image, roles, id, name} : any) {

    return (
        <Link
        asChild
        href={{
            pathname: "/character/:character",
            params: { id: id, name: name}
        }}>
            <Pressable style={styles.container}>
                <Image 
                    transition={1000}
                    contentFit="cover"
                    style={styles.image}
                    contentPosition={"center"}
                    source={image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
                    <Text style={styles.supportingText}>Role: {roles}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 260,
        paddingLeft: 33,
        paddingRight: 22,
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: '100%',
        maxHeight: 150,
        maxWidth: 300,
        borderRadius: 28
    },
    textContainer: {
        paddingTop: 14,
        width: '70%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    nameText: {
        fontFamily: 'UbuntuRegular',
        fontSize: 18,
        maxWidth: 150
    },
    supportingText: {
        fontFamily: 'UbuntuRegular',
        color: '#9D9D9D',
        fontSize: 12
    }
})