import { Dimensions, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    layout: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
    },
    card: {
        width: Dimensions.get("window").width * .9,
        maxWidth: 450,
        padding: 29,
        gap: 15,
        borderRadius: 10,
    },
    title: {

    }
})