"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Alert } from 'react-native';

import Header from '../../components/header';

import DSComponent from '../../dataServices/components';
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
        let {selectedComponent, selectedParty} = navigation.getParam('params', {});

        if(buttonOption.name == "cancel"){
            return navigation.goBack();
        }

        if(buttonOption.name == "add") {
            return Alert.alert(
                'Add New Component',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSComponent.add({
                                params: {
                                    name: formState.name,
                                    party_id: selectedParty.id,
                                    description: formState.description,
                                    mountRate: formState.mountRate
                                }
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while adding new component");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }

        if(buttonOption.name == "edit") {
            return Alert.alert(
                'Edit Component',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSComponent.edit({
                                params: {
                                    id: selectedComponent.id,
                                    name: formState.name,
                                    party_id: selectedParty.id,
                                    description: formState.description,
                                    mountRate: formState.mountRate
                                }
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while editting component");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    getFormConfig(selectedComponent) {
        let config = {
            formFields: {
                options: [
                    {
                        name: "name",
                        label: "Name",
                        placeholder: "Enter Component Name",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Component name is required"
                            }
                        ]
                    },
                    {
                        name: "mountRate",
                        label: "Mount Rate",
                        placeholder: "Enter Mount Rate",
                        type: "TextInput",
                        keyboardType: "numeric",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Component name is required"
                            }
                        ]
                    },
                    {
                        name: "description",
                        label: "Description",
                        placeholder: "Enter Component Description",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Component name is required"
                            }
                        ]
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
                        name: selectedComponent ? "edit" : "add",
                        label: selectedComponent ? "Edit" : "Add",
                        color: "#841584"
                    }
                ]
            }
        };

        if(selectedComponent){
            config.formFields.options.forEach(option => {
                option.defaultValue = selectedComponent[option.name];
            });
        }

        return config;
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {selectedComponent} = params;

        let config = this.getFormConfig(selectedComponent);

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {selectedComponent ? "Edit Component" : "Add Component"} 
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
