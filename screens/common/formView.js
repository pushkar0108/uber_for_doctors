"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Alert, View, Text, ActivityIndicator } from 'react-native';

import Header from '../../components/header';
import CustomForm from '../../components/customForm';

import DSParty from '../../dataServices/party';
import DSAuth from '../../dataServices/auth';

let dummyConfig = {
    status: "",
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
                name: "submit",
                label: "Submit",
                color: "#841584"
            }
        ]
    }
};

export default class App extends Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            config: null
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {title, subText, msgData} = params;

        DSAuth.getFormData({
            params: {
                formId: msgData.formId
            }
        })
        .then(response => {
            this.setState({
                config: response
            });
        })
        .catch(error => {
            console.log("[APP container] Error in fetching form config, error: ", error);
        });

        // setTimeout(() => {
        //     this.setState({
        //         config: dummyConfig
        //     });
        // }, 2000);
    }

    handleFormSubmit(buttonOption, formState) {
        const { navigation } = this.props;

        if(buttonOption.name == "submit") {
            return Alert.alert(
                'Submit form!',
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
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {title, subText, msgData} = params;

        let { config } = this.state;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {title} 
                        navigation = {navigation}
                    />
                    
                    {
                        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        {
                            config && (
                                <CustomForm 
                                    config = {config}
                                    formSubmitCallback = {this.handleFormSubmit}
                                />
                            )
                        }
                        </ScrollView>
                    }

                    {
                        !config && (
                            <View style={{ 
                                flex: 1, 
                                padding: 10, 
                                backgroundColor: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )
                    }

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
