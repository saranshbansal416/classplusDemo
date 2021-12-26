import React, { Component } from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import { BACKGROUND_COLOR,BTN_BACK_COLOR1 } from '../../Config/color';
import NavBar from '../../components/common/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LatoBlack } from '../../components/common/text/LatoBlack';
import { LatoBold } from '../../components/common/text/LatoBold';
import { NAV_BACK_COLOR } from '../../Config/color';
export default class ProfileScreen extends Component{
   constructor(props){
       super(props);
       this.state={
wBalance:''
       }
   }
  async componentDidMount(){
    const wBalance = await AsyncStorage.getItem('walletBalance');
    const wBalanceInt = JSON.parse(wBalance);
    console.log('walletbalance',wBalanceInt);
this.setState({wBalance:wBalanceInt},()=>{})
   }
   onLogout=async()=>{
       await AsyncStorage.clear();
    
    this.props.navigation.navigate('Auth');
   }

    renderFooter=()=>{
        return(
            <View style={{width:'80%',alignSelf:'center',marginTop:40}}>
                {this.state.loading?<ActivityIndicator size={'small'} color={BTN_BACK_COLOR1}/>:
    <TouchableOpacity 
    onPress={()=>this.onLogout()}
    style={{backgroundColor:BTN_BACK_COLOR1,height:30,borderRadius:5}}>
        <View>
            <LatoBold style={{color:'white',fontSize:13,justifyContent:'center',alignSelf:'center',marginTop:5}}>{'Logout'}</LatoBold>
        </View>
    </TouchableOpacity>
    }
    </View>
        )}
        renderWalletBox=()=>{
            return(
                <View style={styles.containerSellBuyHeading}>
                   <LatoBold style={{color:'white',fontSize:14,padding:15}}>Wallet</LatoBold>
                   <View style={{position:'absolute',right:15}}>
                   <LatoBold style={{color:BTN_BACK_COLOR1,fontSize:14,padding:15}}>{this.state.wBalance}</LatoBold>
                   </View>
                   
               
               
                </View>
            )
        }
    render(){
    return(
        <View style={styles.container}>
            <NavBar
            leftMenu
            center
            centerText='Profile'
            />
            {this.renderWalletBox()}
            {this.renderFooter()}
     </View>
    )
}
}

const styles = StyleSheet.create({
container: {
  flex: 1, 
  backgroundColor: BACKGROUND_COLOR,
  flexDirection:'column'
  
},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
input:{
paddingRight: 10,
lineHeight: 23,
flex: 2,
textAlignVertical: 'top'
},
orderContainer:{
    width:'90%',
    backgroundColor:NAV_BACK_COLOR,
    alignSelf:'center',
    marginTop:50,
 
},
containerSellBuyHeading:{
    width:'90%',
    backgroundColor:NAV_BACK_COLOR,
    alignSelf:'center',
    marginTop:10,
    
    
}
});