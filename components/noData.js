"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class App extends Component {

	render() {

		return (
            <View style={styles.container}>
                <Image source={require('../images/message.png')}
                    style={styles.contentImage} />
                <Text style={styles.textMsg}>
                    No Data Available
                </Text>
            </View>
        );
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    contentImage: { 
        width: 100,
        height: 100,
        tintColor: "#696969"
    },

    textMsg: {
        fontSize: 30,
        color: "#696969"
    }
});
