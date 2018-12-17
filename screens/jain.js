"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, Text, View, Button, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


let HEADS = [
    {
        "id": 3,
        "title": "Navkar Mantra",
        "gradient": ["#f6d365", "#fda085"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 4,
        "title": "Tirthankar",
        "gradient": ["#f6d365", "#fda085"],
        "image": require("../images/tirthankar.jpeg"),
        "navigateTo": "Tirthankar"
    },
    {
        "id": 1,
        "title": "Prayers",
        "gradient": ["#d4fc79", "#96e6a1"],
        "image": require("../images/prayer.jpeg"),
        "navigateTo": "Prayers"
    },
    {
        "id": 2,
        "title": "Temple",
        "gradient": ["#d4fc79", "#96e6a1"],
        "image": require("../images/temple.jpeg"),
        "navigateTo": "Temples"
    },
    
    {
        "id": 5,
        "title": "Head 5",
        "gradient": ["#667eea", "#764ba2"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 6,
        "title": "Head 6",
        "gradient": ["#667eea", "#764ba2"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 7,
        "title": "Head 1",
        "gradient": ["#4facfe", "#00f2fe"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 24,
        "title": "Head 2",
        "gradient": ["#4facfe", "#00f2fe"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 34,
        "title": "Head 3",
        "gradient": [ "#ff8177", "#ff867a" , "#ff8c7f", "#f99185", "#cf556c", "#b12a5b"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 44,
        "title": "Head 4",
        "gradient": [ "#ff8177", "#ff867a" , "#ff8c7f", "#f99185", "#cf556c", "#b12a5b"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 54,
        "title": "Head 5",
        "gradient": ["#d4fc79", "#96e6a1"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    },
    {
        "id": 64,
        "title": "Head 6",
        "gradient": ["#d4fc79", "#96e6a1"],
        "image": require("../images/navkar.jpeg"),
        "navigateTo": "Navkar"
    }
];


export default class App extends Component {

	render() {
        this.state = {};
        let deviceWidth = Dimensions.get('window').width;
        const { navigate } = this.props.navigation;

		return (
			<SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

                    <View style={{ backgroundColor: 'grey', height: 200 }}>
                        <Image source={require('../images/jainCover.jpg')}
                            style={{
                                resizeMode: "cover",
                                height: 200,
                                width: deviceWidth
                            }}
                        />
                    </View>

                    <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                        {
                            HEADS.map(head => {
                                return (
                                    <TouchableOpacity key={head.id} style={styles.cardContainer}
                                        onPress={() => navigate(head.navigateTo, {})} >
                                        <View style={styles.cardHeader}>
                                            <Image source={head.image}
                                                style={{
                                                    resizeMode: "cover",
                                                    height: 100,
                                                    width: 170
                                                }}
                                            />
                                        </View>
                                        <View colors={head.gradient} style={styles.cardFooter}>
                                            <Text style={styles.cardTitle}>{head.title}</Text>
                                        </View>
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
		backgroundColor: '#ffffff'
	},
    

    cardContainer: {
        marginTop: 15,
        borderRadius: 10,
        width: 170,
        borderWidth: 0.8,
        borderColor: '#d6d7da',

        // shadowColor: '#000000',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1
		// },
		// shadowRadius: 2,
		// shadowOpacity: 0.5

    },

    cardFooter: {
        height: 40,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    cardHeader: {
        height: 100
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "grey"
    }

});
