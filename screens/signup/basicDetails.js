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
                'Basic Details!',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            let userInfo = {
                                "insuranceNo": formState.insuranceNo,
                                "creditcardNo": formState.creditcardNo,
                                "expiryDate": formState.expiryDate,
                                "cvv": formState.cvv,
                                "pcpId": formState.pcpId,
                                "ssn": formState.ssn,
                            };

                            DSAuth.updateUserDetails({
                                body: userInfo
                            }).then(response => {
                                console.log("$$$$$$$ user update successfully");

                                return navigation.navigate("AppContainer", {params: {
                                    userInfo: userInfo,
                                    userUpdateResponse: response
                                }});
                            }).catch(error => {
                                console.log("Error while updating basic details");
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
                        name: "insuranceNo",
                        label: "Insurance No",
                        placeholder: "Enter Insuarance No",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Insuarance No is required"
                            }
                        ]
                    },
                    {
                        name: "creditcardNo",
                        label: "Credit Card No",
                        placeholder: "Enter Credit Card No",
                        type: "TextInput",
                        keyboardType: "phone-pad",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Credit Card No is required"
                            }
                        ]
                    },
                    {
                        name: "expiryDate",
                        label: "Expiry Date",
                        placeholder: "MM/YYYY",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Expiry Date is required"
                            }
                        ]
                    },
                    {
                        name: "cvv",
                        label: "CVV",
                        placeholder: "Enter CVV",
                        type: "TextInput",
                        keyboardType: "phone-pad",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "CVV is required"
                            }
                        ]
                    },
                    {
                        name: "pcpId",
                        label: "PCP ID",
                        placeholder: "Enter PCP ID",
                        type: "TextInput",
                        secureTextEntry: false,
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "PCP ID is required"
                            }
                        ]
                    },
                    {
                        name: "ssn",
                        label: "SSN",
                        placeholder: "Enter SSN",
                        type: "TextInput",
                        secureTextEntry: false,
                        keyboardType: "phone-pad",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "SSN is required"
                            }
                        ]
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
						title = {"Enter Basic Details"}
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
