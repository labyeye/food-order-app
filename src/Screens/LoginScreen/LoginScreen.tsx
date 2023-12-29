import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        console.log('User is already logged in. Redirecting to HomeScreen.');
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
  
      const storedUserCredentialsString = await AsyncStorage.getItem('allUserCredentials');
  
      if (!storedUserCredentialsString) {
        console.error('Login failed: No user credentials found');
        setLoading(false); 
        return;
      }
  
      const storedUserCredentials = JSON.parse(storedUserCredentialsString);
  
      const enteredEmail = email ? email.trim().toLowerCase() : '';
      const enteredPassword = password ? password.trim() : '';
  
      const matchingUser = storedUserCredentials.find(
        (user) => user.email.trim().toLowerCase() === enteredEmail && user.password.trim() === enteredPassword
      );
  
      if (matchingUser) {
        console.log('Authentication successful.');
  
        await AsyncStorage.setItem('userToken', 'user_auth_token');
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('HomeScreen');
        }, 2000);
      } else {
        console.error('Login failed: Invalid credentials');
        setLoading(false); 
        Alert.alert('Invalid Credentials', 'Please check your email and password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false); 
    }
  };

  if (loading) {
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <LottieView
          style={{ height: "100%", width: "100%", alignSelf: 'center' }}
          source={require('../../Animations/loginloading.json')} autoPlay={true} loop={true}
        />
        <Text style={{ fontSize: 20, color: 'white', marginTop: 20 }}>Logging in...</Text>
      </View>
    );
  }

  // Render the login screen
  return (
    <View style={{ height: windowHeight, width: windowWidth, backgroundColor: 'black', flexDirection: 'column', alignItems: 'center' }}>
      <LottieView
        style={{ height: "40%", width: "100%", alignSelf: 'center' }}
        source={require('../../Animations/login.json')} autoPlay={true} loop={true}
      />
      <Text style={styles.login}>Login</Text>
      <View style={{ gap: 10, width: '100%', height: '25%', alignItems: 'center', justifyContent: "center" }}>
        <TextInput placeholder="Email Address" style={styles.email} placeholderTextColor="white" value={email} onChangeText={setemail} />
        <TextInput placeholder="Password" style={styles.password} placeholderTextColor="white" value={password} onChangeText={setpassword} />
      </View>
      <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.register}>Not a User ? Register Here</Text>
      </Pressable>
      <TouchableOpacity style={styles.logbtn} onPress={handleLogin}>
        <Text style={{ fontSize: 20 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  logbtn: {
    marginTop: 10,
    width: "55%",
    fontSize: 20,
    height: "7%",
    borderRadius: 40,
    color: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  email: {
    width: "95%",
    fontSize: 20,
    padding: 10,
    height: "35%",
    borderRadius: 40,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'black'
  },
  password: {
    width: "95%",
    fontSize: 20,
    padding: 10,
    height: "35%",
    borderRadius: 40,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'black'
  },
  login: {
    fontSize: 30,
    height: "10%",
    color: 'white',
    alignSelf: 'center',
    backgroundColor: 'black'
  },
  register: {
    color: 'white',
  },
});

export default LoginScreen;
