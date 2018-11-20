"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Header from '../../components/header';
import ListViewSearch from '../../components/listViewSearch';


export default class App extends Component {

    constructor(props){
        super(props);
        this.getChild = this.getChild.bind(this);
    }

    getChild(temple){
        const { navigation } = this.props;

        return (
            <TouchableOpacity key={temple.name} 
                onPress={() => {navigation.navigate("TemplesDetails", {params: {temple}})}}>
                <View style={styles.entryContainer}>
                    <View>
                        <Image source={require('../../images/book.png')} style={styles.leftIcon} />
                    </View>
                    <View>
                        <Text style={styles.textMsg}>{temple.label}</Text>
                    </View>
                    <View style={{marginLeft: "auto"}}>
                        <Image source={require('../../images/right_arrow.png')} style={styles.rightArrow} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

	render() {
        const { navigation } = this.props;
        const {templeList} = navigation.getParam('params', {});

		return (
			<SafeAreaView style={styles.container}>
                    <Header 
                        title = {"Search Temples"} 
                        navigation = {navigation} />

                    <ListViewSearch 
                        allOptions={templeList}
                        getChild = {this.getChild}>
                    </ListViewSearch>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
    },

    content: { 
        flex: 1, 
        backgroundColor: '#ffffff'
    },

    entryContainer: {
        padding: 15,
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 0.8,
        borderBottomColor: '#d6d7da',
        alignItems: "center"
    },

    leftIcon: {
        height: 30,
        width: 30,
        marginRight: 10
    },

    rightArrow: {
        height: 15,
        width: 15
    },

    textMsg: {
        fontWeight: "600",
        fontSize: 16,
        marginRight: 15
    }
});
