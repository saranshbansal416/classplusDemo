import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { LatoBlack } from '../../components/common/text/LatoBlack';
import { LatoBold } from '../../components/common/text/LatoBold';
import { BACKGROUND_COLOR, BTN_BACK_COLOR, BTN_BACK_COLOR1, TEXT_COLOR } from '../../Config/color';
import { CustomTextInputBlock } from '../../components/common/TextInput/CustomTextInputBlock';
import { loginUser } from '../../helpers/authHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default class LoginScreen extends Component{

constructor(props){
    super(props);
    this.state={
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        animating:false,
        renderNumberError:'',
        renderPasswordError:'',
        phone:'',
        loading:false,
        phoneStatus:false,
        passwordStatus:false
    }
    
  /*  this.storage.get('loginToken').then(data => { 
        console.log(JSON.parse(data));
        let data1 = JSON.parse(data);
        if(data1){ if(data1=="yes"){ 
           console.log(data1);
            this.props.navigation.navigate('try_navigate'); 
         }}
    });  */
  
}
renderHeader=()=>{
    return(
        
        <View style={{backgroundColor:'#252527',flexDirection:'row'}}>
        <View style={{flexDirection:'column',marginLeft:20,marginTop:30,marginBottom:20}}>
        <LatoBold style={{color:TEXT_COLOR,fontSize:20}}>Login</LatoBold>
<LatoBlack style={{color:TEXT_COLOR,fontSize:12,marginTop:8}}>Enter your phone number and password</LatoBlack>
        </View>
        <View style={{right:15,position:'absolute',marginTop:20}}>
            <Image source={require('../../assets/images/splash.png')}
            style={{width:65,height:65}}
            />
        </View>
       
        </View>
       
    )
}
validatePhoneNumber= (value)=>{
if(value.length<10){
this.setState({renderNumberError:'Phone number must be of 10 digits',phoneStatus:false})
}
else if(value.length>10){
    this.setState({renderNumberError:'Phone number should not be greater than 10 digits.',phoneStatus:false})
}
else if(value.length===0){
    this.setState({renderNumberError:'',phoneStatus:false})
}
else{
    this.setState({phone:value,renderNumberError:'',phoneStatus:true}) 
}
}
validatePassword=(value)=>{
if(value.length<6){
    this.setState({renderPasswordError:'Password must be of 6 characters.',passwordStatus:false})
}

else if(value.length==0){
    this.setState({renderPasswordError:'',passwordStatus:false})
}
else{
    this.setState({password:value,renderPasswordError:'',passwordStatus:true})
}
}
validatorLogin=()=>{
    if(this.state.phone!==''&&this.state.password!==''&& this.state.phoneStatus && this.state.passwordStatus){
        return true
    }
    else{
        return false
    }
}
onLogin=()=>{
    if(this.validatorLogin()){
        this.setState({loading:true})
     const params={
         phone:this.state.phone,
         password:this.state.password,
         sendotp:'yes'
     }
     loginUser(params,(data,status)=>this.onDone(data,status));
    }
     else{
        Alert.alert('Please enter the valid data',
        '',
        [
            { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ]);
     }
    }

    onDone=async(data,status)=>{
        if(status){
            this.setState({loading:false});
             await AsyncStorage.setItem('userId',data.udata.unique_id);
             const getUserId=await AsyncStorage.getItem('userId');
             console.log('ussssssserID',getUserId);
            this.props.navigation.navigate('Home');
        }
        else{
            this.setState({loading:false});
            Alert.alert('Please enter the valid data',
            '',
            [
               
                { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ]);
        }
        }
renderForm=()=>{
    return(
        <View style={{width:'90%',marginTop:150,marginLeft:20,flexDirection:'column',position:'absolute',justifyContent:'center'}}>
        
       <CustomTextInputBlock
       headerLabel='Enter your phone number'
       onValidation={(value)=>this.validatePhoneNumber(value)}
       keyboardType='number-pad'
        renderError={this.state.renderNumberError}
        status={this.state.phoneStatus}
       />
         <CustomTextInputBlock
       headerLabel='Enter your password'
       onValidation={(value)=>this.validatePassword(value)}
      style={{marginTop:10}}
        renderError={this.state.renderPasswordError}
       secureText={true}
       status={this.state.passwordStatus}
       />
                <TouchableOpacity
                style={{marginTop:20}}
    onPress={()=>{this.props.navigation.navigate('ForgotPassword')}}
    >
    <View>
        <LatoBold style={{color:BTN_BACK_COLOR1,marginLeft:5,fontSize:14}}>Forgot Password ?</LatoBold>
    </View>
    </TouchableOpacity>
                </View>
    )
}
renderFooter=()=>{
    return(
        <View style={{width:'90%',alignSelf:'center',position:'absolute',bottom:20}}>
            {this.state.loading?<ActivityIndicator size={'small'} color={BTN_BACK_COLOR1}/>:
<TouchableOpacity 
onPress={()=>this.onLogin()}
//onPress={()=>this.props.navigation.navigate('Home')}
style={{backgroundColor:BTN_BACK_COLOR1,height:40,borderRadius:5}}>
    <View>
        <LatoBold style={{color:'white',fontSize:16,justifyContent:'center',alignSelf:'center',marginTop:10}}>LOGIN</LatoBold>
    </View>
</TouchableOpacity>
}
<View style={{alignSelf:'center',flexDirection:'row'}}>
    <LatoBlack style={{color:'white',marginTop:10,fontSize:12}}>Don't have an account yet?</LatoBlack>
    <TouchableOpacity
    onPress={()=>{this.props.navigation.navigate('Register')}}
    >
    <View>
        <LatoBold style={{color:BTN_BACK_COLOR,marginLeft:5,fontSize:14,justifyContent:'center',alignSelf:'center',marginTop:10}}>Register</LatoBold>
    </View>
    </TouchableOpacity>
</View>
        </View>
    )
}

render(){


    return (
      <View style={styles.container}>
         {this.renderHeader()}
      {this.renderForm()}
         {this.renderFooter()}
      </View>
    );

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