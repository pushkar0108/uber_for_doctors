"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card} from 'react-native-elements';


import Header from '../../components/header';

const templeList = [
    {
        "name": "golden_temple",
        "label": "Golden Temple",
        "priority": 2,
        "info": "The idea with React Native Elements is more about component structure than actual design.",
        "imageSource": require('../../images/temples/goldenTemple.jpg')
    },
    {
        "name": "golden_temple1",
        "label": "Golden Temple2",
        "priority": 1,
        "info": "The idea with React Native Elements is more about component structure than actual design.",
        "imageSource": require('../../images/temples/temple2.jpeg')
    },
    {
        "name": "golden_temple3",
        "label": "Golden Temple4",
        "priority": 4,
        "info": "The idea with React Native Elements is more about component structure than actual design.",
        "imageSource": require('../../images/temples/temple1.jpeg')
    },
    {
        "name": "golden_temple5",
        "label": "Golden Temple6",
        "priority": 3,
        "info": "The idea with React Native Elements is more about component structure than actual design.",
        "imageSource": require('../../images/temples/temple1.jpeg')
    }
];

export default class App extends Component {

	render() {
        this.state = {};
        let deviceWidth = Dimensions.get('window').width;
        const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.container}>
                <Header 
                    title = {"Temples"} 
                    navigation = {navigation} 
                    rightIconSource = {require('../../images/search.png')}
                    handleIconClick = {() => {navigation.navigate("TemplesList", {params: {templeList}})}}
                />

                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

                    <View style={{ backgroundColor: 'grey', height: 150 }}>
                        <Image source={require('../../images/temple.jpeg')}
                            style={{
                                resizeMode: "cover",
                                height: 150,
                                width: deviceWidth
                            }}
                        />
                        <Text style={{
                            position: "absolute",
                            fontSize: 30,
                            fontWeight: "600",
                            color: "white",
                            marginLeft: "15%"
                        }}>
                            Popular Temples
                        </Text>
                    </View>

					<View style={styles.content}>
                        {
                            templeList.map((temple) => {
                                return (
                                    <TouchableOpacity key={temple.name}
                                        onPress={() => {navigation.navigate("TemplesDetails", {params: {temple}})}}>

                                        <Card
                                            containerStyle={{padding: 0}} 
                                            image={temple.imageSource}>
                                            <Text style={styles.info}>{temple.label}</Text>
                                            <Text style={{marginBottom: 10}}>{temple.info}</Text>
                                        </Card>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
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

    info: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: "600"
    }
});
