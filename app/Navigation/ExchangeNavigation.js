import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Exchange from '../screen/exchange/Exchange';
const ExchangeStack = createStackNavigator();

const ExchangeTab =()=>{
    return(
        <ExchangeStack.Navigator initialRouteName='ExchangeHome'>
            <ExchangeStack.Screen name={'ExchangeHome'} component={Exchange} options={{headerShown:false}}/>
        </ExchangeStack.Navigator>
    )
}

export default ExchangeTab;