"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Alert } from 'react-native';

import Header from '../../components/header';

import DSParty from '../../dataServices/party';
import CustomForm from '../../components/customForm';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.addPahandleFormSubmitrty = this.handleFormSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getFormConfig = this.getFormConfig.bind(this);
    }

    handleFormSubmit(buttonOption, formState) {
        const { navigation } = this.props;

        if(buttonOption.name == "cancel"){
            return navigation.goBack();
        }

        if(buttonOption.name == "add") {
            return Alert.alert(
                'Add New Party',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSParty.add({
                                params: {
                                    name: formState.name,
                                    description: formState.description,
                                    phone: formState.phone,
                                    location: formState.location
                                }
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while adding new party");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }

        if(buttonOption.name == "edit") {
            let {selectedParty} = navigation.getParam('params', {});

            return Alert.alert(
                'Edit Party',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSParty.edit({
                                params: {
                                    id: selectedParty.id,
                                    name: formState.name,
                                    description: formState.description,
                                    phone: formState.phone,
                                    location: formState.location
                                }
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while editting party");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    getFormConfig(selectedParty) {
        let config = {
            formFields: {
                options: [
                    {
                        name: "name",
                        label: "Name",
                        placeholder: "Enter Party Name",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Party name is required"
                            },
                            {
                                type: "isNumber",
                                errorMsg: "Party name should be number"
                            }
                        ]
                    },
                    {
                        name: "description",
                        label: "Description",
                        placeholder: "Enter Party Description",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Party name is required"
                            }
                        ]
                    },
                    {
                        name: "phone",
                        label: "Phone Number",
                        placeholder: "Enter Party Phone Number",
                        type: "TextInput",
                        keyboardType: "phone-pad"
                    },
                    {
                        name: "email",
                        label: "Email",
                        placeholder: "Enter Party Email",
                        type: "TextInput",
                        keyboardType: "email-address"
                    },
                    {
                        name: "location",
                        label: "Location",
                        placeholder: "Enter Party Location",
                        type: "TextInput"
                    }
                ]
            },
            buttonList: {
                options: [
                    {
                        name: "cancel",
                        label: "Cancel",
                        color: "#cccccc"
                    },
                    {
                        name: selectedParty ? "edit" : "add",
                        label: selectedParty ? "Edit" : "Add",
                        color: "#841584"
                    }
                ]
            }
        };

        if(selectedParty){
            config.formFields.options.forEach(option => {
                option.defaultValue = selectedParty[option.name];
            });
        }

        return config;
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {selectedParty} = params;

        let config = this.getFormConfig(selectedParty);

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {selectedParty ? "Edit Party" : "Add Party"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/info.png')}
                        handleIconClick = {() => {navigation.navigate("TirthankarInfo", {})}}
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
