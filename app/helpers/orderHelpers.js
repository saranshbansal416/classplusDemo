import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SERVER_URL } from "../Config/constants";

export const buyPlaceOrder =(params,done)=>{
    console.log('saadfdsfsas',params);
    let formData = new FormData();
    formData.append("user_unique_code", params.user_unique_code);
    formData.append("currency_symbol", params.currency_symbol);
    formData.append("currency_unique_code",params.currency_unique_code);
    formData.append("order_option", params.order_option); /// market / limit / stop
    formData.append("order_amount", params.order_amount);
    formData.append("order_limit", params.order_limit);
    formData.append("order_stop", params.order_stop);
    formData.append("percentage_ratio", params.percentage_ratio);
    fetch(SERVER_URL+'trading/buy/order',{
        method:'POST',
        body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('buydata', resp);
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

export const sellPlaceOrder =(params,done)=>{
    console.log('saadfdsfsas',params);
    let formData = new FormData();
    formData.append("user_unique_code", params.user_unique_code);
    formData.append("currency_symbol", params.currency_symbol);
    formData.append("currency_unique_code",params.currency_unique_code);
    formData.append("order_option", params.order_option); /// market / limit / stop
    formData.append("order_amount", params.order_amount);
    formData.append("order_limit", params.order_limit);
    formData.append("order_stop", params.order_stop);
    formData.append("percentage_ratio", params.percentage_ratio);
    fetch(SERVER_URL+'trading/sell/order',{
        method:'POST',
        body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('selldata', resp);
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
export const fetchBuyTrading =async(params,done)=>{
    console.log('saadfdsfsas',params);
  
  await  fetch(SERVER_URL+'trading/fetch/buy/'+params,{
        method:'POST',
        // body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        // console.log('tradingfetchBuy', resp);
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
export const fetchSellTrading =async(params,done)=>{
    console.log('saadfdsfsas',params);
  
  await  fetch(SERVER_URL+`trading/fetch/sell/${params}`,{
        method:'POST',
        // body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        // console.log('tradingfetchBuy', resp);
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
export const historyOrder =async(params,done)=>{
    console.log('saadfdsfsas',params);
    const userId = await AsyncStorage.getItem('userId');
  console.log('userrrrIDD', userId);
  await  fetch(SERVER_URL+`trading/fetch/history/${userId}`,{
        method:'POST',
        // body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        // console.log('tradingfetchBuy', resp);
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