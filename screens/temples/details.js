"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native';

import Header from '../../components/header';

export default class App extends Component {

    constructor(props){
        super(props);

        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        // let {temple} = params;
        let temple = {
            "name": "dilwara_temple",
            "label": "Dilwara Temple",
            "priority": 2,
            "info": "The idea with React Native Elements is more about component structure than actual design.",
            "imageSource": require('../../images/temples/dilwara/1.jpg'),
            "images": [
                require('../../images/temples/dilwara/1.jpg'),
                require('../../images/temples/dilwara/2.jpg'),
                require('../../images/temples/dilwara/3.jpg'),
                require('../../images/temples/dilwara/4.jpg'),
                require('../../images/temples/dilwara/5.jpg'),
                require('../../images/temples/dilwara/6.jpg')
            ]
        };

        this.state = {
            selectedImageIndex: 0
        };
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let deviceWidth = Dimensions.get('window').width;
        // let {temple} = params;

        let temple = {
            "name": "dilwara_temple",
            "label": "Dilwara Temple",
            "priority": 2,
            "info": "The idea with React Native Elements is more about component structure than actual design.",
            "imageSource": require('../../images/temples/dilwara/1.jpg'),
            "images": [
                require('../../images/temples/dilwara/1.jpg'),
                require('../../images/temples/dilwara/2.jpg'),
                require('../../images/temples/dilwara/3.jpg'),
                require('../../images/temples/dilwara/4.jpg'),
                require('../../images/temples/dilwara/5.jpg'),
                require('../../images/temples/dilwara/6.jpg')
            ]
        };

        let {selectedImageIndex} = this.state;
        let selectedImage = temple.images[selectedImageIndex];

		return (
			<SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

					<Header 
						title = {temple.label} 
						navigation = {navigation} />
                    
                    <View style={{ backgroundColor: 'grey', height: 200 }}>
                        <Image source={selectedImage}
                            style={{
                                resizeMode: "cover",
                                height: 200,
                                width: deviceWidth
                            }}
                        />

                        <Image source={require("../../images/right_arrow.png")}
                            style={{
                                resizeMode: "cover",
                                height: 40,
                                width: 40,
                                position: "absolute",
                                marginTop: 60,
                                right: 0,
                                tintColor: "black"
                            }}
                        />

                        <Image source={require("../../images/right_arrow.png")}
                            style={{
                                resizeMode: "cover",
                                height: 40,
                                width: 40,
                                position: "absolute",
                                marginTop: 60,
                                tintColor: "black",
                                transform: [
                                    { rotateY: '180deg'}
                                ]
                            }}
                        />

                    </View>

                    <ScrollView horizontal={true} 
                        showsHorizontalScrollIndicator = {false}
                        style={{ flex: 0, flexDirection: "row", paddingTop: 10}}>
                        {
                            temple.images.map((imgSource, index) => {
                                return (
                                    <TouchableOpacity key={index}
                                        onPress={() => this.setState({selectedImageIndex: index})}>
                                        <Image source={imgSource}
                                            style={{
                                                resizeMode: "cover",
                                                height: 60,
                                                width: 60,
                                                marginLeft: 10,
                                                borderRadius: 10,
                                                borderWidth: selectedImageIndex == index ? 1.5 : .5,
                                                borderColor: selectedImageIndex == index ? "blue" : "#cccccc"
                                            }}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>

					<View style={styles.content}>
                        
                        <View>
                            <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: "600",}}>
                                Information
                            </Text>
                            <Text>{temple.info}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: "600",}}>
                                Details
                            </Text>
                            <Text>{temple.info}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: "600",}}>
                                Directions
                            </Text>
                            <Text>{temple.info}</Text>
                        </View>
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

    content: { 
        flex: 1, 
        backgroundColor: '#ffffff',
        padding: 20
    }
});
