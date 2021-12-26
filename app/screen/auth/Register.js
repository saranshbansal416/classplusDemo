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
    ScrollView
} from 'react-native';
import { LatoBlack } from '../../components/common/text/LatoBlack';
import { LatoBold } from '../../components/common/text/LatoBold';
import { BACKGROUND_COLOR, BTN_BACK_COLOR, BTN_BACK_COLOR1, TEXT_COLOR } from '../../Config/color';
import { CustomTextInputBlock } from '../../components/common/TextInput/CustomTextInputBlock';
import { registerUser } from '../../helpers/authHelpers';
export default class Register extends Component{

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
        renderNameError:'',
        renderEmailError:'',
        renderError:'',
        phone:'',
        loading:false,
        nameStatus:false,
        emailStatus:false,
        passwordStatus:false,
        phoneStatus:false
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
validationRegister=()=>{
    console.log('sasa');
if(this.state.name!==''&& this.state.email!=='' && this.state.phone!==''&& this.state.password!==''
&& this.state.nameStatus && this.state.passwordStatus && this.state.emailStatus&& this.state.phoneStatus
){
    return true;
}
else{
    return false;
}
}
onRegister=()=>{

    console.log('phone', this.state.phone);
    this.setState({loading:true})
    if(this.validationRegister()){
        console.log('asddasd');
        // const params={ 
        //     name:this.state.name,
        //     email:this.state.email,
        //     phone:this.state.phone,
        //     password:this.state.password
        // }
     registerUser(this.state.phone,(data,status)=>this.onDone(data,status))
    }
    else{
        console.log('Failed to register');
        this.setState({loading:false});
        Alert.alert('Please enter the valid data',
        '',
        [
            { text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ]);
    }
   
}
onDone=(data,status)=>{
if(status){
    this.setState({loading:false});
    this.props.navigation.navigate('OTPScreen',{
        name:this.state.name,
        password:this.state.password,
        phone:this.state.phone,
        email:this.state.email
    });
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
renderHeader=()=>{
    return(
        
//         <View style={{marginLeft:20,marginTop:20,flexDirection:'row',flex:1}}>
//         <View style={{flexDirection:'column'}}>
//         <LatoBold style={{color:TEXT_COLOR,fontSize:20}}>Register</LatoBold>
// <LatoBlack style={{color:TEXT_COLOR,fontSize:12,marginTop:8}}>Enter your details to get started</LatoBlack>
//         </View>
//         <View style={{right:15,position:'absolute'}}>
//             <Image source={require('../../assets/images/splash.png')}
//             style={{width:65,height:65}}
//             />
//         </View>
       
//         </View>
<View style={{backgroundColor:'#252527',flexDirection:'row',marginTop:10}}>
<View style={{flexDirection:'column',marginLeft:20,marginTop:20,marginBottom:20}}>
<LatoBold style={{color:TEXT_COLOR,fontSize:20}}>Register</LatoBold>
<LatoBlack style={{color:TEXT_COLOR,fontSize:12,marginTop:8}}>Enter your details to get started!</LatoBlack>
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
this.setState({renderNumberError:'Phone number must be of 10 digits',phoneStatus:false})
}
else if(value.length>10){
    this.setState({renderNumberError:'Phone number should not be greater than 10 digits.',phoneStatus:false})
}
else if(value.length===0){
    this.setState({renderNumberError:'',phoneStatus:false})
}
else{
    this.setState({renderNumberError:'',phoneStatus:true}) ;
    this.setState({phone:value});
}
}
validatePassword=(value)=>{
if(value.length<6){
    this.setState({renderPasswordError:'Password must have atleast 6 characters.',passwordStatus:false})
}
else if(value.length==0){
    this.setState({renderPasswordError:'',passwordStatus:false})
}
else{
    this.setState({password:value,passwordStatus:true,renderPasswordError:''});
}
}
validateName=(value)=>{
    if(value.length!==0){
        this.setState({name:value,nameStatus:true,renderNameError:''});
  
    }
    else{
        this.setState({renderNameError:'Please enter the name',nameStatus:false});
      
    }
}
validateEmail=(value)=>{
    if(value.length!==0){
        this.setState({email:value,emailStatus:true,renderEmailError:''})
    }
    else{
        this.setState({renderEmailError:'Please enter the email',emailStatus:false});
    }
}
renderForm=()=>{
    return(
        <ScrollView 
        
        style={{marginTop:120,marginBottom:250,width:'90%',height:'80%',marginLeft:20,flexDirection:'column',position:'absolute'}}>
        <View style={{width:'90%'}}>
        
       <CustomTextInputBlock
       headerLabel='Enter your name'
       onValidation={(value)=>this.validateName(value)}
       status={this.state.nameStatus}
       renderError={this.state.renderNameError}
    
      
       />
         <CustomTextInputBlock
       headerLabel='Enter your email address'
       onValidation={(value)=>this.validateEmail(value)}
      style={{marginTop:10}}
      status={this.state.emailStatus}
       renderError={this.state.renderEmailError}
     
       />
          <CustomTextInputBlock
       headerLabel='Enter your phone number'
       onValidation={(value)=>this.validatePhoneNumber(value)}
      style={{marginTop:10}}
      renderError={this.state.renderNumberError}
keyboardType='number-pad'
status={this.state.phoneStatus}
  
       />
          <CustomTextInputBlock
       headerLabel='Enter your password'
       onValidation={(value)=>this.validatePassword(value)}
      style={{marginTop:10}}
       renderError={this.state.renderPasswordError}
       status={this.state.passwordStatus}
       secureText={true}
       />
         
              {this.renderTerms()}
              {this.renderFooter()}
                </View>
                </ScrollView>
    )
}
renderTerms=()=>{
    return(
        <View style={{justifyContent:'center',marginTop:10}}>
            <LatoBold style={{color:BTN_BACK_COLOR}}>I am agree with the Terms and Policy of the company</LatoBold>
        </View>
    )
}
renderFooter=()=>{
    return(
        <View style={{width:'90%',alignSelf:'center',marginTop:20}}>
{this.state.loading?<ActivityIndicator size={'small'} color={{BTN_BACK_COLOR1}}/>:<TouchableOpacity 
onPress={()=> this.onRegister()}
//onPress={()=>this.props.navigation.navigate('OTPScreen')}
style={{backgroundColor:BTN_BACK_COLOR1,height:40,borderRadius:5}}>
    <View>
        <LatoBold style={{color:'white',fontSize:16,justifyContent:'center',alignSelf:'center',marginTop:10}}>REGISTER</LatoBold>
    </View>
</TouchableOpacity>}
<View style={{alignSelf:'center',flexDirection:'row'}}>
    <LatoBlack style={{color:'white',marginTop:10,fontSize:12}}>Already have an account?</LatoBlack>
    <TouchableOpacity
    onPress={()=>this.props.navigation.navigate('Login')}
    >
    <View>
        <LatoBold style={{color:BTN_BACK_COLOR,marginLeft:5,fontSize:14,justifyContent:'center',alignSelf:'center',marginTop:10}}>Login</LatoBold>
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
          <LatoBold style={{color:'red',fontSize:12}}>{this.state.renderError}</LatoBold>
       
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