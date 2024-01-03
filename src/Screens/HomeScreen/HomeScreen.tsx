import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions, Image, FlatList, Pressable } from "react-native";
import { foodData } from "../../data";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


const imageArray = [
    { id: '1', source: require('../../Images/Offers/of1.png') },
    { id: '2', source: require('../../Images/Offers/of2.png') },
    { id: '3', source: require('../../Images/Offers/of3.png') },
    { id: '4', source: require('../../Images/Offers/of4.png') },
];
const shop = [
    { id: '1', name: ' Chettinad', dist:'1.2KM',source: require('../../Images/Restraunt/rest1.jpeg') },
    { id: '2', name: ' Square',    dist:'1.6KM',source: require('../../Images/Restraunt/rest2.jpeg') },
    { id: '3', name: ' Aged',      dist:'2.2KM',source: require('../../Images/Restraunt/rest3.jpeg') },
    { id: '4', name: ' FreshCo',   dist:'4.6KM',source: require('../../Images/Restraunt/rest4.jpeg') },
    { id: '5', name: ' Fresh',   dist:'1.9KM',source: require('../../Images/Restraunt/rest4.jpeg') },
];


const HomeScreen = ({ navigation }) => {
    
    const renderImageItem = ({ item }) => (
        <Image source={item.source} style={styles.imageItem} />
    );
    const renderShopItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate("FoodScreen", { shopId: item.id,shopname: item.name, shopdist: item.dist ,shopImage: item.source })}>
          <View style={styles.shopItemContainer}>
            <View style={styles.shopItem}>
              <Image source={item.source} style={styles.shopItemImage} />
              <Text style={styles.shopItemName}>{item.name}</Text>
              <Text>{item.dist}</Text>
              
            </View>
          </View>
        </Pressable>
      );
      const saveDataToDatabase = async () => {
        try {
          await AsyncStorage.setItem('shopData', JSON.stringify(shop));
          await AsyncStorage.setItem('foodData', JSON.stringify(foodData));
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
    
      useEffect(() => {
        saveDataToDatabase();
      }, []);
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
            <View style={{ width: "100%", height: "25%" }}>
                <Text style={{ fontSize: 25, alignSelf: 'flex-start', marginLeft: 20, marginTop: 20 }}>Special Offers</Text>
                <FlatList
                    data={imageArray}
                    keyExtractor={(item) => item.id}
                    renderItem={renderImageItem}
                    horizontal={true}
                />
            </View>
            <View style={{ width: "100%", height: "100%" }}>
                <Text style={{ fontSize: 25, alignSelf: 'flex-start', marginLeft: 20, marginTop: 15 }}>Famous Restraunts</Text>
                <FlatList
                    data={shop}
                    keyExtractor={(item) => item.id}
                    renderItem={renderShopItem}
                    horizontal={true}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor:'#e6e5e3'
    },
    header: {
        flexDirection: 'row',
        width: "100%",
        height: "6%",
        marginTop: 60,

    },
    shopItemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: "100%",
        marginTop: 10,
        
    },
    shopItem: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginLeft:10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        gap:10
        
    },
    shopItemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
      
    shopItemName: {
        fontSize: 18,
        backgroundColor:'white'
    },
    profile: {
        width: "10%",
        height: "100%",
        marginRight: 5
    },
    address: {
        width: "8%",
        height: "90%",
        marginLeft: 15
    },
    search: {
        backgroundColor: 'lightgrey',
        width: "85%",
        height: "6%",
        borderRadius: 50,
        marginTop: 30,
        flexDirection: 'row',
    },
    imageItem: {
        width: 300,
        height: "85%",
        marginLeft: 10,
        borderRadius: 10,
        marginTop: 20
    },
    restname: {
        color: 'green',
        fontSize: 20,
    },
    restnam:{
        color: 'black',
        fontSize: 12,
        marginLeft:6,
    },
    design: {
        width: "30%", // Adjusted width
        height: "100%",
        borderRadius: 30,
    },
})

export default HomeScreen;


