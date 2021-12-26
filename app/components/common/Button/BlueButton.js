import React from 'react';
import { Text, View,TextInput,Platform,TouchableOpacity } from 'react-native';
import { LatoBlack } from '../text/LatoBlack';
import { LatoBold } from '../text/LatoBold';
import { TEXT_COLOR,BTN_BACK_COLOR,BTN_BACK_COLOR1 } from '../../../Config/color';
const BlueButton = props => {
const {
    buttonText,
    onPressButton
}= props;
  return (
    <View style={{width:'90%',alignSelf:'center',position:'absolute',bottom:20}}>
    <TouchableOpacity 
    onPress={onPressButton}
    style={{backgroundColor:BTN_BACK_COLOR1,height:40,borderRadius:5}}>
        <View>
            <LatoBold style={{color:'white',fontSize:16,justifyContent:'center',alignSelf:'center',marginTop:10}}>{buttonText}</LatoBold>
        </View>
    </TouchableOpacity>
   
            </View>
  );
};
export {BlueButton};
