import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Read cart data from AsyncStorage or your state management solution
    AsyncStorage.getItem('cartData').then(data => {
      const parsedData = data ? JSON.parse(data) : [];
      setCartData(parsedData);
    });
  }, []);

  const renderItem = ({ item }) => {
    if (!item || !item.source) {
      return null; // Skip rendering if item or item.source is null
    }

    return (
      <View style={styles.cartItem}>
        <Image style={styles.cartItemImage} source={item.source} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemName}>{item.foodName}</Text>
          <Text style={styles.cartItemPrice}>Price: {item.price}</Text>
          {/* Add other details as needed */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Cart</Text>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
  },
  cartItemImage: {
    width: 80,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartItemPrice: {
    marginTop: 5,
  },
});

export default CartScreen;
