"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, Alert, Text, TextInput, Button, View, ActivityIndicator, Image } from 'react-native';

import ws from '../../ws';
import CommonUtilities from '../../utils/common';

import Header from '../../components/header';
import DSAuth from '../../dataServices/auth';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);

        this.state = {
            problemDesc: null,
            waitingForAcceptance: false,
            errorMsg: null
        };
    }

    componentDidMount() {
        const { navigation } = this.props;

        setTimeout(() => {
            ws.instance.onmessage = event => {
                console.log("[requestDoc] componentWillMount event: ", event);
                let data = CommonUtilities.parseWsMsg(event);
                
                if(data && data.eventType == "doctor_request"){
    
                    if(data.action == 1){
                        this.setState({
                            waitingForAcceptance: false,
                            data: data,
                            action: "accepted"
                        }, () => {
                            return navigation.navigate("ChatRoom", {params: {
                                roomId: data.roomId
                            }});
                        });
                    }else{
                        this.setState({
                            waitingForAcceptance: false,
                            data: data,
                            action: "rejected",
                            rejectMsg: "Doctor rejected your request."
                        });
                    }
                }
            };
        }, 2300);
    }

    handleChangeText(text) {
        this.setState({
            problemDesc: text
        });
	}

    handleFormSubmit() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let { selectedDoc = {} } = params;

        DSAuth.requestDoc({
            body: {
                pcpId: selectedDoc.pcpId,
                problemDesc: this.state.problemDesc
            }
        }).then(response => {
            console.log("$$$$$$$ request doctor success");

            this.setState({
                waitingForAcceptance: true
            });

            setTimeout(() => {
                this.setState({
                    waitingForAcceptance: false,
                    action: "rejected",
                    rejectMsg: "No Doctor is accepting request right now, Please try again later."
                });
            }, 1 * 60 * 1000);


        }).catch(error => {
            console.log("Error while Requesting doctor");
            this.setState({
                errorMsg: error.message || "Something went wrong"
            });
        });
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let { selectedDoc = {} } = params;
        let { waitingForAcceptance, action, rejectMsg } = this.state;

		return (
			<SafeAreaView style={styles.content}>
					<Header
                        title = {"Requesting Doctor"}
                        subText = {selectedDoc.name ? "You are requesting for Dr. " + selectedDoc.name: "You are requesting all eligible doctors"}
                        navigation = {navigation}
                    />

                    {
                        !waitingForAcceptance && action !="rejected" && (
                            <View style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}>
                                <Text>Decribe your problem</Text>
                                <TextInput
                                    style = {styles.inputText}
                                    placeholder = {"Write your Problem"}
                                    value = {this.state.problemDesc ? `${this.state.problemDesc}` : undefined}
                                    onChangeText = {this.handleChangeText}
                                    returnKeyType = "next"
                                    onSubmitEditing = {() => { Keyboard.dismiss(); }}
                                    blurOnSubmit = {false}
                                    // keyboardType = {'numeric'}
                                    ref={(input) => { this.secondTextInput = input; }}
                                />

                                {
                                    this.state.errorMsg && 
                                        <Text style={{ color: "red" }}>
                                            {this.state.errorMsg}
                                        </Text>
                                }

                                <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                                    <Button
                                        title = {"Request"}
                                        onPress = {this.handleFormSubmit}
                                        color = {"#841584"}
                                    />
                                </View>
                            </View>
                        )
                    }

                    {
                        !waitingForAcceptance && action == "rejected" && (
                            <View style={{ 
                                flex: 1, 
                                padding: 10, 
                                backgroundColor: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    padding: 15,
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 0.8,
                                    borderBottomColor: '#d6d7da',
                                    alignItems: "center",
                                    justifyContent: 'center', 
                                    backgroundColor: '#ffffff',
                                    marginBottom: 30,
                                    tintColor: "grey"
                                }}>
                                    <Image source={require('../../images/sad.png')}
                                        style={{
                                            width: 200,
                                            height: 200
                                        }}
                                    />
                                </View>
                                <Text>{rejectMsg}</Text>
                            </View>
                        )
                    }

                    {
                        waitingForAcceptance && (
                            <View style={{ 
                                flex: 1, 
                                padding: 10, 
                                backgroundColor: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <View style={{
                                    padding: 15,
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 0.8,
                                    borderBottomColor: '#d6d7da',
                                    alignItems: "center",
                                    justifyContent: 'center', 
                                    backgroundColor: '#ffffff',
                                    marginBottom: 30
                                }}>
                                    <Image source={require('../../images/waiting.png')}
                                        style={{
                                            width: 200,
                                            height: 200
                                        }}
                                    />
                                </View>

                                <Text>Waiting for doctor to accept.</Text>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )
                    }

			</SafeAreaView>
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
    
	container: {
		flex: 1,
        backgroundColor: '#F5FCFF'
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
