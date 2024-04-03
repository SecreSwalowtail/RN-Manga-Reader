import { ScrollView, View, StyleSheet, Text, Pressable } from "react-native";
import useFetchTopMangas from "~/utils/useFetchTopMangas";
import { useState } from "react";
import MangaCard from "./MangaCard";
import MoreButton from "./MoreButton";

import MangaFilter from "./MangaFilter";

export default function TrendingView() {
    const mangaData = useFetchTopMangas('manga', 'favorite')

    const [filterOpen, setFilterOpen] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Top Manga</Text>
                <Pressable style={{ justifyContent: 'center', height: 30, width: 40, borderRadius: 24 }} onPress={() => { setFilterOpen(!filterOpen) }} android_ripple={{ color: '#A2B2FC', borderless: true }}>
                    <MoreButton type={'black'} />
                </Pressable>
                {filterOpen ? <MangaFilter /> : null}
            </View>
            <ScrollView style={styles.scrollViewContainer} horizontal={true} contentContainerStyle={styles.contentStyle} showsHorizontalScrollIndicator={false}>

                {mangaData ? mangaData.map((item, index) => (
                    <MangaCard image={item.image} title={item.title} genre={item.genre} id={item.id} key={index} />
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
        alignItems: 'center',
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

