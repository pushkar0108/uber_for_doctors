"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';

import Header from '../../components/header';
import DSProducts from '../../dataServices/products';
import DSComponents from '../../dataServices/components';

export default class App extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        this.selectedParty = params.selectedParty;

        this.state = {
            productMap: {},
            componentMap: {},
            selectedProduct: null
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
                });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching product map, error: ", error);
            });

        DSComponents
            .map({
                filters: {
                    party_id: this.selectedParty.id
                }
            })
            .then(response => {
                this.setState({
                    componentMap: response
                });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching component map, error: ", error);
            });
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});
        let {selectedOrder} = params;
        let {productMap, componentMap} = this.state;

		return (
			<SafeAreaView style={styles.container}>
					<Header
						title = {"Order Details"} 
						navigation = {navigation} 
                    />

                    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <View style={styles.content}>
                            <View style={styles.dataPointsContainer}>

                                {
                                    productMap[selectedOrder.product_id] && productMap[selectedOrder.product_id].name && (
                                        <View style={styles.entryContainer}>
                                            <Text style={styles.textMsgDataPoint}>Product</Text>
                                            <Text style={styles.textMsg}>{productMap[selectedOrder.product_id].name}</Text>
                                        </View>
                                    )
                                }

                                <View style={styles.entryContainer}>
                                    <Text style={styles.textMsgDataPoint}>Quantity</Text>
                                    <Text style={styles.textMsg}>{selectedOrder.qty.toLocaleString('en-IN')}</Text>
                                </View>

                                <View style={styles.entryContainer}>
                                    <Text style={styles.textMsgDataPoint}>Additional Charges</Text>
                                    <Text style={styles.textMsg}>&#8377; {selectedOrder.additionalCharges.toLocaleString('en-IN')}</Text>
                                </View>

                                <View style={styles.entryContainer}>
                                    <Text style={styles.textMsgDataPoint}>Remark</Text>
                                    <Text style={styles.textMsg}>{selectedOrder.remark}</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: "600",}}>
                                    Rates
                                </Text>
                                <View style={styles.dataPointsContainer}>
                                    {
                                        selectedOrder.rates.map((item, index) => {
                                            return (
                                                <View key={item.component_id} style={styles.entryContainer}>
                                                    {
                                                        componentMap[item.component_id] && componentMap[item.component_id].name && (
                                                            <Text style={styles.textMsgDataPoint}>
                                                                {componentMap[item.component_id].name}
                                                            </Text>
                                                        )
                                                    }
                                                    <Text style={styles.textMsgDataPoint}>
                                                        {Number(item.qty*selectedOrder.qty).toLocaleString('en-IN')}
                                                    </Text>
                                                    <Text style={styles.textMsg}>&#8377; {item.rate.toLocaleString('en-IN')}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View>
                                <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: "600",}}>
                                    Total Amount
                                </Text>
                                <View style={styles.dataPointsContainer}>
                                    <Text style={styles.textMsg}>
                                        &#8377; {
                                            ((Number(selectedOrder.qty) * selectedOrder.rates.reduce((accumulator, currentValue) => {
                                                return accumulator + (Number(currentValue.qty) * Number(currentValue.rate));
                                            }, 0)) + Number(selectedOrder.additionalCharges)).toLocaleString('en-IN')
                                        }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

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
        backgroundColor: '#ffffff',
        padding: 20
    },

    dataPointsContainer: {
        padding: 10
    },

    entryContainer: {
        padding: 15,
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 0.8,
        borderBottomColor: '#d6d7da',
        // alignItems: "flex-start",
        justifyContent: 'space-between'
    },

    textMsgDataPoint: {
        fontWeight: "600",
        fontSize: 15,
        minWidth: 70
    },

    textMsg: {
        fontWeight: "600",
        fontSize: 20,
        marginRight: 15
    }
});
