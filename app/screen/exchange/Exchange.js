import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ToastAndroid, ScrollView, Alert} from 'react-native';
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
export default class Exchange extends Component{
    constructor(props){
        super(props);
        this.state={
            dataList:[
                {id:1,name:'BTC',value:'1087864'},
                {id:2,name:'ETH',value:'1180548051'},
                {id:3,name:'USDT',value:'76585615.626'},
                {id:4,name:'BNB',value:'16688512'},
                {id:5,name:'DASH',value:'1045656'},
            ],
            currSelected:this.props.route.params.cSymbol,
            selectedCurrency:false,
            selectedMode:'Buy',
            selectedLimitStop:'Market',
            selectedLimit:0,
            selectedStop:0,
            selectedMarket:1,
            stopActive:false,
            isCollapsed:false,
            amount:'',
            limitAmount:'0',
            stopAmount:'0',
            loading:false,
            limitActive:false,
            dataBuyFetch:[],
            dataSellFetch:[],
        }
    }
    componentDidMount(){
        this.fetchData()
  
    }
    fetchData=()=>{
        fetchBuyTrading(this.state.currSelected, (data,status)=>this.onFetchDone(data,status));
        fetchSellTrading(this.state.currSelected, (data,status)=>this.onFetchSellDone(data,status));
    }
    onFetchDone=(data,status)=>{
     // console.log('dataaaaa0',data.orderlist);
      this.setState({dataBuyFetch:data.orderlist},()=>{
         // console.log('sataaa',this.state.dataBuyFetch);
      })
            }
    onFetchSellDone=(data,status)=>{
              //  console.log('dataaaaa0',data.orderlist);
                this.setState({dataSellFetch:data.orderlist},()=>{
               //     console.log('sataaa',this.state.dataBuyFetch);
                })
                      }
    onPlaceOrder=async()=>{
        const unique_id= await AsyncStorage.getItem('userId');
        const wBalance = await AsyncStorage.getItem('walletBalance');
        const wBalanceInt = JSON.parse(wBalance);
        console.log('userIDDDDD', unique_id,'walletbalance',wBalanceInt);
        if(this.state.selectedMode==='Buy'){
            this.setState({loading:true})
            const params={
                user_unique_code:unique_id,
                currency_symbol:this.state.currSelected,
                currency_unique_code:this.props.route.params.ucode,
                order_option:this.state.selectedLimitStop,
                order_amount:this.state.amount,
                order_limit:this.state.limitAmount,
                order_stop:this.state.stopAmount,
                percentage_ratio:2
            }
            if(wBalanceInt!==0&& this.state.amount<wBalanceInt){
                buyPlaceOrder(params,(data,status)=>{this.onDone(data,status)})
            }
else{
    this.setState({loading:false});
    Alert.alert('Your wallet does not have sufficient balance',
        '',
        [
            { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ]);
}
        }
        else{
            this.setState({loading:true})
            const params={
                user_unique_code:unique_id,
                currency_symbol:this.state.currSelected,
                currency_unique_code:this.props.route.params.ucode,
                order_option:this.state.selectedLimitStop,
                order_amount:this.state.amount,
                order_limit:this.state.limitAmount,
                order_stop:this.state.stopAmount,
                percentage_ratio:2
            }
            if(wBalanceInt!==0&& this.state.amount>wBalanceInt){
                sellPlaceOrder(params,(data,status)=>{this.onDone(data,status)})
            }
else{
    this.setState({loading:false});
    Alert.alert('Your wallet does not have sufficient balance',
        '',
        [
            { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ]);
}
        }
    }
    onDone=(data,status)=>{
if(data.error===null){
    this.setState({loading:false})
    ToastAndroid.show('Order Placed successfully !!',ToastAndroid.SHORT);
    this.fetchData();
}
else{
    this.setState({loading:false});
    ToastAndroid.show('Order not created', ToastAndroid.SHORT);
}
    }
    renderDataList=({item,index})=>{
        return(
            <TouchableOpacity 
            onPress={()=>this.setState({currSelected:item.name,isCollapsed:false})}
            style={{padding:2}}>
 <View style={{width:'80%',backgroundColor:NAV_BACK_COLOR,alignSelf:'center',flexDirection:'row'}}>
<LatoBold style={{color:'white',padding:10}}>{item.name}</LatoBold>
<LatoBold style={{color:'white',padding:10,position:'absolute',right:10}}>{item.value}</LatoBold>

            </View>
            </TouchableOpacity>
           
        )
    }
    renderCollapsibleBlock=()=>{
        return(
            <View>
 <View style={{flexDirection:'row',backgroundColor:NAV_BACK_COLOR,width:'80%',alignSelf:'center',marginTop:10}}>
            <LatoBlack style={{color:'white',padding:15}}>{this.state.currSelected}</LatoBlack>
           <TouchableOpacity
           style={{marginTop:15}}
           onPress={()=> this.setState({isCollapsed:!this.state.isCollapsed})}>
           <Image source={require('../../assets/images/down.png')}
            style={{width:20,height:20,tintColor:'white'}}/>
           </TouchableOpacity>
         
            </View>
            <Collapsible collapsed={!this.state.isCollapsed}>
                <FlatList
                data={this.state.dataList}
                renderItem={this.renderDataList}
                />
                </Collapsible>
            </View>
           
        )
    }
    renderCurrencyButton=()=>{
        return(
            <View style={{flexDirection:'row',width:'80%',alignSelf:'center',backgroundColor:NAV_BACK_COLOR,marginTop:10}}>
            <View style={{padding:15}} >
                <TouchableOpacity onPress={()=>this.setState({selectedCurrency:!this.state.selectedCurrency})}>
                <LatoBlack style={{color:!this.state.selectedCurrency?'white':'grey'}}>{this.state.currSelected+' - INR'}</LatoBlack>

                </TouchableOpacity>
            </View>
            <View style={{position:'absolute',right:20,marginTop:15}} >
            <TouchableOpacity onPress={()=>this.setState({selectedCurrency:!this.state.selectedCurrency})}>

            <LatoBlack style={{color:this.state.selectedCurrency?'white':'grey'}}>{this.state.currSelected+' - USD'}</LatoBlack>
           </TouchableOpacity>
            </View>
            </View>
        )
    }
    renderBuySell=()=>{
        return(
            <View style={{flexDirection:'row',alignSelf:'center',marginTop:15,width:'60%'}}>
            <TouchableOpacity
            onPress={()=>this.setState({selectedMode:'Buy'})}
            style={{backgroundColor:this.state.selectedMode=='Buy'?BTN_BACK_COLOR1:'grey'
            ,width:100,
            borderRadius:10}}>
             <LatoBold style={{color:'white',fontSize:12,padding:10,alignSelf:'center'}}>Buy</LatoBold>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>this.setState({selectedMode:'Sell'})}
            style={{backgroundColor:this.state.selectedMode=='Sell'?BTN_BACK_COLOR1:'grey',width:100,borderRadius:10,marginLeft:15}}>
             <LatoBold style={{color:'white',fontSize:12,padding:10,alignSelf:'center'}}>Sell</LatoBold>
            </TouchableOpacity>
            </View>
        )
    }
    renderLimitStop=()=>{
        return(
            <View style={{flexDirection:'row',width:'80%',alignSelf:'center',backgroundColor:NAV_BACK_COLOR,marginTop:20}}>
            <View style={{flex:0.3,padding:10,height:50}} >
                <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Market',stopActive:false,limitActive:false})}>
                <LatoBlack style={{color:this.state.selectedLimitStop==='Market'?'white':'grey'}}>{'Market'}</LatoBlack>

                </TouchableOpacity>
            </View>
            <View style={{flex:0.3,padding:10,marginLeft:30,height:50}} >
                <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Limit',limitActive:true,stopActive:false})}>
                <LatoBlack style={{color:this.state.selectedLimitStop==='Limit'?'white':'grey'}}>{'Limit'}</LatoBlack>

                </TouchableOpacity>
            </View>
            <View style={{flex:0.3,padding:10,height:50,position:'absolute',right:20}} >
            <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Stop',stopActive:true,limitActive:true})}>

            <LatoBlack style={{color:this.state.selectedLimitStop==='Stop'?'white':'grey'}}>{'Stop'}</LatoBlack>
           </TouchableOpacity>
            </View>
            </View>
        )
    }
    validateAmount=(value)=>{
this.setState({amount:value})
    }
    validateLimitOrder=(value)=>{
        this.setState({limitAmount:value})
    }
    validateStopOrder=(value)=>{
        this.setState({stopAmount:value});
    }
    renderForm=()=>{
        return(
            <View style={{width:'80%',marginTop:10,marginLeft:20,flexDirection:'column',alignSelf:'center'}}>
            
           <CustomTextInputBlock
           headerLabel='Amount'
           onValidation={(value)=>this.validateAmount(value)}
           keyboardType='number-pad'
   
           />
           {this.state.limitActive &&
           <View>
   <CustomTextInputBlock
           headerLabel='Limit Price'
         onValidation={(value)=>this.validateLimitOrder(value)}
          style={{marginTop:10}}
          keyboardType='number-pad'
           />
               </View>
           }
          
           {this.state.stopActive &&
           <View>
               <CustomTextInputBlock
           headerLabel='Stop Price'
           onValidation={(value)=>this.validateStopOrder(value)}
          style={{marginTop:10}}
         keyboardType='number-pad'
       
           />
               </View>
           }

           {this.renderFooter()}
                
                    </View>
        )
    }
    renderFooter=()=>{
        return(
            <View style={{width:'90%',alignSelf:'center',marginTop:10}}>
                {this.state.loading?<ActivityIndicator size={'small'} color={BTN_BACK_COLOR1}/>:
    <TouchableOpacity 
    onPress={()=>this.onPlaceOrder()}
    style={{backgroundColor:BTN_BACK_COLOR1,height:30,borderRadius:5}}>
        <View>
            <LatoBold style={{color:'white',fontSize:13,justifyContent:'center',alignSelf:'center',marginTop:5}}>{this.state.selectedMode=='Sell'?'Place Sell Order':'Place Buy Order'}</LatoBold>
        </View>
    </TouchableOpacity>
    }
    </View>
        )}
    renderHeading=()=>{
        return(
            <View style={{flexDirection:'row',width:'80%',alignSelf:'center',backgroundColor:NAV_BACK_COLOR,marginTop:2}}>
            <View style={{flex:0.3,padding:5,height:50}} >
                {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Market',stopActive:false,limitActive:false})}> */}
                <LatoBlack style={{color:'grey',fontSize:12}}>{'Quantity'}</LatoBlack>

                {/* </TouchableOpacity> */}
            </View>
            <View style={{flex:0.3,padding:5,marginLeft:40,height:50}} >
                {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Limit',limitActive:true,stopActive:false})}> */}
                <LatoBlack style={{color:'grey',fontSize:12}}>{'Amount'}</LatoBlack>

                {/* </TouchableOpacity> */}
            </View>
            <View style={{flex:0.3,padding:5,height:50,position:'absolute',right:5}} >
            {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Stop',stopActive:true})}> */}

            <LatoBlack style={{color:'grey',fontSize:12}}>{'Price'}</LatoBlack>
           {/* </TouchableOpacity> */}
            </View>
            </View>
        )
    }
    renderdataBuyFetchLayout=({item,index})=>{
        return(
            <View style={{flexDirection:'row',width:'80%',alignSelf:'center',backgroundColor:NAV_BACK_COLOR}}>
            <View style={{flex:0.3,padding:2,height:20}} >
                {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Market',stopActive:false,limitActive:false})}> */}
                <LatoBlack style={{color:'white',fontSize:12}}>{item.order_quantity}</LatoBlack>

                {/* </TouchableOpacity> */}
            </View>
            <View style={{flex:0.3,padding:2,marginLeft:50,height:20}} >
                {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Limit',limitActive:true,stopActive:false})}> */}
                <LatoBlack style={{color:'white',fontSize:12}}>{item.order_amount}</LatoBlack>

                {/* </TouchableOpacity> */}
            </View>
            <View style={{flex:0.3,padding:2,height:20,position:'absolute',right:5}} >
            {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Stop',stopActive:true})}> */}

            <LatoBlack style={{color:'red',fontSize:12}}>{item.unit_price}</LatoBlack>
           {/* </TouchableOpacity> */}
            </View>
            </View>
        )
    }
    renderdataSellFetchLayout=({item,index})=>{
        return(
            <View style={{flexDirection:'row',width:'80%',alignSelf:'center',backgroundColor:NAV_BACK_COLOR}}>
            <View style={{flex:0.3,padding:2,height:20}} >
                {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Market',stopActive:false,limitActive:false})}> */}
                <LatoBlack style={{color:'white',fontSize:12}}>{item.order_quantity}</LatoBlack>

                {/* </TouchableOpacity> */}
            </View>
            <View style={{flex:0.3,padding:2,marginLeft:50,height:20}} >
                {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Limit',limitActive:true,stopActive:false})}> */}
                <LatoBlack style={{color:'white',fontSize:12}}>{item.order_amount}</LatoBlack>

                {/* </TouchableOpacity> */}
            </View>
            <View style={{flex:0.3,padding:2,height:20,position:'absolute',right:5}} >
            {/* <TouchableOpacity onPress={()=>this.setState({selectedLimitStop:'Stop',stopActive:true})}> */}

            <LatoBlack style={{color:'green',fontSize:12}}>{item.unit_price}</LatoBlack>
           {/* </TouchableOpacity> */}
            </View>
            </View>
        )
    }
    renderSellBuyHeading=()=>{
        return(
            <View style={styles.containerSellBuyHeading}>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row'}}>
            <Image source={require('../../../app/assets/images/down.png')}
            style={{width:20,height:20,tintColor:'red'}}/>
            <LatoBold style={{color:'red', marginLeft:5}}>sell</LatoBold>
            </View>
            <View style={{flexDirection:'row'}}>
            <Image source={require('../../../app/assets/images/up.png')}
            style={{width:20,height:20,tintColor:'green'}}/>
            <LatoBold style={{color:'green', marginLeft:5}}>buy</LatoBold>
            </View>
            </View>
            <View style={{flexDirection:'row',marginTop:10,position:'absolute',right:10}}>
            <LatoBold style={{color:'white', marginLeft:5}}>Spread : 5400</LatoBold>
            
            </View>
                </View>  
            </View>
        )
    }
    renderOrderBook=()=>{
        return(
            <View style={styles.orderContainer}>
             {this.renderHeading()}
             <FlatList
             data={this.state.dataSellFetch}
             renderItem={this.renderdataBuyFetchLayout}
             style={{marginTop:-20}}
           />
           {this.renderSellBuyHeading()}
           <FlatList
             data={this.state.dataBuyFetch}
             renderItem={this.renderdataSellFetchLayout}
             style={{marginTop:10,marginBottom:20}}
           />
           
            </View>
        )
    }
    render(){
        return(
            <View style={styles.container}>
              <NavBar leftMenu center centerText={this.state.currSelected + ' (INR)'}/>
                     {/* {this.renderCollapsibleBlock()} */}
                {/* {this.renderCurrencyButton()} */}
                {this.renderBuySell()}
                {this.renderLimitStop()}
                {this.renderForm()}
                {/* {this.renderFooter()} */}
                {this.renderOrderBook()}
            
           
              
              
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
    width:'100%',
    backgroundColor:'black',
    alignSelf:'center',
    marginTop:20,
    
}
  });