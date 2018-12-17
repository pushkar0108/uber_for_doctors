"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Icon } from 'react-native-elements';

import Header from '../../components/header';
import NoData from '../../components/noData';
import DSParty from '../../dataServices/party';

const options = [
    {
        name: "cancel",
        label: "Cancel",
        navigateTo: ""
    },
    {
        name: "viewOrders",
        label: "View Orders",
        navigateTo: "Orders"
    },
    {
        name: "viewPayments",
        label: "View Payments",
        navigateTo: "Payments"
    },
    {
        name: "viewInventory",
        label: "View Inventory",
        navigateTo: "Inventory"
    },
    {
        name: "viewProducts",
        label: "View Products",
        navigateTo: "Products"
    },
    {
        name: "viewComponents",
        label: "View Components",
        navigateTo: "Components"
    },
    {
        name: "editParty",
        label: "Edit Party",
        navigateTo: "PartyAddEdit"
    }
];

export default class App extends Component {

    constructor(props) {
        super(props);

        this.showActionSheet = this.showActionSheet.bind(this);
        this.handleSelectedAction = this.handleSelectedAction.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.getPartyList = this.getPartyList.bind(this);

        this.state = {
            list: [],
            selectedParty: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.getPartyList();
    }

    getPartyList() {
        return DSParty
            .list()
            .then(response => {
                this.setState({ list: response.data });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching party list, error: ", error);
            });
    }

    showActionSheet(party) {
        this.setState({selectedParty: party}, () => {
            this.ActionSheet.show();
        });
    }

    handleSelectedAction(index) {
        const { navigation } = this.props;
        let selectedOption = options[index];

        if(selectedOption.value === "cancel"){
            return;
        }
        
        navigation.navigate(selectedOption.navigateTo, {params: {
            selectedParty: this.state.selectedParty
        }});
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getPartyList()
            .finally(() => {
                this.setState({refreshing: false});
            });
    }

	render() {
        let {list} = this.state;
        const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {"Party List"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/add.png')}
                        handleIconClick = {() => {navigation.navigate("PartyAddEdit", {})}}
                    />

                    <ActionSheet
                        ref = {o => this.ActionSheet = o}
                        // title = {<Text style={{ color: '#000', fontSize: 18 }}></Text>}
                        options = {options.map(option => option.label)}
                        cancelButtonIndex = {0}
                        destructiveButtonIndex = {0}
                        onPress = {this.handleSelectedAction}
                    />

                    {
                        !list.length ? <NoData /> :

                        <ScrollView 
                            style = {{ flex: 1, backgroundColor: '#ffffff' }}
                            refreshControl = {
                                <RefreshControl
                                  refreshing = {this.state.refreshing}
                                  onRefresh = {this._onRefresh}
                                />
                            }
                        >

                            <View style={styles.content}>
                                {
                                    list.map((party, index) => {
                                        return (
                                            <TouchableOpacity key={party.id}
                                                onPress={this.showActionSheet.bind(this, party)}>
                                                <View style={styles.entryContainer}>
                                                    <View>
                                                        <Icon
                                                            iconStyle={styles.idol}
                                                            name='user'
                                                            type='entypo'
                                                            size={35}
                                                            color='#76323F' />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.textMsg}>{party.name}</Text>
                                                        <Text>{party.location}</Text>
                                                        <Text style={styles.textMsgInfo}>{party.description}</Text>
                                                    </View>
                                                    <View style={{marginLeft: "auto"}}>
                                                        <Icon
                                                            name='list'
                                                            type='entypo'
                                                            size={23}
                                                            color='#76323F' />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
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
