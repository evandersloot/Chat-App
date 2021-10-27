import React from "react";
import { View, Button, KeyboardAvoidingView, Text } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from "react-native-maps";
import firebase from 'firebase';
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            isConnected: false,
            user: {
              _id: '',
              name: '',
            },  
            location: null,
            image: null
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
  };

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // added system message for new name entering chat
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: `${name}` });

    //check online status
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.props.navigation.setOptions({ title: `${name} is Online`})
        console.log('online');
        this.setState({ 
          isConnected: true 
        });

        //listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
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
      //offline
    } else {
      this.props.navigation.setOptions({ title: `${name} is Offline` });
      this.setState({ isConnected: false })
      this.getMessages();
      console.log('offline');
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
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
        image: data.image,
        location: data.location
      });
    });
    this.setState({
      messages,
    });
};

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      user: message.user,
      text: message.text || '',
      createdAt: message.createdAt,
      image: message.image || '',
      location: message.location || null,
    });
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  onSend(messages = []) {
      this.setState(
        (previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
      }),
        () => {
          this.addMessage();
          this.saveMessages();
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    } 
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          showsUserLocation={true}
          style={{width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
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
              renderUsernameOnMessage={true}
              messages={this.state.messages}
              user={this.state.user}
              renderInputToolbar={this.renderInputToolbar.bind(this)}
              renderActions={this.renderCustomActions}
              renderCustomView={this.renderCustomView}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: this.state.uid,
                name: this.props.route.params.name
              }}
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

