import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator,BackHandler,Alert} from 'react-native';
import { LatoBlack } from '../../components/common/text/LatoBlack';
import { BACKGROUND_COLOR } from '../../Config/color';
import NavBar from '../../components/common/NavBar';
import { getCurrencyFetcher } from '../../helpers/homeHelpers';
import CurrencyDataModel from '../../components/Models/CurrencyDataModel';
import { FlatList } from 'react-native-gesture-handler';
import { userWallet } from '../../helpers/walletHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
loading:true,
currencyData:[]
        }
    }
    componentDidMount(){
        // this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        //     Alert.alert("Exit", "Are you sure you want to exit the app?", [{ text: "Cancel", onPress: () => {}, style: "cancel" }, { text: "Logout", onPress: () => this.handleLogout() }], { cancelable: false });
        //     return true;
        // });
        getCurrencyFetcher((data,error)=>this.onDone(data,error));
        userWallet((data,status)=>this.onFetchWallet(data,status))
    }
    // componentWillUnmount(){
    //     this.backHandler.remove();
    // }
    // handleLogout=()=>{
     
    //     BackHandler.exitApp();
    // }
    onFetchWallet=async(data,status)=>{
        console.log('sdasd',data);
        if(status){
            await AsyncStorage.setItem('walletBalance',data.wallet.balance);

        }
    }
    onDone=(data,error)=>{
        if(!error){
            this.setState({loading:false});
            this.setState({currencyData:data.list},()=>{
              //  console.log('currsb', this.state.currencyData[0])
            });

        }
       
    }
    redirectScreen=(item)=>{
this.props.navigation.navigate('Exchange',{cSymbol:item.symbol,ucode:item.unique_code});
    }
    renderData=({item, index})=>{
      //  console.log('render',item);
        return(
<CurrencyDataModel data={item} onPress={()=>this.redirectScreen(item)}/>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <NavBar
                leftMenu
                center
                centerText='Dashboard'
                />
                <View>
                    {this.state.loading?
                    <View style={{marginTop:250}}>
                    <ActivityIndicator size={40} color={'white'}/>
                    </View>
                    :
                    <FlatList
                    data={this.state.currencyData}
                    renderItem={this.renderData}
                    />
                    }

                </View>
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
}
  });