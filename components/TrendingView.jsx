import { ScrollView, View, StyleSheet, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import MangaCard from "./MangaCard";
import MoreButton from "./MoreButton";
import { router } from 'expo-router';
import { useSelector } from "react-redux";
import { JikanApi } from "../utils/axiosInstances";

export default function TrendingView() {
    const filterState = useSelector((state) => state.filter)
    const [mangaData, setMangaData] = useState(null)
    const [viewTitle, setViewTitle] = useState(null)

    useEffect(() => {
        const fetchTopMangaData = async () => {
            if (filterState) {
                let data = []
                
                const trueType = Object.keys(filterState.type).find(key => filterState.type[key])
                const trueFilter = Object.keys(filterState.filter).find(key => filterState.filter[key])

                // Specific case for by poplarity tag to display it correctly
                // Should probably simply this since im using slicing on literals
                if(filterState.filter.bypopularity) {
                    setViewTitle(trueType.charAt(0).toUpperCase(0) + trueType.slice(1) + ' ' 
                    + 'Popularity')
                } else {

                    setViewTitle(trueType.charAt(0).toUpperCase(0) + trueType.slice(1) + ' ' 
                + trueFilter.charAt(0).toUpperCase(0) + trueFilter.slice(1))
                }


                const api = JikanApi({ 'type': trueType, 'filter': trueFilter, 'page': 1, limit: 15 })
                const response = await api.get('/top/manga')

                if (response.status === 200) {
                    response.data.data.map((item) => {
                        data.push({
                            title: item.title,
                            image: item.images.jpg.large_image_url,
                            genre: item.genres.map((genre) => genre.name),
                            id: item.mal_id,
                            score: item.score
                        })
                    })
                    setMangaData(data)
                }
            }
        }
        fetchTopMangaData()
    }, [filterState])

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{viewTitle}</Text>
                <Pressable style={{ justifyContent: 'center', height: 30, width: 40, borderRadius: 24 }} onPress={() => { router.push('viewMangaModal') }} android_ripple={{ color: '#A2B2FC', borderless: true }}>
                    <MoreButton type={'black'} />
                </Pressable>
            </View>
            <ScrollView style={styles.scrollViewContainer} horizontal={true} contentContainerStyle={styles.contentStyle} showsHorizontalScrollIndicator={false}>
                {mangaData && Object.keys(mangaData).length > 0 ? mangaData.map((item, index) => (
                    <MangaCard image={item.image} title={item.title} genre={item.genre} id={item.id} key={index} background={item.background} score={item.score}/>
                )) : <Text style={{fontFamily: 'UbuntuRegular', fontSize: 16}}>Sorry, no data available for your selection.</Text>}
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

