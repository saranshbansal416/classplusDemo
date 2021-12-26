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
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { LatoBlack } from '../../components/common/text/LatoBlack';
import { LatoBold } from '../../components/common/text/LatoBold';
import { BACKGROUND_COLOR, BTN_BACK_COLOR, BTN_BACK_COLOR1, TEXT_COLOR } from '../../Config/color';
import { CustomTextInputBlock } from '../../components/common/TextInput/CustomTextInputBlock';
import { BlueButton } from '../../components/common/Button/BlueButton';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { registerOTP } from '../../helpers/authHelpers';
export default class OTPScreen extends Component{
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
        OTPValue:'',
        loading:false
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
validateOTP=()=>{
    if(this.state.OTPValue!==''){
        this.setState({OTPValue})
        return true;
    }
    else{
        return false;
    }
}
onSubmitOTP=()=>{
    this.setState({loading:true});

   if(this.validateOTP){
      const params={ 
            name:this.props.route.params.name,
            email:this.props.route.params.email,
            phone:this.props.route.params.phone,
            password:this.props.route.params.password,
            otp:this.state.OTPValue

      }
            registerOTP(params,(data,status)=>this.onDone(data,status))
        }
        else{
            console.log('Failed to register');
            this.setState({loading:false})
        }
   }
   onDone=(data,status)=>{
    if(status){
        this.setState({loading:false});
        ToastAndroid.show('Account created successfully !!',ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
    }
    else{
        this.setState({loading:false});
        Alert.alert('This number already exists !!',
        '',
        [
            { text: 'OK', onPress: () => {console.log('Cancel Pressed')
        this.props.navigation.navigate('Register');
        }, style: 'cancel' },
        ]);
    }
    }
    validatorOTP=()=>{

    }
renderHeader=()=>{
    return(
        
        <View style={{backgroundColor:'#252527',flexDirection:'row',marginTop:10}}>
        <View style={{flexDirection:'column',marginLeft:20,marginTop:20,marginBottom:20}}>
        <LatoBold style={{color:TEXT_COLOR,fontSize:20}}>Enter OTP</LatoBold>
<LatoBlack style={{color:TEXT_COLOR,fontSize:12,marginTop:8}}>Enter otp for phone number verification.</LatoBlack>
        </View>
        <View style={{right:15,position:'absolute',marginTop:20}}>
            <Image source={require('../../assets/images/splash.png')}
            style={{width:65,height:65}}
            />
        </View>
       
        </View>
       
    )
}
validatePhoneNumber=(value)=>{
if(value.length<10){
this.setState({renderNumberError:'Phone number must be of 10 digits'})
}
else if(value.length>10){
    this.setState({renderNumberError:'Phone number should not be greater than 10 digits.'})
}
else if(value.length===0){
    this.setState({renderNumberError:''})
}
else{
    this.setState({renderNumberError:''}) 
}
}
validatePassword=(value)=>{
if(value.length<8){
    this.setState({renderPasswordError:'Password must be of 8 digits.'})
}
else if(value.length==0){
    this.setState({renderPasswordError:''})
}
}
renderForm=()=>{
    return(
        <View style={{width:'90%',marginTop:150,marginLeft:20,flexDirection:'column',position:'absolute',justifyContent:'center'}}>
        
       <CustomTextInputBlock
       headerLabel='Enter your one time password'
       keyboardType='number-pad'
       
       onValidation={(value)=>this.setState({OTPValue:value})}
       />
    
                </View>
    )
}
renderFooter=()=>{
    return(
        <View style={{width:'90%',alignSelf:'center',position:'absolute',bottom:20}}>
            {this.state.loading?<ActivityIndicator size={'small'} color={BTN_BACK_COLOR1}/>:
<BlueButton
buttonText='SUBMIT'
//onPressButton={()=>this.props.navigation.popToTop()}
onPressButton={()=>this.onSubmitOTP()}
/>
}
<View style={{alignSelf:'center',flexDirection:'row'}}>
    <LatoBlack style={{color:'white',marginTop:10,fontSize:12}}>Don't get OTP?</LatoBlack>
    <TouchableOpacity>
    <View>
        <LatoBold style={{color:BTN_BACK_COLOR,marginLeft:5,fontSize:14,justifyContent:'center',alignSelf:'center',marginTop:10}}>Resend</LatoBold>
    </View>
    </TouchableOpacity>
</View>
        </View>
    )
}


render(){

    return (
      <View style={styles.container}>
            <TouchableOpacity style={{
                        height: 20,
                        width: 20,
                        marginTop:10,
                        marginLeft:15
                    }}
                      onPress={() => this.props.navigation.goBack()}
                     >
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: '#ffffff'
                            }}
                            resizeMode={'contain'}
                            source={require('../../assets/images/backArrow.png')}/>
                    </TouchableOpacity>
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