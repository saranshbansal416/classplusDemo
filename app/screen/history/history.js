import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ToastAndroid, ScrollView} from 'react-native';
import { LatoBlack } from '../../components/common/text/LatoBlack';
import { BACKGROUND_COLOR, BTN_BACK_COLOR1, NAV_BACK_COLOR } from '../../Config/color';
import NavBar from '../../components/common/NavBar';
import Collapsible from 'react-native-collapsible';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { LatoBold } from '../../components/common/text/LatoBold';
import { CustomTextInputBlock } from '../../components/common/TextInput/CustomTextInputBlock';
import { buyPlaceOrder,fetchSellTrading,sellPlaceOrder } from '../../helpers/orderHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { fetchBuyTrading } from '../../helpers/orderHelpers';
import { historyOrder } from '../../helpers/orderHelpers';
export default class HistoryOrder extends Component{
    constructor(props){
        super(props);
        this.state={
      dataList:[]
        }
    }
    componentDidMount(){
        this.fetchData()
  
    }
    fetchData=()=>{
      historyOrder('',(data,status)=>this.onFetchDone(data,status));
    }
    onFetchDone=(data,status)=>{
      console.log('dataaaaa0',data.orderlist);
      this.setState({dataList:data.orderlist},()=>{
          console.log('sataaa',this.state.dataList);
      })
            }
  
   
   renderItem=({item,index})=>{
       return(
           <View style={styles.containerSellBuyHeading}>
                <View style={{width:'50%',height:25,backgroundColor:BTN_BACK_COLOR1}}>
                 <LatoBold style={{color:'white',alignSelf:'center',padding:5}}>{item.order_type==='buy'?'BUY':'SELL'}</LatoBold>
                 </View>
            <View style={{flexDirection:'row',marginBottom:10}}>
            <View style={{flexDirection:'column'}}>
              <View style={{padding:10}}>
              <LatoBold style={{color:'white',fontSize:14,marginTop:0,alignSelf:'center',padding:10}}>{item.currency_symbol}</LatoBold>

                {/* <Image source={require('../../assets/images/b1.png')} 
                style={{width:50, height:50, tintColor:'white'}}/>  */}
                </View>

              </View>

              <View style={{flexDirection:'column'}}>
              <View style={{padding:10}}>
                
              <LatoBold style={{color:'white',fontSize:12,alignSelf:'center',padding:10}}>{'Quantity'}</LatoBold>
 
                </View>
              <LatoBold style={{color:'white',fontSize:14,marginTop:-20,alignSelf:'center',padding:10}}>{item.order_quantity}</LatoBold>

              </View>

              <View style={{flexDirection:'column'}}>
              <View style={{padding:10}}>
                
              <LatoBold style={{color:'white',fontSize:12,alignSelf:'center',padding:10}}>{'Amount'}</LatoBold>
 
                </View>
              <LatoBold style={{color:'white',fontSize:14,marginTop:-20,alignSelf:'center',padding:10}}>{item.order_amount}</LatoBold>

              </View>
              <View style={{flexDirection:'column',position:'absolute',right:10}}>
<LatoBold style={{color:BTN_BACK_COLOR1, fontWeight:'bold',fontSize:15,marginTop:15}}>{item.order_option}</LatoBold>
              </View>
            </View>
            
          
          
           </View>
       )
   }
   
   
  
    render(){
        return(
            <View style={styles.container}>
              <NavBar leftMenu center centerText={'History'}/>
            <FlatList
            data={this.state.dataList}
            renderItem={this.renderItem}
            />
       
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
    box:{
      width:'80%',
      backgroundColor:NAV_BACK_COLOR
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