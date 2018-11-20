"use strict";

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, WebView, Dimensions, ScrollView, Image, CameraRoll, TextInput, KeyboardAvoidingView, Keyboard, Linking, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    
    this.state = { 
      photos: []
    };
  }

  componentDidMount(){
    CameraRoll.getPhotos({
        first: 12,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        //Error Loading Images
        console.log("Error err: ", err);
      });
  }

  render() {
    let deviceWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>


          <ScrollView>
            {this.state.photos.map((p, i) => {
              return (
                <Image
                  key={i}
                  style={{
                    width: 300,
                    height: 100,
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              );
            })}
          </ScrollView>

          <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.linearGradient}></LinearGradient>
          <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.linearGradient}></LinearGradient>
          <LinearGradient colors={['#d4fc79', '#96e6a1']} style={styles.linearGradient}></LinearGradient>

        {/* {
          this.state.showText && 
          <View style={{flex: 1}}>
            <WebView source={{uri: 'https://staging.krcinfra.com/login'}} style={{width: deviceWidth, backgroundColor:'blue',marginTop:20}} />
          </View>
        } */}

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  header: {
    backgroundColor: '#ffffff',
    height: 50
  },

  footer: {
    backgroundColor: '#ffffff',
    height: 50
  },

  content: {
    flex: 1
  },

  msgText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'left',
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff'
  },

  inputText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'left',
    padding: 5,
  },
  
});
