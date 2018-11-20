"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

import Header from '../../components/header';

import DSOrders from '../../dataServices/orders';
import DSProducts from '../../dataServices/products';
import DSComponents from '../../dataServices/components';

import CustomForm from '../../components/customForm';

export default class App extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.params = navigation.getParam('params', {});
        this.showActionSheet = this.showActionSheet.bind(this);
        this.addPahandleFormSubmitrty = this.handleFormSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getFormConfig = this.getFormConfig.bind(this);
        this.handleSelectedAction = this.handleSelectedAction.bind(this);

        this.state = {
            productList: [],
            componentMap: {},
            selectedProduct: null
        };
    }

    componentDidMount() {
        let { selectedParty = {} } = this.params;

        DSProducts
            .list({
                filters: {
                    party_id: selectedParty.id
                }
            })
            .then(response => {
                this.setState({
                    productList: response.data
                });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching product list, error: ", error);
            });

        DSComponents
            .map({
                filters: {
                    party_id: selectedParty.id
                }
            })
            .then(response => {
                this.setState({
                    componentMap: response
                });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching component map, error: ", error);
            });
    }

    handleSelectedAction(index) {
        if(index == 0){
            return;
        }

        let { productList } = this.state;
        let selectedProduct = productList[index-1];
        this.setState({ selectedProduct });
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    handleFormSubmit(buttonOption, formState) {
        const { navigation } = this.props;

        if(buttonOption.name == "cancel"){
            return navigation.goBack();
        }

        let { selectedParty = {} } = this.params;
        let { componentMap } = this.state;

        let params = {
            party_id: selectedParty.id,
            product_id: this.state.selectedProduct.id,
            qty: formState.qty,
            additionalCharges: formState.additionalCharges || 0,
            rates: this.state.selectedProduct.components.map(component => {
                console.log("****** Pushakr component: ", component);
                return {
                    component_id: component.component_id,
                    qty: component.qty,
                    rate: Number(component.customRate || componentMap[component.component_id].mountRate)
                };
            }),
            remark: formState.remark
        };

        console.log("Pushkar [handleFormSubmit] params: ", params);

        if(buttonOption.name == "add") {
            return Alert.alert(
                'Add Order',
                'Do you confirm?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            DSOrders.add({
                                params: params
                            }).then(response => {
                                return navigation.goBack();
                            }).catch(error => {
                                console.log("Error while adding order");
                            });
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    }

    getFormConfig(selectedComponent) {
        let selectedProductName = this.state.selectedProduct ? this.state.selectedProduct.name : "Select Product";
        let config = {
            formFields: {
                options: [
                    {
                        name: "product",
                        type: "Custom",
                        field: (
                            <TouchableOpacity onPress={this.showActionSheet}
                                style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', padding: 10 }}>
                                <Text style={styles.textHeading}>{selectedProductName}</Text>
                                <Image source={require('../../images/right_arrow.png')} style={styles.rightIcon} />
                            </TouchableOpacity>
                        )
                    },
                    {
                        name: "qty",
                        label: "Quantity",
                        placeholder: "Enter Quantity",
                        type: "TextInput",
                        keyboardType: "numeric",
                        validations: [
                            {
                                type: "isRequired",
                                errorMsg: "Quantity is required"
                            }
                        ]
                    },
                    {
                        name: "additionalCharges",
                        label: "Additional Charges",
                        placeholder: "Enter Additional Charges",
                        type: "TextInput",
                        defaultValue: "0",
                        keyboardType: "numeric",
                        validations: []
                    },
                    {
                        name: "remark",
                        label: "Remark",
                        placeholder: "Enter Order Remark",
                        type: "TextInput",
                        validations: []
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
						title = {selectedComponent ? "Edit Order" : "Add Order"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/info.png')}
                        handleIconClick = {() => {navigation.navigate("TirthankarInfo", {})}}
                    />

                    <ActionSheet
                        ref = {o => this.ActionSheet = o}
                        options = {["Cancel"].concat(this.state.productList.map(option => option.name))}
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

    rightIcon: {
		width: 25,
		height: 25,
        tintColor: "#76323F",
        transform: [{ rotate: '90deg'}]
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
