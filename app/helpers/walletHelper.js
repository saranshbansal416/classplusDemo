import { SERVER_URL } from "../Config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const userWallet =async(done)=>{
  
    const userId = await AsyncStorage.getItem('userId');
  console.log('userrrrIDD', userId);
  await  fetch(SERVER_URL+`wallet/fetch/info/${userId}`,{
        method:'POST',
        // body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
         console.log('walletInfo', resp);
        if(resp.error===null){
            
            return done(resp,true);
        }
      else{
          return done(resp,false);
      }
    })
    .catch((e)=>{
        console.log('error',e);
        return done(e,true);
    });
}