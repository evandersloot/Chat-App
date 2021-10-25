import React, { Component } from 'react';

// import components
import Start from './components/Start';
import Chat from './components/Chat';

// import navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
 
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Start'
        >
          <Stack.Screen 
            name='Start' 
            component={Start} 
          />
          <Stack.Screen 
            name='Chat' 
            component={Chat} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
