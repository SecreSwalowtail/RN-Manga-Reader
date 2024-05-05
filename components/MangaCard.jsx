import { Image } from "expo-image"
import { StyleSheet, View, Text, Pressable } from "react-native"
import { Link } from 'expo-router';

export default function MangaCard({ image, title, genre, id, background, score}) {
    const slicedGenres = genre[0]
    return (
        <Link
            asChild
            href={{
                pathname: "/manga/[id]",
                params: { id: id, title: title, image: image, score: score }
            }}>
            <Pressable>
                <View style={styles.container}>
                    <Image
                        source={image}
                        contentFit="cover"
                        transition={1000}
                        style={styles.image}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                        <Text style={styles.genreText} numberOfLines={1}>Genre: {slicedGenres}</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 187,
    },
    titleContainer: {
        marginTop: 2
    },
    titleText: {
        fontSize: 18,
        fontFamily: 'UbuntuRegular'
    },
    genreText: {
        fontSize: 12,
        color: '#9D9D9D',
        fontFamily: 'UbuntuRegular'
    },
    image: {
        flex: 1,
        width: '100%',
        borderRadius: 15,
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 18,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 12,
        },
    },

})