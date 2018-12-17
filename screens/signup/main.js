"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Alert } from 'react-native';

import Header from '../../components/header';

import DSAuth from '../../dataServices/auth';
import CustomForm from '../../components/customForm';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getFormConfig = this.getFormConfig.bind(this);
    }

    handleFormSubmit(buttonOption, formState) {
        const { navigation } = this.props;

        if(buttonOption.name == "submit") {
            return Alert.alert(
                'Sign Up!',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            let userInfo = {
                                fn: formState.firstName,
                                ln: formState.lastName,
                                phoneNo: formState.phone,
                                password: formState.password,
                                gender: formState.gender ? "M" : "F"
                            };

                            DSAuth.signup({
                                body: userInfo
                            }).then(response => {
                                console.log("$$$$$$$ Sign up success");

                                return navigation.navigate("OTPVerify", {params: {
                                    userInfo: userInfo
                                }});
                            }).catch(error => {
                                console.log("Error while new sign");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    getFormConfig() {
        let config = {
            formFields: {
                options: [
                    {
                        name: "firstName",
                        label: "First Name",
                        placeholder: "Enter First Name",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "First Name is required"
                            }
                        ]
                    },
                    {
                        name: "lastName",
                        label: "Last Name",
                        placeholder: "Enter Last Name",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Last Name is required"
                            }
                        ]
                    },
                    {
                        name: "phone",
                        label: "Phone Number",
                        placeholder: "Enter Phone Number",
                        type: "TextInput",
                        keyboardType: "phone-pad",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Phone Number is required"
                            }
                        ]
                    },
                    {
                        name: "password",
                        label: "Password",
                        placeholder: "Enter Password",
                        type: "TextInput",
                        secureTextEntry: false,
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Password is required"
                            }
                        ]
                    },
                    {
                        name: "gender",
                        label: "Male/Female",
                        type: "Switch"
                    }
                ]
            },
            buttonList: {
                options: [
                    {
                        name: "submit",
                        label: "Submit",
                        color: "#841584"
                    }
                ]
            }
        };
        return config;
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let config = this.getFormConfig();

		return (
			<SafeAreaView style={styles.content}>
					<Header
						title = {"Sign Up"}
                        navigation = {navigation}
                        leftIconClickCb = {() => {
                            return navigation.navigate("Login", {params: {}});
                        }}
                    />

                    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <CustomForm 
                            config = {config}
                            formSubmitCallback = {this.handleFormSubmit}
                        />
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
