"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';

import CustomForm from '../../components/customForm';
import DSAuth from '../../dataServices/auth';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getFormConfig = this.getFormConfig.bind(this);

        this.state = {
            errorMsg: null
        };
    }

    handleFormSubmit(buttonOption, formState) {
        const { navigation } = this.props;

        if(buttonOption.name == "login") {
            return DSAuth.login({
                body: {
                    phoneNo: formState.phone,
                    password: formState.password
                }
            }).then(userInfo => {
                return navigation.navigate("AppContainer", {params: {
                    userInfo: userInfo
                }});
            }).catch(error => {
                this.setState({
                    errorMsg: error.message || "Something went wrong"
                });
                console.log("Error while logging in");
            });
        }
    }

    getFormConfig() {
        let config = {
            formFields: {
                options: [
                    {
                        name: "phone",
                        label: "Phone",
                        placeholder: "Enter Phone Number",
                        type: "TextInput",
                        keyboardType: "numeric",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Phone number is required"
                            }
                        ]
                    },
                    {
                        name: "password",
                        label: "Password",
                        placeholder: "Enter Password",
                        type: "TextInput",
                        secureTextEntry: true,
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Password is required"
                            }
                        ]
                    }
                ]
            },
            buttonList: {
                options: [
                    {
                        name: "login",
                        label: "Login",
                        color: "#841584"
                    }
                ]
            }
        };

        return config;
    }

	render() {
        let {list} = this.state;
        const { navigation } = this.props;
        let config = this.getFormConfig();

		return (
			<SafeAreaView style={styles.content}>
					<ScrollView style={{ flex: 1, backgroundColor: '#ffffff', padding: 20 }}>

                        <View style={{
                            padding: 15,
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: 'center', 
                            backgroundColor: '#ffffff',
                            marginBottom: 30
                        }}>
                            <Image source={require('../../images/donut.png')}
                                style={{
                                    width: 200,
                                    height: 200
                                }}
                            />
                        </View>

                        <CustomForm 
                            config = {config}
                            formSubmitCallback = {this.handleFormSubmit}
                        />

                        {
                            this.state.errorMsg && 
                                <Text style={{ color: "red" }}>
                                    {this.state.errorMsg}
                                </Text>
                        }

                        <TouchableOpacity onPress = {() => {
                            return navigation.navigate("Signup", {params: {}});
                        }}>
                            <Text style={{marginLeft: 20}}>Not a user yet? Click to SIGNUP!</Text>
                        </TouchableOpacity>

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
