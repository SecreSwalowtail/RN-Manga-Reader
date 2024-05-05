import { View, Text, Pressable, StyleSheet } from "react-native";
import { BlurView } from 'expo-blur';
import {useDispatch, useSelector} from 'react-redux'
import { filterManga, filterSets } from "../redux/reducers/filterSlice";
import { useEffect } from "react";


export default function MangaFilterModal() {
    const state = useSelector((state) => state.filter)
    const dispatch = useDispatch() 

    const dispatchFilter = (type, filter) => {
        if (type === 'set') {
            dispatch(filterSets(filter))
        } else {
            dispatch(filterManga(filter))
        }
    }
    useEffect(() => {
        console.log(state)
    }, [state])


    return (
        <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <BlurView intensity={100} style={styles.blurViewContainer} tint="systemUltraThinMaterialLight">
                    <View style={{ alignItems: 'center', flex: 1, gap: 20 }}>
                        <Pressable style={state.filter.publishing ? styles.filterButtonActive : styles.filterButton} onPress={() => dispatchFilter('set', 'publishing')}>
                            <Text style={state.filter.publishing ? styles.textStyleActive : styles.textStyle}>Publishing</Text>
                        </Pressable>
                        <Pressable style={state.filter.upcoming ? styles.filterButtonActive : styles.filterButton} onPress={() => dispatchFilter('set', 'upcoming')}>
                            <Text style={state.filter.upcoming ? styles.textStyleActive : styles.textStyle}>Upcoming</Text>
                        </Pressable>
                        <Pressable style={state.filter.bypopularity ? styles.filterButtonActive : styles.filterButton} onPress={() => dispatchFilter('set', 'bypopularity')}>
                            <Text style={state.filter.bypopularity ? styles.textStyleActive : styles.textStyle}>Popular</Text>
                        </Pressable>
                        <Pressable style={state.filter.favorite ? styles.filterButtonActive : styles.filterButton} onPress={() => dispatchFilter('set', 'favorite')}>
                            <Text style={state.filter.favorite ? styles.textStyleActive : styles.textStyle}>Favorite</Text>
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1, gap: 10 }}>
                        <Pressable style={state.type.manga ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'manga')}>
                            <Text style={state.type.manga ? styles.textStyleActive: styles.textStyle}>Manga</Text>
                        </Pressable>
                        <Pressable style={state.type.novel ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'novel')}>
                            <Text style={state.type.novel ? styles.textStyleActive: styles.textStyle}>Novel</Text>
                        </Pressable>
                        <Pressable style={state.type.lightnovel ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'lightnovel')}>
                            <Text style={state.type.lightnovel ? styles.textStyleActive: styles.textStyle}>L. Novel</Text>
                        </Pressable>
                        <Pressable style={state.type.oneshot ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'oneshot')}>
                            <Text style={state.type.oneshot ? styles.textStyleActive: styles.textStyle}>Oneshot</Text>
                        </Pressable>
                        <Pressable style={state.type.doujin ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'doujin')}>
                            <Text style={state.type.doujin ? styles.textStyleActive: styles.textStyle}>Doujin</Text>
                        </Pressable>
                        <Pressable style={state.type.manhwa ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'manhwa')}>
                            <Text style={state.type.manhwa ? styles.textStyleActive: styles.textStyle}>Manhwa</Text>
                        </Pressable>
                        <Pressable style={state.type.manhua ? styles.activeButton : styles.button} onPress={() => dispatchFilter('manga', 'manhua')}>
                            <Text style={state.type.manhua ? styles.textStyleActive: styles.textStyle}>Manhua</Text>
                        </Pressable>
                    </View>
                </BlurView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 98,
        paddingRight: 98,
        justifyContent: 'center'
    },
    activeButton: {
        backgroundColor: '#A2B2FC',
        width: 65,
        height: 50,
        borderRadius: 8,
        elevation: 12,
        justifyContent: 'center'
    },
    innerContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
        height: 450
    },
    blurViewContainer: {
        width: '100%',
        height: 450,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 24,
        paddingBottom: 24
    },
    button: {
        width: 65,
        height: 50,
        borderRadius: 8,
        elevation: 12,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    filterButton: {
        width: 65,
        height: 50,
        borderRadius: 8,
        elevation: 12,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    filterButtonActive: {
        width: 65,
        height: 50,
        borderRadius: 8,
        elevation: 12,
        backgroundColor: '#A2B2FC',
        justifyContent: 'center',
        color: 'white'
    },
    textStyle: {
        fontFamily: 'UbuntuBold',
        textAlign: 'center',
        fontSize: 12
    },
    textStyleActive: {
        fontFamily: 'UbuntuBold',
        textAlign: 'center',
        fontSize: 12,
        color: 'white'
    }
})