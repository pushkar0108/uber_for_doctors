"use strict";

import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };

    render() {
      const { navigate } = this.props.navigation;
      return (
          <View style={{flex: 1}}>
                <Button
                    title="Go to QRCodeScanner"
                    onPress={() =>
                        navigate('QRCodeScanner', { name: 'Jane' })
                    }
                />
                <Button
                    title="Go to ChatScreen"
                    onPress={() =>
                        navigate('ChatScreen', { name: 'Jane' })
                    }
                />
                <Button
                    title="Go to ShowPhotos"
                    onPress={() =>
                        navigate('ShowPhotos', { name: 'Jane' })
                    }
                />
          </View>
        
      );
    }
  }