"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';

import Header from '../../components/header';
import NoData from '../../components/noData';
import DSAuth from '../../dataServices/auth';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.getInbox = this.getInbox.bind(this);

        this.state = {
            inbox: []
        };
    }

    componentDidMount() {
        this.getInbox();
    }

    getInbox() {
        return DSAuth.getInbox()
            .then(response => {
                this.setState({ inbox: response.data });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching inbox, error: ", error);
            });
    }

	render() {
        const { navigation } = this.props;
        let { inbox } = this.state;

		return (
			<SafeAreaView style={styles.content}>
					<Header
						title = {"Inbox"} 
						navigation = {navigation} 
                    />

                    {
                        !inbox.length ? <NoData /> :

                        <ScrollView style = {{ flex: 1, backgroundColor: '#ffffff' }}>
                            <View style={styles.content}>

                                {
                                    inbox.map(row => {
                                        return (
                                            <TouchableOpacity key={row.roomId}
                                                onPress={() => {
                                                    return navigation.navigate("ChatRoom", {params: {
                                                        roomId: row.roomId
                                                    }});
                                                }}>
                                                <View style={styles.entryContainer}>
                                                    <View>
                                                        <Icon
                                                            iconStyle={styles.idol}
                                                            name='text-document-inverted'
                                                            type='entypo'
                                                            size={35}
                                                            color='#d6d7da' />
                                                    </View>
                                                    <View style={{flex:1}}>
                                                        <Text style={styles.textMsg}>{row.name}</Text>
                                                        <Text>{row.lm}</Text>
                                                        <Text>{row.lmt}</Text>
                                                    </View>
                                                    <View style={{marginLeft: "auto"}}>
                                                        <Icon
                                                            name='chevron-right'
                                                            type='entypo'
                                                            size={23}
                                                            color='#d6d7da' />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        </ScrollView>
                    }
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

        borderTopWidth: 0.8,
        borderTopColor: '#d6d7da',

        alignItems: "center"
    },

    idol: {
        marginRight: 10
    },

    textMsgIndex: {
        fontWeight: "600",
        fontSize: 16,
        minWidth: 30
    },

    textMsg: {
        fontWeight: "600",
        fontSize: 16,
        marginRight: 15
    },

    textMsgInfo: {
        fontWeight: "400",
        fontSize: 14,
        marginRight: 15,
        color: "#cccccc"
    }
});
