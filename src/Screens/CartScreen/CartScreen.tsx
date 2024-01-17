import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ route }) => {
    const { cartItems } = route.params;
    const [cartitems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItems');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Error loading cart items:', error);
            }
        };

        loadCartItems();
    }, []);

    const handleIncrease = async (item) => {
        item.quantity = (item.quantity || 1) + 1;
        await updateCartItem(item);
    };

    const handleDecrease = async (item) => {
        if (item.quantity && item.quantity > 1) {
            item.quantity -= 1;
            await updateCartItem(item);
        }
    };
    const updateCartItem = async (item) => {
        try {
            const updatedCartItems = cartItems.map((cartItem) => {
                if (cartItem.foodId === item.foodId) {
                    return item;
                }
                return cartItem;
            });

            // Save the updated cartItems to AsyncStorage
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error updating cart items:', error);
        }
    };

    console.log(cartItems)
    const renderCartItem = ({ item }) => {
        if (!item || !item.foodImage || !item.foodName || !item.price) {
            return null;
        }
        return (
            <View style={styles.fooddataa}>
                <Image style={styles.foodimg} source={item.foodImage} />
                <View style={{ width: "40%", alignSelf: 'center' }}>
                    <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '500', color: 'white' }}>{item.foodName}</Text>
                    <Text style={{ marginLeft: 10, color: 'white' }}>Price: {item.price}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDecrease(item)}>
                    <Image style={styles.minus} source={require('../../Images/minus.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 35 }}>{item.quantity || 1}</Text>
                <TouchableOpacity onPress={() => handleIncrease(item)}>
                    <Image style={styles.plus} source={require('../../Images/plus.png')} />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>
            <View style={{ height: "70%"}}>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => (item.foodId ? item.foodId.toString() : Math.random().toString())} // Use foodId if available, else use a random key
                    renderItem={renderCartItem}
                />
            </View>
            <View>
                <TouchableOpacity style={{ width: "80%", height: "23%", backgroundColor: 'gray' ,justifyContent:'center',borderRadius:20}}>
                    <Text>Proceed to Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        width: "100%",
        flexDirection: 'column'
    },
    plus: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    minus: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    increaseButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30
    },
    cartItemContainer: {
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cartItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,

    },
    fooddataa: {
        backgroundColor: 'gray',
        width: "100%",
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    foodimg: {
        width: 80,
        height: 70,
        marginRight: 10,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CartScreen;
