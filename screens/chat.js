"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, Image, TouchableOpacity } from 'react-native';

import ws from '../ws';
import Header from '../components/header';

const loggedInUserId = 123;

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: "",
			data: [
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM"
				},
				{
					userId: 123,
					msg: "Cool!!!!!"
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM"
				},
				{
					userId: 123,
					msg: "Cool!!!!!"
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM"
				},
				{
					userId: 123,
					msg: "Cool!!!!!"
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM"
				},
				{
					userId: 123,
					msg: "Cool!!!!!"
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM"
				},
				{
					userId: 123,
					msg: "Cool!!!!!"
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM"
				},
				{
					userId: 123,
					msg: "Cool!!!!!"
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM"
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM",
					status: 0,
				},
				{
					userId: 123,
					msg: "Cool!!!!!",
					status: 0,
				},
				{
					userId: 123,
					msg: "Hi Brother, its been so long we havn't me. We should make a plan soon.",
					timestamp: "10:11 AM",
					status: 1,
				},
				{
					userId: 222,
					msg: "Hi sister, you are correct!",
					timestamp: "12:15 AM",
					status: 0,
				},
				{
					userId: 123,
					msg: "Cool!!!!!",
					status: 2,
				}
			]
		};

		this.handleMsgSubmit = this.handleMsgSubmit.bind(this);
	}

	handleMsgSubmit() {
		let text = this.state.text;

		if(text) {
			let packet = {
				msg: text,
				status: 0,
				timestamp: "10:11 AM"
			};
			ws.sendMessage(packet)
				.then(response => {
					console.log("Message delivered");
				})
				.catch(error => {

				});
		}
	}

	componentDidMount() {
		ws.onmessage = event => {
			console.log("componentWillMount event: ", event);
			let data;

			try {
				data = JSON.parse(event.data);
			} catch (error) {
				console.log("Error in parsing received message");
			}

			this.setState({
				data: this.state.data.concat(data),
				text: ""
			});
		};
	}

	render() {
		let data = this.state.data;

		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={styles.container}
					behavior={(Platform.OS === 'ios') ? "padding" : null}
					keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>

					<Header 
						title = {"John Doe"} 
						subText = {"Last Seen: Yesterday"} 
						navigation = {this.props.navigation} />

					{
						!data.length ?

							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
								<Image source={require('../images/message.png')}
									style={{
										width: 100,
										height: 100,
										tintColor: "#696969"
									}}
								/>
								<Text style={{
									fontSize: 30,
									color: "#696969"
								}}>
									Start your conversation
								</Text>
							</View> :

							<ScrollView style={styles.content}
								keyboardShouldPersistTaps='handled'
								keyboardDismissMode='on-drag'>
								{
									data.map((item, index) => {
										let cssClass = [styles.msgText];

										if(loggedInUserId !== item.userId){
											cssClass.push(styles.msgOther);
										}else{
											cssClass.push(styles.msgSelf);
										}

										return (
											<View key={index} style={cssClass}>
												<Text>{item.msg}</Text>
												<Text style={{ fontSize: 10, color: "#696969", paddingTop: 2, alignSelf: "flex-end" }}>
													{item.timestamp}
												</Text>
											</View>
										);
									})
								}
							</ScrollView>
					}

					<View style={styles.footer}>
						<View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
							<TouchableOpacity
								onPress={this.handleMsgSubmit}>
								<Image
									source={require('../images/attachment.png')}
									style={{
										width: 25,
										height: 25,
										tintColor: "#76323F"
									}}
								/>
							</TouchableOpacity>

							<TextInput
								style={styles.inputText}
								placeholder="Write a message .."
								value={this.state.text}
								onChangeText={text => this.setState({ text })}
								returnKeyType="default"
								onSubmitEditing={() => { /*this.secondTextInput.focus();*/ Keyboard.dismiss(); }}
								blurOnSubmit={false} // this will keep keyboard open even when focus changes on second input
							/>

							{/* <TextInput
								style={styles.inputText}
								placeholder = "secondTextInput"
								ref={(input) => { this.secondTextInput = input; }} // instead of ref we can use state
							/> */}

							<TouchableOpacity
								onPress={this.handleMsgSubmit}>
								<Image
									source={require('../images/send.png')}
									style={{
										width: 25,
										height: 25,
										tintColor: this.state.text ? "#76323F" : "#696969"
									}}
								/>
							</TouchableOpacity>

						</View>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},

	footer: {
		backgroundColor: '#ffffff',
		height: 50,
		borderTopWidth: 0.5,
		borderTopColor: '#d6d7da',
		// shadowColor: '#000000',
		// shadowOffset: {
		// 	width: 0,
		// 	height: 3
		// },
		// shadowRadius: 10,
		// shadowOpacity: 0.7
	},

	content: {
		backgroundColor: '#ffffff',
		flex: 1
	},

	msgText: {
		fontSize: 20,
		fontFamily: 'Gill Sans',
		textAlign: 'left',
		margin: 10,
		padding: 10,
		borderRadius: 10
	},

	msgSelf: {
		alignSelf: "flex-end",
		backgroundColor: "#d6d7da"
	},

	msgOther: {
		alignSelf: "flex-start",
		backgroundColor: "#b4ecb4"
	},

	inputText: {
		flex: 1,
		fontSize: 15,
		textAlign: 'left',
		padding: 5,
		alignSelf: "flex-start",
		marginLeft: 10,
		marginRight: 10
	}
});
