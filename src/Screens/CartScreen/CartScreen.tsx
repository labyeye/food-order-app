import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
    const { cartItems } = route.params;
    console.log(cartItems)
    const renderCartItem = ({ item }) => {
      if (!item || !item.foodImage || !item.foodName || !item.price) {
          // Handle the case where item or its properties are undefined
          return null;
      }
  
      return (
          <View style={styles.cartItemContainer}>
              <Image source={item.foodImage} style={styles.cartItemImage} />
              <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.foodName}</Text>
                  <Text>{item.price}</Text>
              </View>
          </View>
      );
  };
  
  

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => (item.foodId ? item.foodId.toString() : Math.random().toString())} // Use foodId if available, else use a random key
                renderItem={renderCartItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      marginTop:50,
        flex: 1,
        borderColor:'black',
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItemContainer: {
        flexDirection: 'column',
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
        color: 'black',
        fontWeight: 'bold',
    },
});

export default CartScreen;
