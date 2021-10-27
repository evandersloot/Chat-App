import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/firestore';

export default class CustomActions extends Component {
  
  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    try {
      if(status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'Images',
        }).catch(error => console.log(error));
    
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
        console.log(error.message);
    }
  };
    
  takePhoto = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY,
    );
    try {
      if(status === 'granted') {
        let result = await ImagePicker.launchCameraAsync().catch(error => 
            console.log(error)
        );
    
      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl })
      }
      }
    } catch(error) {
        console.log(error.message);
    }
  };
    
  getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if(status === 'granted') {
        let result = await Location.getCurrentPositionAsync({});
    
        const latitude = JSON.stringify(result.coords.latitude);
        const longitude = JSON.stringify(result.coords.longitude);
        if (result) {
          this.props.onSend({
            location: {
                latitude: latitude,
                longitude: longitude,
            },
          });
        }
      }
    } catch (error) {
        console.log(error.message);
    } 
  };


  //choose an action
  onActionPress = () => {
    const options = ['Choose from Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
          case 1: 
            console.log('user wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to send their location');
            return this.getLocation();
          default:
        }
      },
    )
  }

  uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const uriParse = uri.split('/');
    const fileName = uriParse[uriParse.length - 1];

    //reference to firebase storage
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);
    //close connection
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  //upload images to firestore db
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    //reference to firebase storage
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);
    //close connection
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  render () {
    return (
      <TouchableOpacity 
        accessible={true}
        accessibilityLabel='More Options'
        accessibilityHint='Choose to send a photo or your location'
        style={[styles.container]} 
        onPress={this.onActionPress}
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },  
});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};