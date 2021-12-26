import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight,Image} from 'react-native';
import { BACKGROUND_COLOR,NAV_BACK_COLOR } from '../../Config/color';
import {LatoBlack} from './text/LatoBlack'
import { NAV_IMG_SIZE , NAV_TEXT_SIZE } from '../../Config/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class NavBar extends Component{
    render(){
        const {leftMenu=false,
             center=false,
              right,
              centerText='',
              left=false
            }=this.props;
        return(
            <View style={styles.container}>
            <View style={{flex:1,flexDirection:'row'}}>
          {leftMenu&&  <View style={{flex:0.2}}>
            <TouchableHighlight
          style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]}
        >
    <Image 
source={require('../../../app/assets/images/splash.png')}  
  style={styles.profileImg} />
</TouchableHighlight>
            </View>}
           
            {center && <View style={{flex:0.6}}>
                <LatoBlack style={styles.headerText}>{centerText}</LatoBlack>
                </View>}
            </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
        container: {
            
            backgroundColor: NAV_BACK_COLOR,
            elevation:10,
            height:60
          },
          profileImgContainer: {
           marginTop:10,
            height: NAV_IMG_SIZE,
            width: NAV_IMG_SIZE,
            borderRadius: 40,
            justifyContent:'center',
            alignSelf:'center'
          },
          profileImg: {
            height: NAV_IMG_SIZE,
            width: NAV_IMG_SIZE,
            borderRadius: 40,
            overflow:'hidden',
       
           
          },
          headerText:{color:'white', alignSelf:'center',marginTop:18,fontSize:NAV_TEXT_SIZE},

    
})
