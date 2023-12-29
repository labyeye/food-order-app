import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Start = ({navigation}) => {
    return(
        <View style={styles.container}>
           <LottieView
                style={{height:"50%",width:"100%",alignSelf:'center'}}  
                source={require('../../Animations/start.json')} autoPlay={true} loop={true}/>
            <Text style={styles.title}>Foodies</Text>
            <Text style={styles.desc}>"Think, Order, Eat."</Text>
            <TouchableOpacity style={styles.getbtn} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{textAlign:"center",color:"white"}}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    getbtn:{
        justifyContent:"center",
        borderRadius:60,
        width:"90%",
        height:"6%",
        marginTop:50,
        backgroundColor:'black'
    },
    title:{
        color:'black',
        fontSize:40,
    },
    desc:{
        color:'black',
        fontSize:20,
    },
    container:{
        height:windowHeight,
        width:windowWidth,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'

    }
})
export default Start;