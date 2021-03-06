# Chat-App

![Chat-App1](https://user-images.githubusercontent.com/83362705/138322948-802b1871-1bb0-4dbd-9999-e16af4b0e1ec.gif)


# Objective
To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

# Context
More and more people use their phones for daily tasks, such as shopping, creating to-do lists,
communicating with friends, scheduling meetings, and more. That's why many companies offer native
mobile versions of their web apps, or even skip creating a web app entirely.

In the past, building high-quality mobile apps required a lot of time and money because writing apps
for different platforms like iOS and Android required specialized programmers who could build and
maintain multiple codebases.

Over time, however, new technologies emerged that made it easier for companies to build and
maintain mobile applications using familiar syntax. One of these technologies is React Native, a
framework for building Android and iOS apps that only requires one codebase.
For this Achievement’s project, you’ll use React Native, Expo, and Google Firestore Database to build a
chat app that you can add to your portfolio and demonstrate your knowledge of JavaScript mobile
development.

# Features and Requirements

# User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
  friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange
  the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
  time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
  reader so that I can engage with a chat interface.
  
# Key Features
* A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
  and location data.
* Data gets stored online and offline.

# Getting Started
* Node.js
* Install Expo CLI
  * npm install expo-cli -global
# Setting up Dependencies
* npm install --save react-navigation
* npm install @react-navigation/native @react-navigation/stack
* expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
* npm install react-native-gifted-chat --save
* npm install firebase@8.2.3 --save
* expo install @react-native-community/async-storage
* expo install @react-native-community/netinfo
* expo install expo-permissions
* expo install expo-image-picker
* expo install expo-location
* expo install react-native-maps

# Running the App
* Download Expo on mobile or tablet
* Run expo start in root folder of app
* Scan QR code
* App will open when expo is finished bundling
   * OR
* Download Android Simulator or XCode which include an iOS Sumiulator
* On left side of Expo click "Run on iOS Simulator" or "Run on Android device/emulator"

# Technical Requirements
* The app must be written in React Native.
* The app must be developed using Expo.
* The app must be styled according to the given screen design.
* Chat conversations must be stored in Google Firestore Database.
* The app must authenticate users anonymously via Google Firebase authentication.
* Chat conversations must be stored locally.
* The app must let users pick and send images from the phone’s image library.
* The app must let users take pictures with the device’s camera app, and send them.
* The app must store images in Firebase Cloud Storage.
* The app must be able to read the user’s location data.


