import React from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const background = require('../assets/Background-Image.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

    render() {
      return (
          <View 
            style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
          >
            <ImageBackground 
              source={background} 
              style={styles.background}
            >
              <Text style={styles.title}>Welcome to the Chat App</Text>

              <TextInput
                style={styles.inputBox}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Type your name here'
              />

              <View>
                <Text style={styles.backgroundColor}>Pick a color for your background</Text>
                <View style={styles.color}>
                    <TouchableOpacity
                      style={styles.option1}
                      onPress={() => this.setState({ color: '#ff3838'})}
                    />
                    <TouchableOpacity
                      style={styles.option2}
                      onPress={() => this.setState({ color: '#388eff'})}
                    />
                    <TouchableOpacity
                      style={styles.option3}
                      onPress={() => this.setState({ color: '#00eb3f'})}
                    />
                    <TouchableOpacity
                      style={styles.option4}
                      onPress={() => this.setState({ color: '#b0b0b0'})}
                    />
                </View>                
              </View>

              <TouchableOpacity style={styles.startButton}
                onPress={() => 
                  this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
                  accessible={true}
                  accessibilityRole='button'
                  accessibilityLabel='Start Your Chat'
                  accessibilityHint='Press this button to start chatting'
              >
                  <Text style={styles.startChat}>Start Your Chat</Text>
              </TouchableOpacity>
            
            </ImageBackground>
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />

          </View>
            
      )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    background: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    title: {
        fontSize: 42,
        fontWeight: '700',
        color: '#388eff',
        textAlign: 'center',
        flex: 0.9,
    },

    backgroundColor: {
        fontSize: 18,
        fontWeight: '400',
        margin: 5,
        textAlign: 'center',
    },

    color: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
    },

    option1: {
        backgroundColor: '#ff3838',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
    },

    option2: {
        backgroundColor: '#388eff',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
    },

    option3: {
        backgroundColor: '#00eb3f',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
    },

    option4: {
        backgroundColor: '#b0b0b0',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
    },

    inputBox: {
        height: 50, 
        width: '50%', 
        borderColor: 'black', 
        borderWidth: 1,
        padding: 2,
        fontSize: 18,
        textAlign: 'center',
    },

    startButton: {
        margin: 5,
        padding: 2,
        width: '50%',
        height: 50,
        backgroundColor: '#388eff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    startChat: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    },
})