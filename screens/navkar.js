"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, Image, TouchableOpacity, Dimensions } from 'react-native';

import Header from '../components/header';
import AudioPlayer from '../components/audioPlayer';

export default class App extends Component {

	render() {
        this.state = {};
        let deviceWidth = Dimensions.get('window').width;

		return (
			<SafeAreaView style={styles.container}>

					<Header 
						title = {"Navkar Mantra"} 
						navigation = {this.props.navigation} />

                    <View style={{ backgroundColor: 'grey', height: 200 }}>
                        <Image source={require('../images/navkar.jpeg')}
                            style={{
                                resizeMode: "cover",
                                height: 200,
                                width: deviceWidth
                            }}
                        />
                    </View>

					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <Text style={styles.textMsg}>Namah Arihantanam</Text>
                        <Text style={styles.textMsg}>Namah Siddhhanam</Text>
                        <Text style={styles.textMsg}>Namah Ayariyanam</Text>
                        <Text style={styles.textMsg}>Namah Uvjhayanam</Text>
                        <Text style={styles.textMsg}>Namah Loye Savva Saahunam</Text>
                        <Text style={styles.textMsg}>Aiso Panch Namahkkaro,</Text>
                        <Text style={styles.textMsg}>Savva Paav Panasano I</Text>
                        <Text style={styles.textMsg}>Manglanancha Savvesim,</Text>
                        <Text style={styles.textMsg}>Padhmam Havei Mangalam II</Text>
                    </View>

                    <View style={{ backgroundColor: '#541027', height: 70, flex: 0}}>
                        <AudioPlayer />
                    </View>

                    

			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},

	content: {
		backgroundColor: '#ffffff',
		flex: 1
    },
    
    textMsg: {
        fontWeight: "600", 
        fontSize: 20,
        padding: 5
    },
});
