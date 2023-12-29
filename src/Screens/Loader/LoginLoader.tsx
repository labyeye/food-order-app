import LottieView from "lottie-react-native";
import React from "react";

const LoginLoader = () => {
    return(
        <LottieView
            style={{height:"100%",width:"100%",alignSelf:'center'}}  
            source={require('../../Animations/loginloading.json')} autoPlay={true} loop={true}/>
    );
}

export default LoginLoader;