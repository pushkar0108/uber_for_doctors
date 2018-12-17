"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Icon } from 'react-native-elements';

import Header from '../../components/header';
import NoData from '../../components/noData';
import DSComponents from '../../dataServices/components';
import DSInventory from '../../dataServices/inventory';

const options = [
    {
        name: "cancel",
        label: "Cancel"
    },
    {
        name: "editComponent",
        label: "Edit Component"
    }
];


export default class App extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        this.selectedParty = params.selectedParty;

        this.showActionSheet = this.showActionSheet.bind(this);
        this.handleSelectedAction = this.handleSelectedAction.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.getComponentList = this.getComponentList.bind(this);

        this.state = {
            list: [],
            selectedComponent: null,
            currentInventory: {},
            refreshing: false
        };
    }

    componentDidMount() {
        this.getComponentList();

        DSInventory
            .currentValues({
                filters: {
                    party_id: this.selectedParty.id
                }
            })
            .then(response => {
                this.setState({ currentInventory: response });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching current inventory, error: ", error);
            });
    }

    getComponentList() {
        return DSComponents
            .list({
                filters: {
                    party_id: this.selectedParty.id
                }
            })
            .then(response => {
                this.setState({ list: response.data });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching component list, error: ", error);
            });
    }

    showActionSheet(component) {
        this.setState({selectedComponent: component}, () => {
            this.ActionSheet.show();
        });
    }

    handleSelectedAction(index) {
        const { navigation } = this.props;
        let selectedOption = options[index];

        if(selectedOption.value === "cancel"){
            return;
        }
        
        switch(selectedOption.name) {
            case "editComponent":
                navigation.navigate("ComponentAddEdit", {params: {
                    selectedComponent: this.state.selectedComponent,
                    selectedParty: this.selectedParty
                }});
                break;
            default:
                console.log("###### Not a valid option selected, selectedOption: ", selectedOption);
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getComponentList()
            .finally(() => {
                this.setState({refreshing: false});
            });
    }

	render() {
        const { navigation } = this.props;
        let {list, currentInventory} = this.state;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {"Component List"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/add.png')}
                        handleIconClick = {() => {navigation.navigate("ComponentAddEdit", {params: {
                            selectedParty: this.selectedParty
                        }})}}
                    />

                    <ActionSheet
                        ref = {o => this.ActionSheet = o}
                        // title = {<Text style={{ color: '#000', fontSize: 18 }}></Text>}
                        options = {options.map(option => option.label)}
                        cancelButtonIndex = {0}
                        destructiveButtonIndex = {4}
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
                                    list.map((component, index) => {
                                        return (
                                            <TouchableOpacity key={component.id}
                                                onPress={this.showActionSheet.bind(this, component)}>
                                                <View style={styles.entryContainer}>
                                                    <View>
                                                        <Icon
                                                            iconStyle={styles.idol}
                                                            name='tools'
                                                            type='entypo'
                                                            size={35}
                                                            color='#76323F' />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.textMsg}>{component.name}</Text>
                                                        <Text>Mount Rate: &#8377; {component.mountRate}</Text>
                                                        <Text>Inventory: {currentInventory[component.id] || 0}</Text>
                                                        <Text style={styles.textMsgInfo}>{component.description}</Text>
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

    rightArrow: {
        height: 15,
        width: 15
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
