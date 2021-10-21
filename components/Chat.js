import React from "react";
import { View, Button, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    constructor(){
        super();
        this.state = {
            messages: [],
        }
    }
    
    // added system message for new name entering chat
    componentDidMount() {
        let name = this.props.route.params.name;
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello Developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: (`${name} has entered the chat` ),
                    createdAt: new Date(),
                    system: true,
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    // bubble for chat
    renderBubble(props) {
        return (
            <Bubble
              {...props}
              wrapperStyle={{
                  right: {
                      backgroundColor: 'orange'
                  }
              }}
            />
        )
    }

    render(){
        let name = this.props.route.params.name;
        let color = this.props.route.params.color;
        this.props.navigation.setOptions({ title: name });

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
                user={{
                  _id:1,
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
}

