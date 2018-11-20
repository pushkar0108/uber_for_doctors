"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';

import DSAuth from '../dataServices/auth';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.redirectUser = this.redirectUser.bind(this);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        console.log("appcontainer componentWillReceiveProps fired with nextProps: ", nextProps);
        this.redirectUser();
    }

    componentDidMount(){
        console.log("[APP container] is rendering");
        this.redirectUser();
    }

    // 0, 1, 2 (onboardingPending), 3 (onboarded)

    redirectUser() {
        const { navigation } = this.props;

        DSAuth.getUserDetails()
        .then(user => {
            switch(user.status){
                case 2:
                    navigation.navigate("BasicDetails", {params: {
                        user: user
                    }});
                    break;
                case 3:
                    navigation.navigate("Home", {params: {
                        user: user
                    }});
                    break;
                default:
                    console.log("[APP container] Not a valid case");
                    navigation.navigate("Login", {params: {
                        user: user
                    }});
                    break;
            }
        })
        .catch(error => {
            console.log("[APP container] Error in fetching user details, error: ", error);
            navigation.navigate("Login", {params: {}});
        });
    }

	render() {
        let {list} = this.state;
        const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.content}>
					<ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        
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
    
    entryContainer: {
        padding: 15,
        flex: 1,
        flexDirection: "row",
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
