import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Image } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: "82%", height: "80%", marginRight: 10, alignSelf: "center", flexDirection: 'row', }}>
                    <Image style={styles.address} source={require('../../Images/placeholder.png')} />
                    <Text style={{ width: "100%", alignSelf: 'center', marginLeft: 10 }}>
                        Delivery Address
                    </Text>
                </View>
                <View style={{ width: "130%", height: "100%", marginRight: 10, }}>
                    <Image style={styles.profile} source={require('../../Images/man.png')} />
                </View>
            </View>
            <TouchableOpacity style={styles.search}>
                <Image style={{ marginLeft: 10, width: "8%", height: "55%", alignSelf: 'center' }} source={require('../../Images/search.png')} />
                <Text style={{ marginLeft: 10, width: "100%", height: "55%", alignSelf: 'center', marginTop: 10 }}>Search for your Favourite Restraunt</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        width: "100%",
        height: "6%",
        marginTop: 60,

    },
    profile: {
        width: "10%",
        height: "100%",
        marginRight: 5
    },
    address: {
        width: "10%",
        height: "100%",
        marginLeft: 4
    },
    search: {
        backgroundColor: 'lightgrey',
        width: "85%",
        height: "6%",
        borderRadius: 50,
        marginTop: 30,
        flexDirection: 'row',

    }

})

export default HomeScreen;
