"use strict";

import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Text, Button, Switch } from 'react-native';

import VALIDATIONS from '../utils/validations';

export default class CustomForm extends Component {

	constructor(props) {
		super(props);

		this.getFormField = this.getFormField.bind(this);
		this.getInitialState = this.getInitialState.bind(this);
		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleFormSubmitCallback = this.handleFormSubmitCallback.bind(this);
		this.state = this.getInitialState();
	}

	componentWillReceiveProps(nextProps) {
		nextProps.config.formFields.options.forEach(option => {
			let val = this.state[option.name];
			if((val === undefined || val === null) && option.defaultValue){
				this.state[option.name] = option.defaultValue;
			}
		});

		this.setState({});
	}

	getInitialState() {
		let state = {
			errorMap: {}
		};

		let {config} = this.props;
		let formOptions = config.formFields && config.formFields.options || [];

		formOptions.forEach(option => {
			if(option.defaultValue){
				state[option.name] = option.defaultValue;
			}
		});

		console.log("state init: ", state);
		return state;
	}

	handleChangeText(option, text){
        this.setState({
            [option.name]: text
        });
	}
	
	handleFormSubmitCallback(buttonOption) {
		let {formSubmitCallback} = this.props;
		if(buttonOption.name === "cancel"){
			return formSubmitCallback(buttonOption, this.state);
		}
		
		let validForm = this.checkFormValidations();
		if(validForm){
			return formSubmitCallback(buttonOption, this.state);
		}

		console.log("##### Form is not valid");
	}

	checkFormValidations() {
		let state = this.state;
		let {errorMap} = state;
		let {config} = this.props;
		
		let formOptions = config.formFields && config.formFields.options || [];
		let isValidForm = true;

		formOptions.forEach(field => {
			let validations = field.validations;
			let fieldVal = state[field.name];

			if(validations && validations.length) {
				validations.forEach(validation => {
					let validValue = VALIDATIONS[validation.type](fieldVal);

					if(!validValue) {
						isValidForm = false;
						errorMap[field.name] = validation.errorMsg;
					}else{
						errorMap[field.name] = false; // Reset errorMap value
					}
				});
			}
		});

		if(!isValidForm){
			this.setState({errorMap});
		}

		return isValidForm;
	}

	getFormField(option) {
		let field;

		switch(option.type){
			case "TextInput":
				field = <TextInput
							style = {styles.inputText}
							placeholder = {`${option.placeholder}` || "Search .."}
							value = {this.state[option.name] ? `${this.state[option.name]}` : undefined}
							onChangeText = {this.handleChangeText.bind(this, option)}
							returnKeyType = "next"
							secureTextEntry = {option.secureTextEntry || false}
							onSubmitEditing = {() => { Keyboard.dismiss(); }}
							blurOnSubmit = {false}
							keyboardType = {option.keyboardType || 'default'}
							ref={(input) => { this.secondTextInput = input; }}
						/>;
				break;
			case "Switch":
				field = <Switch
							style = {styles.inputSwitch}
							value = {this.state[option.name]}
							onValueChange = {val => this.handleChangeText(option, val)}
						/>;
				break;
			case "Custom":
				field = option.field;
				break;
		}

		return field;
	}

	render() {
		let {config} = this.props;
		let {errorMap} = this.state;
		let formOptions = config.formFields && config.formFields.options || [];
		let buttonOptions = (config.buttonList && config.buttonList.options) || [];

		return (
			<View style={{ flex: 1, padding: 10 }}>
			
				{
					formOptions.map((option, index) => {
						return (
							<View key={option.name} style={{ flex: 1, padding: 10 }}>
								<Text>{option.label}</Text>
								{
									this.getFormField(option, index)
								}
								{
									errorMap[option.name] && (
										<Text style={{ color: "red" }}>
											{errorMap[option.name]}
										</Text>
									)
								}
							</View>
						)
					})
				}

				{
					(buttonOptions && buttonOptions.length) ?
						<View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
							{
								buttonOptions.map((option, index) => {
									return (
										<Button
											key = {option.name}
											title = {option.label}
											onPress = {this.handleFormSubmitCallback.bind(this, option)}
											color = {option.color}
										/>
									)
								})
							}
						</View> : []
				}

			</View>
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

	inputSwitch: {
		marginTop: 5
	}
});
