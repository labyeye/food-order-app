import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FoodScreen = ({ route, navigation }) => {
  const { shopId, shopImage, shopname, shopdist } = route.params;
  const [foodList, setFoodList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigateToCart = () => {
    navigation.navigate('CartScreen', { cartItems: cartItems });
  };
  const addToCart = (foodItem) => {
    const isItemInCart = cartItems.some(item => item.foodId === foodItem.foodId);

    if (!isItemInCart) {
        setCartItems([...cartItems, { ...foodItem, quantity: 1 }]);
    } else {
        console.log('Item is already in the cart:', foodItem);
    }
};
useEffect(() => {
    console.log('Updated Cart Items:', cartItems);
    navigateToCart(); 
}, [cartItems]);


  

  const getFoodData = async () => {
    try {
      const foodData = await AsyncStorage.getItem('foodData');
      if (foodData) {
        const parsedFoodData = JSON.parse(foodData);
        const selectedShopFood = parsedFoodData.filter((food) => food.shopId === shopId);
        setFoodList(selectedShopFood);
      }
    } catch (error) {
      console.error('Error retrieving food data:', error);
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const filteredFoodList = foodList.filter(food =>
    food.foodName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 0; i < rating; i++) {
        stars.push(<Image key={i} style={{ width: "100%", height: "100%" }} source={require('../../Images/star.png')} />);
      }
      return stars;
    };
  
    return (
      <View style={styles.fooddataa}>
        <Image style={styles.foodimg} source={item.source} />
        <View style={{ width: "30%", alignSelf: 'center' }}>
          <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '500' }}>{item.foodName}</Text>
          <Text style={{ marginLeft: 10 }}>Price: {item.price}</Text>
        </View>
        <View style={{ width: "5%", height: "23%", marginLeft: 10, alignSelf: 'center', flexDirection: 'row' }}>
          {renderStars(item.rate)}
        </View>
        <Pressable
          style={{ width: "10%", height: "40%", alignSelf: 'center', marginLeft: 70 }}
          onPress={() => {
            addToCart(item);
            navigation.navigate('CartScreen', { cartItems: cartItems });
          }}
        >
          <Image style={styles.cart} source={require('../../Images/shopping-cart.png')} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center", marginTop: 70 }}>
      <View style={styles.search}>
        <Image style={{ marginLeft: 15, width: "7%", height: "52%", alignSelf: 'center' }} source={require('../../Images/search.png')} />
        <TextInput
          style={{ height: "100%", width: "100%", marginLeft: 10 }}
          placeholder="Search Food..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <Image source={shopImage} style={{ width: "70%", height: "25%", borderRadius: 30, marginTop: 20 }} />
      <View style={{ width: "100%" }}>
        <Text style={{ fontFamily: 'Salina-Trial-Bold', alignSelf: 'center', fontSize: 35, marginTop: 10 }}>{shopname}</Text>
      </View>
      <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'center' }}>
        <Image style={styles.address} source={require('../../Images/placeholder.png')} />
        <Text style={{ fontFamily: 'Salina-Trial-Bold', alignSelf: 'center', fontSize: 20, marginTop: 5 }}>{shopdist}</Text>
      </View>
      <Text style={{ fontFamily: 'Salina-Trial-Book', alignSelf: 'flex-start', fontSize: 30, marginLeft: 20, marginTop: 15 }}>Food List:</Text>
      <FlatList
        data={filteredFoodList}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.foodId ? item.foodId.toString() : index.toString())}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fooddataa: {
    backgroundColor: 'white',
    width: "90%",
    height: 100,
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
  search: {
    backgroundColor: 'lightgrey',
    width: "90%",
    height: "6%",
    borderRadius: 50,
    flexDirection: 'row',
  },
  address: {
    width: "7%",
    height: "90%",
    marginLeft: 15
  },
  cart: {
    width: "100%",
    height: "100%",
  },
});

export default FoodScreen;
