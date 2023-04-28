import React, { useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    Text,
    Animated,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MyModal({ pokemon, setShowModal }) {

    const scaleValue = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(opacity, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    function handleCloseModal() {
        Animated.parallel([
            Animated.spring(opacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            setShowModal(false);
        }, 100)
    }

    const animatedStyle = {
        transform: [{ scale: scaleValue }],
        opacity,
    };

    return (
        <TouchableWithoutFeedback onPress={handleCloseModal}>
            <Animated.View style={[styles.container, { opacity: opacity }]}>

                <TouchableWithoutFeedback onPress={(e) => { e.stopPropagation() }}>
                    <Animated.View style={[styles.modal, animatedStyle]}>
                        <View style={styles.content}>
                            <View style={styles.flex}>
                                <Image style={styles.p_icon}  source={require("../assets/p_icon.png")} />
                                <Text style={styles.label}>Type:</Text>
                                <Text style={styles.text}>{pokemon.type.join(",")}</Text>
                            </View>

                            <View style={styles.flex}>
                                <Image style={styles.p_icon} source={require("../assets/p_icon.png")} />
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.text}>{pokemon.name}</Text>
                            </View>

                            <View style={styles.flex}>
                                <Image  style={styles.p_icon}  source={require("../assets/p_icon.png")} />
                                <Text style={styles.label}>Height:</Text>
                                <Text style={styles.text}>{pokemon.height}</Text>
                            </View>

                            <View style={styles.flex}>
                                <Image  style={styles.p_icon}  source={require("../assets/p_icon.png")} />
                                <Text style={styles.label}>Weight:</Text>
                                <Text style={styles.text}>{pokemon.weight}</Text>
                            </View>
                        </View>
                        <Image
                            source={require("../assets/p.png")}
                            style={styles.p}
                        />
                        <TouchableWithoutFeedback onPress={handleCloseModal}>
                            <View style={styles.leave_button}>
                                <Image
                                    source={require("../assets/test.png")}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    modal: {
        width: 250,
        height: 270,
        backgroundColor: '#D8D8D8',
        borderRadius: 25,
        position: 'relative',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 7,
    },
    leave_button: {
        backgroundColor: 'whitesmoke',
        position: 'absolute',
        borderRadius: 200,
        width: 60,
        height: 60,
        left: 203,
        top: -20,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 40,
        height: 40
    },
    content: {
        position: 'absolute',
        top: 103,
        left: 32
    },
    text: {
        fontSize: 20,
        fontFamily: "HelveticaNeue",
        fontWeight: '300',
        color: '#084152',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,



    },
    label: {
        fontSize: 20,
        fontFamily: "HelveticaNeue",
        color: "#3c5aa6",
        fontWeight: "bold",
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,

    },
    flex: {
        flexDirection: 'row',
        marginBottom: 7,
    },
    p: {
        width: 248,
        height: 100,
        position: "absolute",
        top: 0,
        left: 1
    },
    p_icon:{
        width:25,
        height:25
    }
})

