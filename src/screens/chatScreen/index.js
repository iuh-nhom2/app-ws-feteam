import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import io from 'socket.io-client';
import * as uuid from 'uuid';
import InputChat from './InputChat';

const socket = io('http://localhost:3000');

const ChatScreen = props => {
  const userLogin = props.route.params.userLogin || {};
  console.log('userLogin', userLogin);
  const [chatList, setChatList] = useState([]);
  console.log('chatList',chatList)
  useEffect(() => {
    function receivedMessage(message) {
      const newMessage = {
        id: uuid.v4(),
        name: message.name,
        text: message.text,
      };
      console.log('newMessage', newMessage);
      setChatList([...chatList, newMessage]);
    }

    socket.on('msgToClient', message => {
      console.log('message', message);
      receivedMessage(message);
    });
  }, [chatList]);

  const handleSendMessage = async (messageText) => {
    try {
      const message = {
        name: userLogin.userName || "value defaul",
        text: messageText,
      };

      socket.emit('msgToServer', message);
    } catch (error) {}
  };

  const renderMessageBox = (message, index) => {
    return (
      <View
        key={index}
        style={{
          alignItems:
            message.name === userLogin.userName ? 'flex-end' : 'flex-start',
          margin: 15,
          
          
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '50%',
            backgroundColor: message.name !== userLogin.userName  ? '#DDDDDD' :'#0099FF',
            padding: 12,
            borderRadius: 12,
          }}>
          <Text>{message.name}:</Text>
          <Text>{message.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Text>Chat screen</Text>
      <FlatList
        data={chatList}
        style={{flex: 1, backgroundColor: '#ffffff'}}
        extraData={chatList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return renderMessageBox(item);
        }}
      />
      <View style={{bottom: 0}}>
        <InputChat
          onSend={(messageText, messageFile) => {
            handleSendMessage(messageText, messageFile);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
