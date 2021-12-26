import React from 'react';
import {View, Text, TouchableOpacity,TextInput,Image} from 'react-native'
const API_KEY ='AIzaSyD9UbupbuQ_Asm0M6DCiYwJQm7CR2-LEAs';

export default class ImageSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
result:'https://',
searchquery:'',
searchText:'',
        }
        // `https://www.googleapis.com/customsearch/v1?q=harrypotter&amp;cx=011476162607576381860:ra4vmliv9ti&amp;key=${key}`
    }
   
     getRequestData(query){
         console.log('query', query);
         fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyD9UbupbuQ_Asm0M6DCiYwJQm7CR2-LEAs&cx=011476162607576381860:ra4vmliv9ti&q=${query}}`,{
             method:'GET', 
             headers:{
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
             }   
         }).then((resp)=>resp.json())
         .then(jsonStr=>{
console.log('skfbafs',jsonStr.items[0].pagemap.cse_thumbnail[0].src);
 this.setState({result:JSON.stringify(jsonStr.items[0].pagemap.cse_thumbnail[0].src)},()=>{
     console.log('result', this.state.result);
 });
         })
         .catch((e)=>{
             console.log(e);
         })
     }
     getResultFromQuery=()=>{
         this.setState({searchText:this.state.searchquery});
         this.getRequestData(this.state.searchquery);
     }
     render(){
         console.log('imagess',this.state.result)
         return(
            <View>
            <Text>Image search</Text> 
         <TextInput
         placeholder='search images'
         value={this.state.searchquery}
         onChangeText={(value)=>{this.setState({searchquery:value})}}
         ></TextInput>
         <TouchableOpacity
         onPress={()=>{this.getResultFromQuery()}}
         >

             <Text>Submit</Text>
         </TouchableOpacity>
         <Image
         
        source={{uri:this.state.result}}
         style={{width:150,height:150,borderColor:'grey',borderWidth:2,alignSelf:'center',backgroundColor:'grey'}}
         />
             <Image
      style={{width: 50, height: 50,backgroundColor:'red'}}
      source={{uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQq9dd4vnOr1t91kF4UVVsqkG-y9b_stSNyPJ1fah18eGnXcsXrPsIqHaE'}}
    />
         </View>
         )
       
     }
}