import React from 'react';
import {View,Image} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthLoadingScreen from './app/screen/auth/AuthloadingScreen';
import ForgotOTP from './app/screen/auth/ForgotOTP';
import LoginScreen from './app/screen/auth/LoginScreen';
import ForgotPassword from './app/screen/auth/ForgotPassword';
import OTPScreen from './app/screen/auth/OTPScreen';
import Register from './app/screen/auth/Register';
import ResetPassword from './app/screen/auth/ResetPassword';
import SetPin from './app/screen/auth/SetPin';
import HomeTab from './app/Navigation/HomeNavigation';
import ExchangeTab from './app/Navigation/ExchangeNavigation';
import ProfileTab from './app/Navigation/ProfileNavigation';
import HistoryTab from './app/Navigation/HistoryNavigation';
import { NAV_BACK_COLOR } from './app/Config/color';
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();


const Auth = ()=>{
  return(
    <AuthStack.Navigator initialRouteName='Login'>
      <AuthStack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name='Register' component={Register} options={{headerShown:false}}/>
      <AuthStack.Screen name='OTPScreen' component={OTPScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerShown:false}}/>
      <AuthStack.Screen name='Reset' component={ResetPassword} options={{headerShown:false}}/>
      <AuthStack.Screen name='ForgotOTP' component={ForgotOTP} options={{headerShown:false}}/>
      <AuthStack.Screen name='setPin' component={SetPin} options={{headerShown:false}}/>
    </AuthStack.Navigator>
  )
}
const Home=()=>{
  return(
<Tabs.Navigator 
initialRouteName='HomeTab'
barStyle={{height:50, backgroundColor:NAV_BACK_COLOR}}
>
  <Tabs.Screen  name={'HomeTab'} component={HomeTab} 
  options={{tabBarLabel:null,
    tabBarIcon:({color})=>(
      <Image source={require('./app/assets/images/homeIcon.png')}
      style={{width:30,height:30,tintColor:'white'}}
      />),
    }}/>
  <Tabs.Screen name={'HistoryTab'} component={HistoryTab}
   options={{tabBarLabel:null,
    tabBarIcon:({color})=>(
      <Image source={require('./app/assets/images/historyIcon.png')}
      style={{width:25,height:25,tintColor:'white',marginTop:2}}
      />),
    }}
   />
  <Tabs.Screen name={'ProfileTab'} component={ProfileTab}
   options={{tabBarLabel:null,
    tabBarIcon:({color})=>(
      <Image source={require('./app/assets/images/user.png')}
      style={{width:30,height:30,tintColor:'white'}}
      />),
    }}
  />
</Tabs.Navigator>
  )
}
  const App=()=>{
  
  return(
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AuthLoadingScreen'>
        <Stack.Screen name='AuthLoadingScreen' component={AuthLoadingScreen} options={
          {
            headerShown:false
          }
        }/>
        <Stack.Screen name='Auth' component={Auth} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  
  )
}
export default App;