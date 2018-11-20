"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, Image, TouchableOpacity } from 'react-native';

import ws from '../../ws';
import Header from '../../components/header';
import CommonUtilities from '../../utils/common';
import { Icon } from 'react-native-elements';

import DSAuth from '../../dataServices/auth';

export default class App extends Component {

	constructor(props) {
        super(props);

        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        this.roomId = params.roomId;
        
        this.getMsgView = this.getMsgView.bind(this);
        this.handleMsgSubmit = this.handleMsgSubmit.bind(this);
        this.getRoomData = this.getRoomData.bind(this);
        this.endDoctorVisit = this.endDoctorVisit.bind(this);
        
        this.state = {
            roomData: {},
			text: "",
			data: [
				{
                    id: "1",
                    type: "text", // pdf, image, form, test, medicine,  info
                    self: true,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        msg: "Visit ended || Date 12/12/2018"
                    }
                },
                {
                    id: "2",
                    type: "pdf", // pdf, image, form, test, medicine,  info
                    self: true,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        title: "View test results for x",
                        src: "https://www.ets.org/s/gre/pdf/practice_book_GRE_pb_revised_general_test.pdf"
                    }
                },
                {
                    id: "3",
                    type: "image", // pdf, image, form, test, medicine,  info
                    self: true,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "4",
                    type: "form", // pdf, image, form, test, medicine,  info
                    self: true,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        formId: 1234,
                        title: "Basic Dignostics",
                        status: 0
                    }
                },
                {
                    id: "5",
                    type: "test", // pdf, image, form, test, medicine,  info
                    self: true,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        msg: "Please get this test done",
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "6",
                    type: "medicine", // pdf, image, form, test, medicine,  info
                    self: true,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        msg: "Please take this medicine - 'Calpol' ",
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "7",
                    type: "info",
                    self: true,
                    time: "12:05 AM",
                    data: {
                        msg: "Visit ended || Date 12/12/2018"
                    }
                },

