import { View, StyleSheet, TextInput, Pressable } from "react-native"
import FilterIcon from '../assets/filterSvg.svg'
import SearchIcon from '../assets/searchSvg.svg'

export default function Search() {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.innerContainer}>
                <SearchIcon style={{alignSelf: 'center', marginLeft: 20}}/>
                <TextInput
                    style={styles.textField}
                    placeholder="Search manga..."
                />
            </View>
            <Pressable onPress={() => {console.log('test')}}>
                <FilterIcon style={{alignSelf: 'center', marginRight: 20}}/>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        maxHeight: 50,
        marginTop: 24,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 33,
        marginRight: 22
    },
    innerContainer: {
        flexDirection: 'row',
        gap: 15
    },
    textField: {
        fontFamily: 'UbuntuRegular',
    }
})