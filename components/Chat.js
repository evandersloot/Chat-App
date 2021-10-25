import React from "react";
import { View, Button, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import firebase from 'firebase';
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            loggedInText: 'Please wait, you are being logged in',
            user: {
              _id: '',
              name: '',
            }
        }; 
    
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyD-fA0bfkfy78BzPsKTAVIUM4BZuPew-Jw",
        authDomain: "chatapp-eec91.firebaseapp.com",
        projectId: "chatapp-eec91",
        storageBucket: "chatapp-eec91.appspot.com",
        messagingSenderId: "853791620776",
        appId: "1:853791620776:web:5b0aa37b4beaaa47ef8c9d"
      });
    }
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceChatMessageUser = null;
  }
  

    // added system message for new name entering chat
    componentDidMount() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: `${name}` });
        
        this.referenceChatMessages = firebase.firestore().collection('messages');

        //listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          //update user state
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            }
          });

          //messages of active users
          this.referenceChatMessageUser = 
            firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

          //collection changes
          this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
      this.authUnsubscribe();
      this.unsubscribe();
    }

    addMessage() {
      const message = this.state.messages[0];
      this.referenceChatMessages.add({
        uid: this.state.uid,
        _id: message._id,
        user: message.user,
        text: message.text || '',
        createdAt: message.createdAt,
      });
    };

    onSend(messages = []) {
        this.setState(
          (previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),
          () => {
            this.addMessage();
          }
        );
    }

    // bubble for chat
    renderBubble(props) {
        return (
            <Bubble
              {...props}
              wrapperStyle={{
                  right: {
                      backgroundColor: 'gray'
                  }
              }}
            />
        )
    }

    // get and store messages on change
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        //look through docs
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          messages.push({
            _id: data._id,
            text: data.text || '',
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.user._id,
              name: data.user.name,
            },
          });
        });
        this.setState({
          messages,
        });
    };
  
    render(){
        let color = this.props.route.params.color;

        return (
            <View 
              style={{ 
                flex: 1, 
                backgroundColor: color
              }}
            >
              <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={this.state.user}
              />
              <Button
                title='Go to Start'
                onPress={() => this.props.navigation.navigate('Start')}
              />
              
              { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
              }

            </View>
        );
    }
};

