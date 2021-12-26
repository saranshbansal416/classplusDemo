import React from 'react';
import { Text, View,TextInput,Platform,Image } from 'react-native';
import { LatoBlack } from '../text/LatoBlack';
import { TEXT_COLOR,BTN_BACK_COLOR,BTN_BACK_COLOR1 } from '../../../Config/color';
const CustomTextInputBlock = props => {
const {onValidation,
keyboardType,
headerLabel,
renderError,
secureText=false,
status=false,
}= props;
  return (
    <View style={{width:'90%',marginTop:10}}>
      <LatoBlack style={{color:TEXT_COLOR}}>
        {headerLabel}
        </LatoBlack>
        <View style={{flexDirection:'row'}}>
        <TextInput
                keyboardType={keyboardType}
                onChangeText={onValidation}
              secureTextEntry={secureText}
                style={{width:'90%',marginTop:-10,fontSize:15,borderBottomColor:'#4d4d4d',borderBottomWidth:1,fontFamily:'Lato-Bold'}}
                ></TextInput>
                {status &&
                <Image source={require('../../../../app/assets/images/tick.png')}
                style={{width:20,height:20,tintColor:BTN_BACK_COLOR1}}

                />
                }
        </View>
              
                <LatoBlack style={{marginTop:8,color:BTN_BACK_COLOR,fontSize:12}}>
                  {renderError}
                  </LatoBlack>
               </View>
  );
};
export { CustomTextInputBlock };
