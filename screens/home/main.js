"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';

import Header from '../../components/header';
import NoData from '../../components/noData';
import DSAuth from '../../dataServices/auth';

export default class App extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        this.user = params.user;

        console.log("user: ", this.user);
    }

	render() {
        const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.content}>
                <View style = {{ flex: 1, backgroundColor: '#ffffff' }}>
                    
                    <Text style={{
                        fontSize: 30,
                        fontWeight: "600",
                        fontFamily: 'Gill Sans',
                        padding: 30
                    }}>
                        Hi, {this.user.fn}
                    </Text>

                    <View style={styles.entryContainer}>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}
                            onPress={() => {
                                return navigation.navigate("FeelingSick", {params: {
                                    roomId: 10
                                }});
                            }}>
                            <Image source={require('../../images/sick.png')}
                                style={{
                                    width: 100,
                                    height: 100,
                                    tintColor: "#696969"
                                }}
                            />
                            <Text style={{ fontSize: 30, color: "#696969", marginTop: 10}}>
                                Feeling sick today?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}
                            onPress={() => {
                                return navigation.navigate("Inbox", {params: {
                                    roomId: 7
                                }});
                            }}>
                            <Image source={require('../../images/messageIcon.png')}
                                style={{
                                    width: 100,
                                    height: 100,
                                    tintColor: "#696969"
                                }}
                            />
                            <Text style={{ fontSize: 30, color: "#696969", marginTop: 10}}>
                                View Inbox
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
        borderBottomWidth: 0.8,
        borderBottomColor: '#d6d7da',
        alignItems: "center"
    },

    idol: {
        marginRight: 10
    },

    textMsgIndex: {
        fontWeight: "600",
        fontSize: 16,
        minWidth: 30
    },

    textMsg: {
        fontWeight: "600",
        fontSize: 16,
        marginRight: 15
    },

    textMsgInfo: {
        fontWeight: "400",
        fontSize: 14,
        marginRight: 15,
        color: "#cccccc"
    }
});
