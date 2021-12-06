import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import createClient from '../../apollo/createClient';
import LOGIN_USER from '../../apollo/mutation/login';

const Login = (props) => {
  const [formLogin, setFormLogin] = useState({
    userName: '',
    password: '',
  })

  const handleLogin = async () =>  {
    try{
      console.log('formLogin', formLogin);
      const client = await createClient();
      const resultLogin = await client.mutate({
        mutation: LOGIN_USER,
        variables: {
          userName: formLogin.userName,
          password: formLogin.password,
        }
      })
      console.log('resultLogin', resultLogin);
      if(resultLogin?.data?.userLogin?.token){
        props.navigation.navigate('ChatScreen', {
          userLogin: resultLogin.data.userLogin
        })
      }
      // props.navigation.navigate('ChatScreen')
    }catch(error){
      console.log('error', error)
    }
  }

  return (
    <SafeAreaView
      style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:16,
      }}
    >
      <View style={{width:'100%'}}>
        <Text>User name:</Text>
        <TextInput 
          style={{
            borderWidth: 0.4,
            height:38,
            paddingLeft:10,
          }}
          value={formLogin.userName}
          onChangeText={(value) => {setFormLogin({...formLogin, userName: value})}}
        />
        <Text>Password:</Text>
        <TextInput 
          style={{
            borderWidth: 0.4,
            height:38,
            paddingLeft:10,
          }}
          value={formLogin.password}
          onChangeText={(value) => {setFormLogin({...formLogin, password: value})}}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            backgroundColor:'green',
            height:48,
            borderRadius:4,
            marginTop:12,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={()=> {
            handleLogin();
          }}
        >
          <Text style={{color:'#ffffff', fontSize:18,}}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login;