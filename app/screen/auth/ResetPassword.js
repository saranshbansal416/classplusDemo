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
import { resetUser } from '../../helpers/authHelpers';
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
        confirmPassword:'',
        passwordStatus:false,
        confirmPasswordStatus:false

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
        
        <View style={{backgroundColor:'#252527',flexDirection:'row',marginTop:10}}>
        <View style={{flexDirection:'column',marginLeft:20,marginTop:20,marginBottom:20}}>
        <LatoBold style={{color:TEXT_COLOR,fontSize:20}}>Reset Password</LatoBold>
<LatoBlack style={{color:TEXT_COLOR,fontSize:12,marginTop:8}}>Set your password for smooth functioning.</LatoBlack>
        </View>
        <View style={{right:15,position:'absolute',marginTop:20}}>
            <Image source={require('../../assets/images/splash.png')}
            style={{width:65,height:65}}
            />
        </View>
       
        </View>
       
    )
}

validatePassword=(value)=>{
if(value.length<6){
    this.setState({renderPasswordError:'Password must be atleast 6 characters.',passwordStatus:false})
}
else if(value.length==0){
    this.setState({renderPasswordError:'',passwordStatus:false})
}
else{
    this.setState({password:value,passwordStatus:true,renderPasswordError:''})
}
}
validateConfirmPassword=(value)=>{
    if(value!==this.state.password){
     this.setState({renderError:'Password does not match',confirmPasswordStatus:false})
    }
    else{
        this.setState({confirmPassword:value,confirmPasswordStatus:true})
    }
}
renderForm=()=>{
    return(
        <View style={{width:'90%',marginTop:150,marginLeft:20,flexDirection:'column',position:'absolute',justifyContent:'center'}}>
        
       <CustomTextInputBlock
       headerLabel='Enter your password'
       onValidation={(value)=>this.validatePassword(value)}
       renderError={this.state.renderPasswordError}
       secureText={true}
       status={this.state.passwordStatus}
    //    keyboardType='number-pad'
    
       />
        <CustomTextInputBlock
       headerLabel='Enter your password again'
       onValidation={(value)=>this.validateConfirmPassword(value)}
    //    renderError={this.state.renderPasswordError}
       secureText={true}
       status={this.state.confirmPasswordStatus}
    //    keyboardType='number-pad'
    
       />
                </View>
    )
}
resetPassword=()=>{
    this.setState({loading:true});
if(this.state.password===this.state.confirmPassword && this.state.passwordStatus && this.state.confirmPasswordStatus){
    const params={
        password:this.state.password,
       
        phone:this.props.route.params.phone
    }
resetUser(params,(data,status)=>{this.onDone(data,status)})
}
else{
    ToastAndroid.show('Password does not match',ToastAndroid.SHORT);
}
}
onDone=(data,status)=>{
    if(status){
        this.setState({loading:false});
        this.props.navigation.navigate('Login');
    }
    else{
        this.setState({loading:false});
        ToastAndroid.show('Something went wrong.Please try again !!',ToastAndroid.SHORT);
    }
    }
renderFooter=()=>{
    return(
        <View style={{width:'90%',alignSelf:'center',position:'absolute',bottom:20}}>
            {/* <LatoBlack style={{color:'red',fontSize:15}}>{this.state.renderError}</LatoBlack> */}
            {this.state.loading?<ActivityIndicator size={'small'} color={{BTN_BACK_COLOR1}}/>:
<BlueButton
buttonText='DONE'
//onPressButton={()=>this.props.navigation.popToTop()}
onPressButton={()=>this.resetPassword()}
/>
}
{/* <View style={{alignSelf:'center',flexDirection:'row'}}>
    <LatoBlack style={{color:'white',marginTop:10,fontSize:12}}>Don't get OTP?</LatoBlack>
    <TouchableOpacity>
    <View>
        <LatoBold style={{color:BTN_BACK_COLOR,marginLeft:5,fontSize:14,justifyContent:'center',alignSelf:'center',marginTop:10}}>Resend</LatoBold>
    </View>
    </TouchableOpacity>
</View> */}
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
                    //  onPress={() => NavigationService.back()}
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