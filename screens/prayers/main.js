"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

import Header from '../../components/header';

const data = [
    {
        "name": "Aarti/Pooja",
        "label": "Aarti/Pooja",
        "list": [
            {
                "name": "aaaaaaa",
                "label": "aaaaaaa",
                "details": [
                    {
                        "type": "text",
                        "label": "English",
                        "data": "According to Jain texts, Rishabhanatha was born in a king 's family in the age when there was happiness all around with no one needing to do any work because of Kalpavriksha (miraculous wish-fulfilling trees). Gradually as the cycle progressed, the efficacy of these trees decreased, people rushed to their king for help. Rishabhanatha is then said to have taught the men six main professions. These were: (1) Asi (swordsmanship for protection), (2) Masi (writing skills), (3) Krishi (agriculture), (4) Vidya (knowledge), (5) Vanijya (trade and commerce) and (6) Shilp (crafts). In other words, he is credited with introducing karma-bhumi (the age of action) by founding arts and professions to enable householders to sustain themselves. He is, in the Jain belief, the one who organized a social system that created the varna based on professions"
                    },
                    {
                        "type": "text",
                        "label": "Hindi",
                        "data": "sadsad kdsajdlak jdlaj dljl kadjl jadlsjl "
                    },
                    {
                        "type": "audio",
                        "label": "Audio",
                        "data": "According to Jain texts, Rishabhanatha was born in a king 's family in the age when there was happiness all around with no one needing to do any work because of Kalpavriksha (miraculous wish-fulfilling trees). Gradually as the cycle progressed, the efficacy of these trees decreased, people rushed to their king for help. Rishabhanatha is then said to have taught the men six main professions. These were: (1) Asi (swordsmanship for protection), (2) Masi (writing skills), (3) Krishi (agriculture), (4) Vidya (knowledge), (5) Vanijya (trade and commerce) and (6) Shilp (crafts). In other words, he is credited with introducing karma-bhumi (the age of action) by founding arts and professions to enable householders to sustain themselves. He is, in the Jain belief, the one who organized a social system that created the varna based on professions. According to Jain texts, Rishabhanatha was born in a king 's family in the age when there was happiness all around with no one needing to do any work because of Kalpavriksha (miraculous wish-fulfilling trees). Gradually as the cycle progressed, the efficacy of these trees decreased, people rushed to their king for help. Rishabhanatha is then said to have taught the men six main professions. These were: (1) Asi (swordsmanship for protection), (2) Masi (writing skills), (3) Krishi (agriculture), (4) Vidya (knowledge), (5) Vanijya (trade and commerce) and (6) Shilp (crafts). In other words, he is credited with introducing karma-bhumi (the age of action) by founding arts and professions to enable householders to sustain themselves. He is, in the Jain belief, the one who organized a social system that created the varna based on professions"
                    }
                ]
            },
            {
                "name": "bbbbbbbbb",
                "label": "bbbbbbbbb",
                "details": []
            },
            {
                "name": "ccccc",
                "label": "Aacccccccojacc",
                "details": []
            },
            {
                "name": "Aadddddd3243",
                "label": "Aadddddddja",
                "details": []
            },
            {
                "name": "Aafffffff4234",
                "label": "Afffffffja",
                "details": []
            },
            {
                "name": "gggggggg43",
                "label": "Aarggggggga",
                "details": []
            },
            {
                "name": "Aartgggggjjjjkkkkk4564",
                "label": "Aakkkhhhyyyyyyoja",
                "details": []
            }
        ]
    },
    {
        "name": "Bhajan/Bhakti",
        "label": "Bhajan/Bhakti"
    },
    {
        "name": "Chaalisa",
        "label": "Chaalisa"
    },
    {
        "name": "Sotra",
        "label": "Sotra"
    },
    {
        "name": "Paath",
        "label": "Paath"
    }
];
export default class App extends Component {

	render() {
        this.state = {};
        let deviceWidth = Dimensions.get('window').width;
        const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

					<Header
						title = {"Prayers"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/info.png')}
                        handleIconClick = {() => {navigation.navigate("TirthankarInfo", {})}}
                    />

                    <View style={{ backgroundColor: 'grey', height: 200 }}>
                        <Image source={require('../../images/prayer.jpeg')}
                            style={{
                                resizeMode: "cover",
                                height: 200,
                                width: deviceWidth
                            }}
                        />
                    </View>

					<View style={styles.content}>
                        {
                            data.map((item, index) => {
                                return (
                                    <TouchableOpacity key={item.name}
                                        onPress={() => {navigation.navigate("PrayersList", {params: item})}}>
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
    }
});
