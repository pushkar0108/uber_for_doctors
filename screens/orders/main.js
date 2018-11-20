"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Icon } from 'react-native-elements';


import Header from '../../components/header';
import NoData from '../../components/noData';
import DSOrders from '../../dataServices/orders';
import DSProducts from '../../dataServices/products';

const options = [
    {
        name: "cancel",
        label: "Cancel"
    },
    {
        name: "viewOrderDetails",
        label: "View Order Details"
    }/*,
    {
        name: "editOrder",
        label: "Edit Order"
    }*/
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
        this.getOrderList = this.getOrderList.bind(this);

        this.state = {
            list: [],
            selectedOrder: null,
            productMap: {},
            refreshing: false
        };
    }

    componentDidMount() {
        DSProducts
            .map({
                filters: {
                    party_id: this.selectedParty.id
                }
            })
            .then(response => {
                this.setState({
                    productMap: response
                }, () => {
                    this.getOrderList();
                });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching product map, error: ", error);
            });
    }

    getOrderList() {

        return DSOrders
            .list({
                filters: {
                    party_id: this.selectedParty.id
                }
            })
            .then(response => {
                this.setState({ list: response.data });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching order list, error: ", error);
            });
    }

    showActionSheet(order) {
        this.setState({selectedOrder: order}, () => {
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
            case "editOrder":
                navigation.navigate("OrderAddEdit", {params: {
                    selectedOrder: this.state.selectedOrder,
                    selectedParty: this.selectedParty
                }});
                break;
            case "viewOrderDetails":
                navigation.navigate("OrderDetails", {params: {
                    selectedOrder: this.state.selectedOrder,
                    selectedParty: this.selectedParty
                }});
                break;
            default:
                console.log("###### Not a valid option selected, selectedOption: ", selectedOption);
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getOrderList()
            .finally(() => {
                this.setState({refreshing: false});
            });
    }

	render() {
        const { navigation } = this.props;
        let {list, productMap} = this.state;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {"Order List"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/add.png')}
                        handleIconClick = {() => {navigation.navigate("OrderAddEdit", {params: {
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
                                    list.map((order, index) => {
                                        return (
                                            <TouchableOpacity key={order.id}
                                                onPress={this.showActionSheet.bind(this, order)}>
                                                <View style={styles.entryContainer}>
                                                    <View>
                                                        <Icon
                                                            iconStyle={styles.idol}
                                                            name='text-document-inverted'
                                                            type='entypo'
                                                            size={35}
                                                            color='#76323F' />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.textMsg}>{productMap[order.product_id].name}</Text>
                                                        <Text>Qty {order.qty.toLocaleString('en-IN')} with additional charges of &#8377; {order.additionalCharges}</Text>
                                                        <Text style={styles.textMsgInfo}>{order.remark}</Text>
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
