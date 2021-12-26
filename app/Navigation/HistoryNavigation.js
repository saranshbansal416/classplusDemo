import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryOrder from '../screen/history/history';
const HistoryStack = createStackNavigator();

const HistoryTab =()=>{
    return(
        <HistoryStack.Navigator initialRouteName='HistoryOrder'>
            <HistoryStack.Screen name={'HistoryOrder'} component={HistoryOrder} options={{headerShown:false}}/>
        </HistoryStack.Navigator>
    )
}

export default HistoryTab;