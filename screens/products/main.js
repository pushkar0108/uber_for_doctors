"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Icon } from 'react-native-elements';

import Header from '../../components/header';
import NoData from '../../components/noData';
import DSProducts from '../../dataServices/products';

const options = [
    {
        name: "cancel",
        label: "Cancel"
    },
    {
        name: "editProduct",
        label: "Edit Product"
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
        this.getProductList = this.getProductList.bind(this);

        this.state = {
            list: [],
            selectedProduct: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.getProductList();
    }

    getProductList() {
        return DSProducts
            .list({
                filters: {
                    party_id: this.selectedParty.id
                }
            })
            .then(response => {
                this.setState({ list: response.data });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching product list, error: ", error);
            });
    }

    showActionSheet(product) {
        this.setState({selectedProduct: product}, () => {
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
            case "editProduct":
                navigation.navigate("ProductAddEdit", {params: {
                    selectedProduct: this.state.selectedProduct,
                    selectedParty: this.selectedParty
                }});
                break;
            default:
                console.log("###### Not a valid option selected, selectedOption: ", selectedOption);
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getProductList()
            .finally(() => {
                this.setState({refreshing: false});
            });
    }

	render() {
        const { navigation } = this.props;
        let {list} = this.state;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {"Product List"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/add.png')}
                        handleIconClick = {() => {navigation.navigate("ProductAddEdit", {params: {
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
                                    list.map((product, index) => {
                                        return (
                                            <TouchableOpacity key={product.id}
                                                onPress={this.showActionSheet.bind(this, product)}>
                                                <View style={styles.entryContainer}>
                                                    <View>
                                                        <Icon
                                                            iconStyle={styles.idol}
                                                            name='drive'
                                                            type='entypo'
                                                            size={35}
                                                            color='#76323F' />
                                                    </View>
                                                    <View>
                                                        <Text style={styles.textMsg}>{product.name}</Text>
                                                        <Text style={styles.textMsgInfo}>{product.description}</Text>
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
