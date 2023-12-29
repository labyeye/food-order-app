// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation(); // Get the navigation prop

  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check AsyncStorage for the user authentication token
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };

    checkUserToken();
  }, []);

  const signIn = (token) => {
    setUserToken(token);
  };

  const signOut = async () => {
    try {
      // Clear the user authentication token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);

      // Navigate to the LoginScreen using the navigation prop
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
