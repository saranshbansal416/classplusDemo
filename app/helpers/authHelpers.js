import { SERVER_URL } from "../Config/constants";
export const registerUser =(params,done)=>{
    console.log('saasas',JSON.stringify(params));
    let formBody = new FormData();
    formBody.append('phone', JSON.stringify(params));
    fetch(SERVER_URL+'authregister/phoneotp',{
        method:'POST',
        body:formBody
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('registerDatas', resp);
        if(resp.error===null){
            return done(resp,true);
        }
      else{
          return done(resp,false);
      }
    })
    .catch((e)=>{
        console.log('error',e);
        return done(e,false);
    });
}

export const registerOTP=(params,done)=>{
    console.log('saadfdsfsas',params);
    let formData = new FormData();
    formData.append('phone', params.phone);
    formData.append("email", params.email);
    formData.append("password", params.password);
    formData.append("first_name", 'user');
    formData.append("last_name", 'lastname');
    formData.append("birth_date", '23/01/1996');
    formData.append("gender", 'Male');
    formData.append("otp", '123456');
    fetch(SERVER_URL+'authregister/commit',{
        method:'POST',
        body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('registerDatas', resp);
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

export const loginUser=(params,done)=>{
    console.log('saadfdsfsas',params);
    let formData = new FormData();
    formData.append("identity", params.phone); // phone or email
    formData.append("password", params.password);
    
    fetch(SERVER_URL+'login',{
        method:'POST',
        body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('loginData', resp);

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

export const forgotUser =(params,done)=>{
    console.log('saadfdsfsas',params);
    let formData = new FormData();
    formData.append("phone", params);
    formData.append("email", '');
    formData.append("resetkey", 'phone');
    fetch(SERVER_URL+'forgot',{
        method:'POST',
        body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('forgotData', resp);
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
export const resetUser =(params,done)=>{
    console.log('saadfdsfsas',params);
    let formData = new FormData();
    formData.append("phone", params.phone);
    formData.append("email", '');
    formData.append("resetkey", 'phone');     /// phone/email
    formData.append("password", params.password);
    formData.append("otp",  '123456');
    fetch(SERVER_URL+'forgot/setnew',{
        method:'POST',
        body:formData
    })
    .then((resp)=>resp.json())
    .then(resp=>{
        console.log('forgotData', resp);
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