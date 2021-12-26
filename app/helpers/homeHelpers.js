import { SERVER_URL } from "../Config/constants"
export const getCurrencyFetcher =(done)=>{
    fetch(SERVER_URL+'/currencies/fetch/currencieslist',{
        method:'GET'
    })
    .then((resp)=>resp.json())
    .then(resp=>{
       // console.log('currencyData', resp);
        return done(resp,false);
    })
    .catch((e)=>{
        console.log('error',e);
        return done(e,true);
    });

}