import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home/Home';
import Exchange from '../screen/exchange/Exchange';
const HomeStack = createStackNavigator();

const HomeTab =()=>{
    return(
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name={'Home'} component={Home} options={{headerShown:false}}/>
            <HomeStack.Screen name={'Exchange'} component={Exchange} options={{headerShown:false}}/>
        </HomeStack.Navigator>
    )
}

export default HomeTab;