import React from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";


export default function PokemonCard({item}) {
    return (
        <>
            <View style={styles.item}>
                <Image style={styles.image} source={{ uri: item.img }} />
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        width: 100,
        margin: 10,
        marginHorizontal: 11,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 7,
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: "contain",
    },
    text: {
        fontWeight: '300',
        fontWeight: 'normal'
    }
});
