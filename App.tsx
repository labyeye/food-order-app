import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./navigationRef";
import LoginScreen from "./src/Screens/LoginScreen";
import Start from "./src/Screens/StartScreen";
import RegisterScreen from "./src/Screens/RegisterScreen/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
