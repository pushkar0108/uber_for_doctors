"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Image, Keyboard, Dimensions} from 'react-native';

import Header from '../../components/header';


export default class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            text: "",
            availableOptions: []
        };
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    componentDidMount(){
        this.handleChangeText("");
    }

    handleChangeText(text){
        const {list = []} = this.props.navigation.getParam('params', {});

        this.setState({ 
            text: text,
            availableOptions: list.filter(item => {
                return item.label.indexOf(text) > -1;
            })
        });
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {availableOptions, text} = this.state;

		return (
			<SafeAreaView style={styles.container}>

                    <Header 
                        title = {params.label} 
                        navigation = {navigation} />

                    <KeyboardAvoidingView style={styles.container}
                        behavior={(Platform.OS === 'ios') ? "padding" : null}
                        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
                        

                            <View style={styles.footer}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                                    <Image
                                        source={require('../../images/search.png')}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: "#cccccc"
                                        }}
                                    />
                                    
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Search .."
                                        value={text}
                                        onChangeText={this.handleChangeText}
                                        returnKeyType="default"
                                        onSubmitEditing={() => { Keyboard.dismiss(); }}
                                        blurOnSubmit={false}
                                    />

                                    <TouchableOpacity
                                        onPress={this.handleChangeText.bind(this, "")}>
                                        <Image
                                            source={require('../../images/cross.png')}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                tintColor: "#696969"
                                            }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>

                            {
                                !availableOptions.length ?

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
                                        No Data Available
                                    </Text>
                                </View> :

                                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff'}}
                                    keyboardShouldPersistTaps='handled'
                                    keyboardDismissMode='on-drag'>
                                    <View style={styles.content}>
                                        {    
                                            availableOptions.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={item.name}
                                                        onPress={() => {navigation.navigate("PrayerDetails", {params: item})}}>
                                                        <View style={styles.entryContainer}>
                                                            <View>
                                                                <Image source={require('../../images/book.png')} style={styles.idol} />
                                                            </View>
                                                            <View>
                                                                <Text style={styles.textMsg}>{item.label}</Text>
                                                            </View>
                                                            <View style={{marginLeft: "auto"}}>
                                                                <Image source={require('../../images/right_arrow.png')} style={styles.rightArrow} />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
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

    idol: {
        height: 30,
        width: 30,
        marginRight: 10
    },

    rightArrow: {
        height: 15,
        width: 15
    },

    textMsg: {
        fontWeight: "600",
        fontSize: 16,
        marginRight: 15
    },

    footer: {
		backgroundColor: '#ffffff',
		height: 50,
		borderBottomWidth: 0.5,
		borderBottomColor: '#d6d7da'
    },
    
    inputText: {
		flex: 1,
		fontSize: 20,
		textAlign: 'left',
		padding: 5,
		alignSelf: "flex-start",
		marginLeft: 10,
		marginRight: 10
	}
});
