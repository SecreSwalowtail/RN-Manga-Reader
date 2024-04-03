import {StyleSheet, Pressable } from "react-native"
import HearthIcon from '../assets/loveIcon.svg'

export default function FavoriteButton() {
    return (
        <Pressable style={styles.button}>
            <HearthIcon />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})