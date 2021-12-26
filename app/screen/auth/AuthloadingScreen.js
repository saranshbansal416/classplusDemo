import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
// import OneSignal from 'react-native-onesignal';
// import { connect } from 'react-redux';
// import * as actions from '../../actions';
// import AppIntro from '../../components/common/animatedComponents/AppIntro';
// import LanguageContext from '../../languages/LanguageContext';
// import InternetWarningModal from '../../components/common/InternetWarningModal';
import { BACKGROUND_COLOR } from '../../Config/color';
const { height, width } = Dimensions.get('screen');
import { getTimeSinceStartup } from 'react-native-startup-time';
class AuthLoadingScreen extends React.Component {
  state = {
    showIntro: false,
    isInternetWarningVisible: false,
    message: ''
  }
  constructor(props){
    super(props);
   
  }

  async componentDidMount(){
    getTimeSinceStartup().then((time) => {
      console.log(`Time since startup: ${time} ms`);
    });
      const userToken = await AsyncStorage.getItem('userId');
      if(userToken){

        this.props.navigation.navigate('Home');
      }
      else{
        this.props.navigation.navigate('Auth');
      }


  }
//   async componentDidMount() {
//     OneSignal.addEventListener('ids', this.onIds);
//     OneSignal.configure();
//   }
//   onIds = async (device) => {
//     const userToken = await AsyncStorage.getItem('userToken');
//     window.playerId = device.userId;
//     this.getSettings(userToken);
//   }

//   closeInternetWarning = () => {
//     this.setState({ isInternetWarningVisible: false });
//   }
//   openInternetWarning = () => {
//     this.setState({ isInternetWarningVisible: true });
//   }
//   getSettings = async (userToken) => {
//     try {
//       const response = await this.props.getSettings();
//       const showIntro = await AsyncStorage.getItem('appIntro');
//       // this.props.languageData.changeLanguage('fr');
//       console.log(response);
//       if (response.status) {
//         if (showIntro == null) {
//           this.setState({ showIntro: true });
//         } else {
//           this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//         }
//       } else {
//         this.setState({ isInternetWarningVisible: true, message: response.messsage });
//         setTimeout(() => {
//           this.getSettings();
//         }, 3000);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   onSliderDone = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');
//     await AsyncStorage.setItem('appIntro', 'done');
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   }
  render() {
    // if (this.state.showIntro) {
    //   return <AppIntro onDone={this.onSliderDone} />;
    // }
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/splash.png')}
          style={{
            flex: 1,
            width: 200,
            height: 200,
           resizeMode:'center',
            alignSelf:'center'
          }}
        />
        {/* <InternetWarningModal
          isVisible={this.state.isInternetWarningVisible}
          message={this.state.message}
          close={this.closeInternetWarning}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:BACKGROUND_COLOR,
    flex: 1,
  },
});
export default AuthLoadingScreen;
// const withLanguageContext = (Component) => {
//   return (props) => (
//     <LanguageContext.Consumer>
//       {(languageData) => {
//         return <Component {...props} languageData={languageData} />;
//       }}
//     </LanguageContext.Consumer>
//   );
// };
// export default withLanguageContext(connect(null, actions)(AuthLoadingScreen));
