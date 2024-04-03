import { StyleSheet, Text, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import MoreButton from "./MoreButton";

export default function CurrentlyReading() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#A2B2FC', '#FFF1BE']}
                locations={[0.1, 0.9]}
                start={{ x: 3.4, y: 1 }}
                end={{ x: 1, y: 4 }}
                style={styles.linearGradient}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Your Mangas</Text>
                    <MoreButton />
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35
    },
    linearGradient: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 33,
        paddingRight: 44,
        paddingTop: 44
    },
    text: {
        fontFamily: 'UbuntuRegular',
        fontSize: 18,
        color: 'white'
    }
})