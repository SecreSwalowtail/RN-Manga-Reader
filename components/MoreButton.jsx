import { View, StyleSheet } from "react-native";
import Point from '../assets/morePoint.svg'
import PointWhite from '../assets/morePointWhite.svg'

export default function MoreButton({type='black'}) {
    if (type === 'black') {
        return (
            <View style={styles.moreButton}>
                <Point />
                <Point />
                <Point />
            </View>
        )
    } else {
        return (
            <View style={styles.moreButton}>
                <PointWhite />
                <PointWhite />
                <PointWhite />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    moreButton: {
        flexDirection: 'row',
        gap: 2,
        alignSelf: 'center'
    },
})