"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Alert, TextInput, Button, View, Text } from 'react-native';

import Header from '../../components/header';
import DSAuth from '../../dataServices/auth';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);

        this.state = {
            otp: null,
            errorMsg: null
        };
    }

    handleChangeText(text){
        this.setState({
            otp: text
        });
	}

    handleFormSubmit() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let { userInfo } = params;

        DSAuth.verifyOTP({
            body: {
                otp: this.state.otp,
                phoneNo: userInfo.phoneNo
            }
        }).then(response => {
            console.log("$$$$$$$ OTP success");

            return navigation.navigate("AppContainer", {params: {
                userInfo: userInfo,
                verifyOTPResponse: response
            }});
        }).catch(error => {
            console.log("Error while OTP verify");
            this.setState({
                errorMsg: "Something went wrong"
            });
        });
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let { userInfo } = params;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {"Verify OTP"}
                        navigation = {navigation}
                    />

                    <View style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}>
                        <Text>Enter OTP</Text>
                        <TextInput
                            style = {styles.inputText}
                            placeholder = {"Enter OTP"}
                            value = {this.state.otp ? `${this.state.otp}` : undefined}
                            onChangeText = {this.handleChangeText}
                            returnKeyType = "next"
                            onSubmitEditing = {() => { Keyboard.dismiss(); }}
                            blurOnSubmit = {false}
                            keyboardType = {'numeric'}
                            ref={(input) => { this.secondTextInput = input; }}
                        />

                        {
                            this.state.errorMsg && 
                                <Text style={{ color: "red" }}>
                                    {this.state.errorMsg}
                                </Text>
                        }

                        <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                            <Button
                                title = {"Submit"}
                                onPress = {this.handleFormSubmit}
                                color = {"#841584"}
                            />
						</View> 
                    </View>

			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({

    inputText: {
		fontSize: 20,
		textAlign: 'left',
		padding: 5,


		backgroundColor: '#ffffff',
		borderBottomWidth: 0.5,
		borderBottomColor: '#d6d7da',
    },
    
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
    }
});
