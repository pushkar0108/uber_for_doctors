"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert, Keyboard } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

import Header from '../../components/header';

import DSProducts from '../../dataServices/products';
import DSComponents from '../../dataServices/components';
import CustomForm from '../../components/customForm';

export default class App extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;

        this.params = navigation.getParam('params', {});

        this.addPahandleFormSubmitrty = this.handleFormSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getFormConfig = this.getFormConfig.bind(this);
        this.addComponentConfig = this.addComponentConfig.bind(this);
        this.removeComponentConfig = this.removeComponentConfig.bind(this);
        this.handleSelectedAction = this.handleSelectedAction.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.handleCustomComponentStateChange = this.handleCustomComponentStateChange.bind(this);
        this.getComponentConfig = this.getComponentConfig.bind(this);
        this.getCustomComponent = this.getCustomComponent.bind(this);

        this.state = {
            componentList: [],
            config: {
                formFields: {
                    options: []
                }
            }
        };
    }

    componentDidMount() {
        let { selectedProduct , selectedParty = {} } = this.params;

        DSComponents
            .list({
                filters: {
                    party_id: selectedParty.id
                }
            })
            .then(response => {
                console.log("calling secont last setState: ", this.state);
                this.setState({
                    componentList: response.data
                }, () => {
                    console.log("calling last setState: ", this.state);
                    this.setState({
                        config: this.getFormConfig(selectedProduct)
                    }, () => {
                        console.log("calling last setState, currentState: ", this.state);
                    });
                });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching component list, error: ", error);
            });
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    handleSelectedAction(index) {
        if(index == 0){
            return;
        }

        let { componentList } = this.state;
        let selectedComponent = componentList[index-1];
        this.addComponentConfig(selectedComponent);
    }

    handleFormSubmit(buttonOption, formState) {
        const { navigation } = this.props;

        if(buttonOption.name == "cancel"){
            return navigation.goBack();
        }

        console.log("------------ [handleFormSubmit] formState: ", formState);

        let { config } = this.state;
        let { selectedProduct , selectedParty = {} } = this.params;
        let params = {
            name: formState.name,
            party_id: selectedParty.id,
            description: formState.description,
            components: config.formFields.options
                            .filter(option => option.name.indexOf("component_") == 0)
                            .map(option => {
                                return {
                                    component_id: option.data.selectedComponent.id,
                                    qty: Number(option.data.qty),
                                    customRate: Number(option.data.customRate)
                                };
                            })
        };

        console.log("Form submit params: ", params);
        console.log("Form submit this.state: ", this.state);

        if(buttonOption.name == "add") {
            return Alert.alert(
                'Add New Product',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSProducts.add({
                                params: params
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while adding new product");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }

        if(buttonOption.name == "edit") {
            return Alert.alert(
                'Edit Product',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSProducts.edit({
                                params: Object.assign(params, {
                                    id: selectedProduct.id
                                })
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while editting product");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    handleCustomComponentStateChange(componentName, type, value) {
        let {config} = this.state;

        config.formFields.options.forEach(option => {
            if(option.name == componentName) {
                option.data[type] = value;
            }
        });

        this.setState({ config: config }, () => {
            console.log("updated state after handleCustomComponentStateChange ", this.state);
        });
    }

    getCustomComponent(componentConfig) {
        let componentName = componentConfig.name;
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>

                <Text>{componentConfig.data.selectedComponent.name}</Text>
                
                <TextInput
                    style = {styles.inputText}
                    placeholder = {"Qty"}
                    value = {`${componentConfig.data.qty}`}
                    onChangeText = {this.handleCustomComponentStateChange.bind(this, componentName, 'qty')}
                    returnKeyType = "next"
                    onSubmitEditing = {() => { Keyboard.dismiss(); }}
                    blurOnSubmit = {false}
                    keyboardType = {'numeric'}
                />

                <TextInput
                    style = {styles.inputText}
                    placeholder = {"Custom Rate"}
                    value = {`${componentConfig.data.customRate}`}
                    onChangeText = {this.handleCustomComponentStateChange.bind(this, componentName, 'customRate')}
                    returnKeyType = "next"
                    onSubmitEditing = {() => { Keyboard.dismiss(); }}
                    blurOnSubmit = {false}
                    keyboardType = {'numeric'}
                />

                <TouchableOpacity onPress={this.removeComponentConfig.bind(this, componentName)}>
                    <Image source={require('../../images/subtract.png')} style={styles.subtractIcon} />
                </TouchableOpacity>
            </View>
        );
    }

    getComponentConfig(selectedComponent, additionalData) {
        let componentName = "component_" + selectedComponent.name;
        let componentConfig = {
            name: componentName,
            type: "Custom",
            data: {
                qty: additionalData ? additionalData.qty : "",
                customRate: additionalData ? additionalData.customRate : "",
                selectedComponent: selectedComponent
            }
        };

        // componentConfig.field = this.getCustomComponent(componentConfig);

        return componentConfig;
    }

    addComponentConfig(selectedComponent) {
        let {config} = this.state;
        let componentConfig = this.getComponentConfig(selectedComponent);
        
        config.formFields.options.push(componentConfig);
        this.setState({ config: config });
    }

    removeComponentConfig(componentName) {
        let {config} = this.state;
        config.formFields.options = config.formFields.options.filter(option => option.name != componentName);

        this.setState({ config: config });
    }

    getFormConfig(selectedProduct) {
        let config = {
            formFields: {
                options: [
                    {
                        name: "name",
                        label: "Name",
                        placeholder: "Enter Product Name",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Product name is required"
                            }
                        ]
                    },
                    {
                        name: "description",
                        label: "Description",
                        placeholder: "Enter Product Description",
                        type: "TextInput",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Product name is required"
                            }
                        ]
                    },
                    {
                        name: "addComponents",
                        type: "Custom",
                        field: (
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                <Text style={styles.textHeading}>Components</Text>
                                
                                <TouchableOpacity onPress={this.showActionSheet}>
                                    <Image source={require('../../images/add.png')} style={styles.rightIcon} />
                                </TouchableOpacity>
                            </View>
                        )
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
                        name: selectedProduct ? "edit" : "add",
                        label: selectedProduct ? "Edit" : "Add",
                        color: "#841584"
                    }
                ]
            }
        };

        if(selectedProduct){
            config.formFields.options.forEach(option => {
                option.defaultValue = selectedProduct[option.name];
            });

            selectedProduct.components.forEach(comp => {
                let compId = comp.component_id;
                let selectedComponent = this.state.componentList.find(component => component.id === compId);
                let componentConfig = this.getComponentConfig(selectedComponent, comp);
                config.formFields.options.push(componentConfig);
            });
        }

        return config;
    }

	render() {
        const { navigation } = this.props;

        let { selectedProduct = {} } = this.params;
        let { config } = this.state;

        config.formFields.options.forEach(option => {
            if(option.type === "Custom" && option.name !== "addComponents"){
                console.log("Calling getCustomComponent with options: ", option);
                option.field = this.getCustomComponent(option);
            }
        });

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {selectedProduct ? "Edit Product" : "Add Product"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/info.png')}
                        handleIconClick = {() => {navigation.navigate("TirthankarInfo", {})}}
                    />

                    <ActionSheet
                        ref = {o => this.ActionSheet = o}
                        options = {["Cancel"].concat(this.state.componentList.map(option => option.name))}
                        cancelButtonIndex = {0}
                        destructiveButtonIndex = {0}
                        onPress = {this.handleSelectedAction}
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
    },

    textHeading: {
		fontSize: 25
    },
    
    rightIcon: {
		width: 25,
		height: 25,
		tintColor: "#76323F"
    },
    
    subtractIcon: {
		width: 25,
		height: 25,
		tintColor: "red"
    },
    
    inputText: {
		fontSize: 20,
		textAlign: 'left',
		padding: 5,


		backgroundColor: '#ffffff',
		borderBottomWidth: 0.5,
		borderBottomColor: '#d6d7da',
	}
});
