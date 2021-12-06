import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

function InputChat({
  onChangeMessage,
  onSend,
}) {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  async function _selectPhoto(){
    try{
      launchImageLibrary({
        mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
      }, (response) => {
        console.log("response", response);
        if(response.didCancel) return;
        const photo = {
          uri: response.uri,
          name: response.fileName,
          type: response.type
        };
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFile(photo)
      })
    }catch(error){

    }
  }

  async function _takePhoto(){
    try{
      launchCamera({
        mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
      }, (response) => {
        if(response.didCancel) return;
        console.log("response", response);
        const photo = {
          uri: response.uri,
          name: response.fileName,
          type: response.type
        };
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFile(photo)
      })
    }catch(error){

    }
  }

  function renderImage(){
    return (
      file != null ? (
        <View style={{marginTop:10}}>
          <TouchableOpacity
            onPress={()=> {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setFile(null)
            }}
            style={{
              position:"absolute", 
              width:30, 
              height:30, 
              backgroundColor:"#ddd", 
              borderRadius:50 ,
              zIndex:2, 
              left:-4, 
              top:-12,
              alignItems:"center", 
              justifyContent:"center"
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <Image source={{uri: file.uri}} style={{width: width/2, height:200}} />
        </View>
      ): null
    )
  }

  return (
    <View style={{ width: width,  padding: 10,  backgroundColor:"#fff" }}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        {/* <TouchableOpacity
          onPress={()=> {
            _selectPhoto()
          }}
          style={styles.touchOption}>
          <Text>
            Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
          _takePhoto()
        }} style={styles.touchOption}>
          <Text>
            Camera
          </Text>
        </TouchableOpacity> */}
        <TextInput
          style={{ borderWidth: 0.5, borderColor: "#bbb", borderRadius: 15, flex: 1,
        paddingLeft:15, height:38 }}
          onChangeText={(text) => { setMessage(text) }}
          value={message}
        />
        <TouchableOpacity 
          onPress={()=> {
            if(onSend && typeof onSend === "function"){
              onSend(message, file);
              setMessage("");
              setFile(null);
            }
          }}
          style={{ 
            marginLeft: 10, 
            width: 60, 
            justifyContent: "center", 
            alignItems: "center", 
            height: 50 
          }}
        >
          <Text style={{ color: '#0066FF', fontSize: 16, fontWeight: "bold" }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
      {/* {
        renderImage()
      } */}
    </View>
  )
}

export default InputChat;

const styles = StyleSheet.create({
  touchOption: { width: 60, height: 50, alignItems: "center", justifyContent: "center", marginRight: 5 }
})