                {
                    id: "8",
                    type: "text", // pdf, image, form, test, medicine,  info
                    self: false,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        msg: "Visit ended || Date 12/12/2018"
                    }
                },
                {
                    id: "9",
                    type: "pdf", // pdf, image, form, test, medicine,  info
                    self: false,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        title: "View test results for x",
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "10",
                    type: "image", // pdf, image, form, test, medicine,  info
                    self: false,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "11",
                    type: "form", // pdf, image, form, test, medicine,  info
                    self: false,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        formId: 1234,
                        title: "Basic Dignostics",
                        status: 1 // 0-not submitted, 1-submitted
                    }
                },
                {
                    id: "12",
                    type: "test", // pdf, image, form, test, medicine,  info
                    self: false,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        msg: "Please get this test done",
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "13",
                    type: "medicine", // pdf, image, form, test, medicine,  info
                    self: false,
                    senderId: 123,
                    time: "12:05 AM",
                    data: {
                        msg: "Please take this medicine - 'Calpol' ",
                        src: "https://www.lalpathlabs.com/"
                    }
                },
                {
                    id: "14",
                    type: "info",
                    self: false,
                    time: "12:05 AM",
                    data: {
                        msg: "Visit ended || Date 12/12/2018"
                    }
                }
			]
		};

		
	}

	handleMsgSubmit() {
		let text = this.state.text;

		if(text) {
			let body = {
                message: text,
                roomId: this.roomId
            };
            
			return DSAuth.sendChatMessage({ body })
				.then(response => {
                    console.log("[sendChatMessage] Message delivered, response: ", response);
                    
                    this.state.roomData.data.push(response);
                    this.setState({
                        text: "",
                        roomData: this.state.roomData
                    });
				})
				.catch(error => {
                    console.log("[sendChatMessage] Error in sending", error);
				});
		}
	}

	componentDidMount() {
        this.getRoomData();
    }

    endDoctorVisit() {
        let body = {
            roomId: this.roomId
        };

        return DSAuth.endDoctorVisit({ body })
        .then(response => {
            this.state.roomData.status = "INACTIVE";
            this.setState({
                roomData: this.state.roomData
            });
        })
        .catch(error => {
            console.log("##### [main.js] Error in endDoctorVisit, error: ", error);
        });
    }

    getRoomData() {

        return DSAuth.getRoomData({
            roomId: this.roomId,
            params: {}
        })
        .then(response => {
            this.setState({ 
                roomData: response
            }, () => {

                ws.instance.onmessage = event => {
                    console.log("componentWillMount event: ", event);
                    let data = CommonUtilities.parseWsMsg(event);
                    
                    if(data && data.eventType == "new_chat_message"){
                        console.log("New message received, msg: ", data.msg);
                        
                        let roomData = this.state.roomData;
                        roomData.data = roomData.data.concat(data.msg);
                        this.setState({
                            roomData: roomData,
                            text: ""
                        });
                    }

                    if(data && data.eventType == "endChat") {
                        this.state.roomData.status = "INACTIVE";
                        this.setState({
                            roomData: this.state.roomData
                        });
                    }
                };

            });
        })
        .catch(error => {
            console.log("##### [main.js] Error in fetching room data, error: ", error);
        });
    }
    
    getMsgView(msg){
        let cssClass = [styles.msgText];
        const { navigation } = this.props;

        if(msg.self){
            cssClass.push(styles.msgSelf);
        }else{
            cssClass.push(styles.msgOther);
        }

        let msgView;
        switch(msg.type) {
            case "text":
                msgView = <Text>{msg.data.msg}</Text>;
                break;
            case "pdf":
                msgView = (
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Icon
                                iconStyle={{
                                    marginRight: 10
                                }}
                                name='clipboard'
                                type='entypo'
                                size={20}
                                color={msg.self ? 'grey' : 'green'} />
                        </View>
                        <View>
                            <Text style={styles.textMsg}>{msg.data.title}</Text>
                            <TouchableOpacity onPress = {() => {
                                return navigation.navigate("WebView", {params: {
                                    title: "View",
                                    subText: "qwewq ewq eqw",
                                    src: msg.data.src
                                }});
                            }}>
                                <Text style={styles.link}>{"View PDF"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case "image":
                break;
            case "form":
                msgView = (
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Icon
                                iconStyle={{
                                    marginRight: 10
                                }}
                                name='clipboard'
                                type='entypo'
                                size={20}
                                color={msg.self ? 'grey' : 'green'} />
                        </View>
                        <View>
                            <Text style={styles.textMsg}>{msg.data.title}</Text>
                            <TouchableOpacity onPress = {() => {
                                return navigation.navigate("FormView", {params: {
                                    title: "Form",
                                    subText: "sadaadsdsa dsada",
                                    msgData: msg.data
                                }});
                            }}>
                                <Text style={styles.link}>{msg.data.status ? "Fill Form" : "View Form"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case "test":
                msgView = (
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Icon
                                iconStyle={{
                                    marginRight: 10
                                }}
                                name='clipboard'
                                type='entypo'
                                size={20}
                                color={msg.self ? 'grey' : 'green'} />
                        </View>
                        <View>
                            <Text style={styles.textMsg}>{msg.data.msg}</Text>
                            <TouchableOpacity onPress = {() => {
                                return navigation.navigate("WebView", {params: {
                                    title: "Buy Medicines",
                                    subText: "qwewq ewq eqw",
                                    src: msg.data.src
                                }});
                            }}>
                                <Text style={styles.link}>{"Schedule Now"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case "medicine":
                msgView = (
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Icon
                                iconStyle={{
                                    marginRight: 10
                                }}
                                name='medkit'
                                type='font-awesome'
                                size={20}
                                color={msg.self ? 'grey' : 'green'} />
                        </View>
                        <View>
                            <Text style={styles.textMsg}>{msg.data.msg}</Text>
                            <TouchableOpacity onPress = {() => {
                                return navigation.navigate("WebView", {params: {
                                    title: "Buy Medicines",
                                    subText: "qwewq ewq eqw",
                                    src: msg.data.src
                                }});
                            }}>
                                <Text style={styles.link}>{"Buy Now"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                break;
            case "info":
                cssClass.push({
                    alignSelf: "center",
                    backgroundColor: "orange",
                    paddingTop: 2,
                    paddingBottom: 2
                });
                msgView = <Text>{msg.data.msg}</Text>;
                break;
            default: 
                console.log("Not a valid msg type");
                break;

        }

        let field = (
            <View key={msg.id} style={cssClass}>
                {
                    msg.type != "info" && !msg.self && msg.sender && <Text style={styles.senderName}>{msg.sender}</Text>
                }
                {
                    msgView
                }
                {
                    msg.type != "info" && (
                        <Text style={{ fontSize: 10, color: "#696969", paddingTop: 2, alignSelf: "flex-end" }}>
                            {msg.time}
                        </Text>
                    )
                }
            </View>
        );

        return field;
    }

	render() {
        let { roomData = {} } = this.state;
        let data = this.state.data || roomData.data || [];

		return (
			<SafeAreaView style={styles.content}>
				<KeyboardAvoidingView style={styles.container}
					behavior={(Platform.OS === 'ios') ? "padding" : null}
					keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>

					<Header 
						title = {roomData.heading} 
                        navigation = {this.props.navigation}
                        rightIcon = {
                            <Icon
                                iconStyle={{
                                    marginRight: 10
                                }}
                                name='export'
                                type='entypo'
                                size={25}
                                color='#76323F' />
                        }  
                        handleIconClick = {() => {
                            this.endDoctorVisit();
                        }}
                    />

					{
						!data.length ?

							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
								<Image source={require('../../images/message.png')}
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
									data.map((msg = {}, index) => {
										return this.getMsgView(msg);
									})
								}
							</ScrollView>
                    }
                    
                    {
                        roomData.status == "ACTIVE" && (
                            <View style={styles.footer}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>

                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Write a message .."
                                        value={this.state.text}
                                        onChangeText={text => this.setState({ text })}
                                        returnKeyType="default"
                                        onSubmitEditing={() => { /*this.secondTextInput.focus();*/ Keyboard.dismiss(); }}
                                        blurOnSubmit={false} // this will keep keyboard open even when focus changes on second input
                                    />

                                    <TouchableOpacity
                                        onPress={this.handleMsgSubmit}>
                                        <Image
                                            source={require('../../images/send.png')}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                tintColor: this.state.text ? "#76323F" : "#696969"
                                            }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )
                    }
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
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
    },
    
    entryContainer: {
        flexDirection: "row",
        backgroundColor: "red"
    },

    textMsg: {
        fontWeight: "300",
        fontSize: 16,
        marginRight: 15
    },

    senderName: {
        fontWeight: "500",
        fontSize: 15,
        marginBottom: 5
    },

    link: {
        fontWeight: "400",
        fontSize: 13,
        marginRight: 15,
        color: "#0000FF",
        marginBottom: 5,
        marginTop: 5
        // textDecorationLine: "underline"
    }
});
