import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screen/Profile/ProfileScreen';
const ProfileStack = createStackNavigator();

const ProfileTab =()=>{
    return(
        <ProfileStack.Navigator initialRouteName='ProfileHome'>
            <ProfileStack.Screen name={'ProfileHome'} component={ProfileScreen} options={{headerShown:false}}/>
        </ProfileStack.Navigator>
    )
}

export default ProfileTab;