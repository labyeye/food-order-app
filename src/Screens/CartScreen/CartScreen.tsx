import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
    const { cartItems } = route.params;
    console.log('Received Cart Items:', cartItems);

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <Image source={item.source} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.foodName}</Text>
                <Text>{item.price}</Text>
                {/* Add any other information you want to display for each item */}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.foodId.toString()} // Use foodId as a unique key
                renderItem={renderCartItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cartItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    cartItemInfo: {
        flex: 1,
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
