import { ScrollView, View, StyleSheet, Text } from "react-native";
import Point from '../assets/morePoint.svg'
import useFetchTopMangas from "~/utils/useFetchTopMangas";
import { useEffect } from "react";
import MangaCard from "./MangaCard";
import MoreButton from "./MoreButton";
import { Link } from 'expo-router';

export default function TrendingView() {
    const mangaData: any = useFetchTopMangas('manga', 'favorite')

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Top Manga</Text>
                <MoreButton type={'black'}/>
            </View>
            <ScrollView style={styles.scrollViewContainer} horizontal={true} contentContainerStyle={styles.contentStyle} showsHorizontalScrollIndicator={false}>

                {mangaData ? mangaData.map((item: any, index: Number) => (
                    <MangaCard image={item.image} title={item.title} genre={item.genre} id={item.id} key={index}/>
                )) : null}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    moreButton: {
        flexDirection: 'row',
        gap: 2,
        alignSelf: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 33,
        paddingRight: 43,
    },
    text: {
        fontFamily: 'UbuntuRegular',
        fontSize: 18
    },
    scrollViewContainer: {
        maxHeight: 187,
        marginTop: 30,
        marginLeft: 12,
        marginRight: 12,
        flexDirection: 'row',
    },
    contentStyle: {
        gap: 20
    }
})

