"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, View, WebView, Dimensions } from 'react-native';

import Header from '../../components/header';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

	render() {
        let deviceWidth = Dimensions.get('window').width;
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {title, subText, src} = params;

		return (
			<SafeAreaView style={styles.container}>
                <Header
                    title = {title}
                    navigation = {navigation}
                />

                <WebView
                    source={{uri: src}} 
                    style={{width: deviceWidth, flex: 1}} />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	}
});
