import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import React from "react"
import { View, StyleSheet, Text } from "react-native"
import useFetchCharacterDescription from "~/utils/useFetchCharacterDescription"
import { Image } from "expo-image"

export default function CharacterView() {
    const params = useLocalSearchParams()
    const router = useRouter()
    console.log(params)

    const characterData = useFetchCharacterDescription(params.id)
    return (
        <View>
            <Stack.Screen
                options={{
                    title: params.name,
                    headerTransparent: true,
                    headerTitleStyle: styles.headerTextStyle,
                    headerTitleAlign: 'center'
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    headerTextStyle: {
        fontFamily: 'UbuntuRegular'
    }
})