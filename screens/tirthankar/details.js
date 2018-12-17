"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import Header from '../../components/header';

const dataPointsToShow = [
    {
        "name": "name",
        "label": "Name"
    },
    {
        "name": "symbol",
        "label": "Symbol"
    },
    {
        "name": "age",
        "label": "Age"
    },
    {
        "name": "born",
        "label": "Born"
    },
    {
        "name": "died",
        "label": "Died"
    },
    {
        "name": "father",
        "label": "Father"
    },
    {
        "name": "mother",
        "label": "Mother"
    },
    {
        "name": "height",
        "label": "Height"
    }
];

export default class App extends Component {

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});

        // const params = {
        //     "name": "Rishabhanatha (Adinatha)",
        //     "label": "Shri Rishabhanatha (Adinatha)",
        //     "info": "According to Jain texts, Rishabhanatha was born in a king 's family in the age when there was happiness all around with no one needing to do any work because of Kalpavriksha (miraculous wish-fulfilling trees). Gradually as the cycle progressed, the efficacy of these trees decreased, people rushed to their king for help. Rishabhanatha is then said to have taught the men six main professions. These were: (1) Asi (swordsmanship for protection), (2) Masi (writing skills), (3) Krishi (agriculture), (4) Vidya (knowledge), (5) Vanijya (trade and commerce) and (6) Shilp (crafts). In other words, he is credited with introducing karma-bhumi (the age of action) by founding arts and professions to enable householders to sustain themselves. He is, in the Jain belief, the one who organized a social system that created the varna based on professions.",
        //     "dataPoints": {
        //         "name": "Shri Rishabhanathji (Adinathji)",
        //         "symbol": "Bull",
        //         "age": "84 lakh purva years",
        //         "born": "ayodhya",
        //         "died": "mount asthapada",
        //         "father": "Nabhi",
        //         "mother": "Marudevi",
        //         "height": "1200 feet"
        //     }
        // };

        const {dataPoints = {}} = params;

		return (
			<SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

					<Header 
						title = {params.label} 
						navigation = {navigation} />

					<View style={styles.content}>
                        <View style={styles.dataPointsContainer}>
                            {
                                dataPointsToShow.map((item, index) => {
                                    return (
                                        <View key={item.name} style={styles.entryContainer}>
                                            <Text style={styles.textMsgDataPoint}>{item.label}</Text>
                                            <Text style={styles.textMsg}>{dataPoints[item.name]}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View>
                            <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: "600",}}>
                                Information
                            </Text>
                            <Text>{params.info}</Text>
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
		backgroundColor: '#ffffff'
    },

    content: { 
        flex: 1, 
        backgroundColor: '#ffffff',
        padding: 20
    },

    dataPointsContainer: {
        padding: 10,
        // backgroundColor: '#FFFACD',
        // borderRadius: 10
    },
    
    entryContainer: {
        padding: 15,
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 0.8,
        borderBottomColor: '#d6d7da',
        alignItems: "flex-start"
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
