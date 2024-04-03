import { View, StyleSheet,Pressable } from "react-native";
import ProfileIcon from "./Avatar";
import DrawerSvg from '../assets/Drawer.svg'

export default function ProfileArea() {
    return (
        <View style={styles.container}>
            <ProfileIcon />
            <View style={styles.drawerButtonContainer}>
                <Pressable style={styles.drawerButton}>
                    <DrawerSvg height={22} width={22}/>
                </Pressable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 60,
        flexDirection: 'row',
        marginRight: 22,
        marginLeft: 33,
    },
    drawerButton: {
        elevation: 12
    },
    drawerButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        height: 45,
        width: 45,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
})