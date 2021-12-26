import React, { Component } from "react";
import {StyleSheet, View,Image, TouchableOpacity} from 'react-native';
import { BACKGROUND_COLOR, BTN_BACK_COLOR1, NAV_BACK_COLOR } from "../../Config/color";
import { LatoBlack } from "../common/text/LatoBlack";
import { LatoBold } from "../common/text/LatoBold";
export default class CurrencyDataModel extends Component{
    render(){
        const{data,onPress} = this.props;
        //console.log('insided the maodelm',JSON.parse(data.quote));
        return(

            <TouchableOpacity style={styles.container}
            onPress={onPress}
            >
             <View style={{padding:10}}>
             <Image source={require('../../assets/images/b1.png')} 
             style={{width:50, height:50,padding:10, tintColor:'white'}}/> 
             </View>
              <View style={{flexDirection:'column'}}>
              <LatoBold style={{color:'white',padding:10,fontSize:14,marginTop:5}}>{data.name}</LatoBold>
             <LatoBlack style={{color:'white',marginLeft:10,fontSize:10}}>{data.symbol}</LatoBlack>

              </View>
              <View style={{flexDirection:'column',position:'absolute',right:10}}>
<LatoBold style={{color:BTN_BACK_COLOR1, fontWeight:'bold',fontSize:15,marginTop:15}}>{data.total_supply}</LatoBold>
              </View>
          
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:NAV_BACK_COLOR,
        elevation:5,
        width:'90%',
        alignSelf:'center',
        marginTop:10
    }
})