"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

import Header from '../../components/header';

const data = [
    {
        "name": "Rishabhanatha (Adinatha)",
        "label": "Shri Rishabhanatha (Adinatha)",
        "info": "According to Jain texts, Rishabhanatha was born in a king 's family in the age when there was happiness all around with no one needing to do any work because of Kalpavriksha (miraculous wish-fulfilling trees). Gradually as the cycle progressed, the efficacy of these trees decreased, people rushed to their king for help. Rishabhanatha is then said to have taught the men six main professions. These were: (1) Asi (swordsmanship for protection), (2) Masi (writing skills), (3) Krishi (agriculture), (4) Vidya (knowledge), (5) Vanijya (trade and commerce) and (6) Shilp (crafts). In other words, he is credited with introducing karma-bhumi (the age of action) by founding arts and professions to enable householders to sustain themselves. He is, in the Jain belief, the one who organized a social system that created the varna based on professions.",
        "dataPoints": {
            "name": "Shri Rishabhanathji (Adinathji)",
            "symbol": "Bull",
            "age": "84 lakh purva years",
            "born": "ayodhya",
            "died": "mount asthapada",
            "father": "Nabhi",
            "mother": "Marudevi",
            "height": "1200 feet"
        }
    },
    {
        "name": "Ajitanatha",
        "label": "Shri Ajitanatha",
        "info": "Ajitnatha(lit.invincible) was the second tirthankara of the present age, avasarpini(half time cycle) according to Jainism. Ajitnatha was born in the town of Saketa to King Jitashatru and Queen Vijaya at Ayodhya in the Ikshvaku dynasty on magha - shukla - dashmi(the tenth day of the bright half of the month of Magha).His height was 450 dhanusha(1350 meters) and he lived for a span of 72 lakh purva. He attained kevala jnana under the sal tree and Moksha on chaitra - shukla - panchmi(fifth day of the bright half of the month of Chaitra) from Shikharji. Simhasena was his chief Ganadhara.",
        "dataPoints": {
            "name": "Shri Ajitanathaji",
            "symbol": "elephant",
            "age": "72 lakh purva years",
            "born": "ayodhya",
            "died": "shikarji",
            "father": "jitasatru",
            "mother": "vijayadevi",
            "height": "1350 metres"
        }
    },
    {
        "name": "Sambhavanatha",
        "label": "Shri Sambhavanatha",
        "info": "Sambhavanatha was the third tirthankara(omniscient Jain teacher) of the present age(Avasarpini).He was born to King Jitārī and Queen Susena at Sravasti in the Ikshvaku dynasty.His height was 400 dhanusa(1, 200 meters).Sambavanatha is associated with Horse emblem, Sala tree, Trimukha(three - faced) Yaksha and Prajnapthi & Duritari Yakshi. According to Jain text Uttarapurāṇa, Sambhavanatha possessed three types of knowledge from birth",
        "dataPoints": {
            "name": "Shri Sambhavanathji",
            "symbol": "horse",
            "age": "60 lakh purva years",
            "born": "shravasti",
            "died": "shikarji",
            "father": "Jitari",
            "mother": "susena",
            "height": "1200 metres"
        }
    },
    {
        "name": "Abhinandananatha",
        "label": "Shri Abhinandananatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Abhinandananathji",
            "symbol": "monkey",
            "age": "50 lakh purva years",
            "born": "ayodhya",
            "died": "shikarji",
            "father": "samvara",
            "mother": "siddhartha",
            "height": "1050 metres"
        }
    },
    {
        "name": "Sumatinatha",
        "label": "Shri Sumatinatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Sumatinathji",
            "symbol": "goose",
            "age": "40 lakh purva years",
            "born": "ayodhya",
            "died": "shikarji",
            "father": "megharatha",
            "mother": "sumangala",
            "height": "900 metres"
        }
    },
    {
        "name": "Padmaprabha",
        "label": "Shri Padmaprabha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Padmaprabhaji",
            "symbol": "lotus",
            "age": "30 lakh purva years",
            "born": "kaushambi, UP",
            "died": "shikarji",
            "father": "sridhara",
            "mother": "susima",
            "height": "750 metres"
        }
    },
    {
        "name": "Suparshvanatha",
        "label": "Shri Suparshvanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Suparshvanathji",
            "symbol": "swastika",
            "age": "20 lakh purva years",
            "born": "varanasi",
            "died": "shikarji",
            "father": "pratishtha",
            "mother": "prithivi",
            "height": "600 metres"
        }
    },
    {
        "name": "Chandraprabha",
        "label": "Shri Chandraprabha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Chandraprabhaji",
            "symbol": "crescent moon",
            "age": "10 lakh purva years",
            "born": "chandrapuri",
            "died": "shikarji",
            "father": "mahasena",
            "mother": "sulakshana devi",
            "height": "450 metres"
        }
    },
    {
        "name": "Pushpadanta (Suvidhinath)",
        "label": "Shri Pushpadanta (Suvidhinath)",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Pushpadantaji",
            "symbol": "crocodile",
            "age": "2 lakh purva years",
            "born": "khukhundoo, Deoria",
            "died": "shikarji",
            "father": "Sugriva",
            "mother": "rama supriya",
            "height": "300 metres"
        }
    },
    {
        "name": "Shitalanatha",
        "label": "Shri Shitalanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri shitalanathaji",
            "symbol": "Kalpavriksha(Wishing Tree)",
            "age": "1 lakh purva years",
            "born": "ayodhya",
            "died": "shikarji",
            "father": "dridharatha",
            "mother": "sunanda",
            "height": "270 metres"
        }
    },
    {
        "name": "Shreyanasanatha",
        "label": "Shri Shreyanasanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Shreyanasanthji",
            "symbol": "rhinoceros",
            "age": "84 lakh years",
            "born": "sarnath",
            "died": "shikarji",
            "father": "vishnu",
            "mother": "vishnudri",
            "height": "240 metres"
        }
    },
    {
        "name": "Vasupujya",
        "label": "Shri Vasupujya",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Vasupujyaji",
            "symbol": "buffalo",
            "age": "7.2 lakh years",
            "born": "champapur",
            "died": "champapur",
            "father": "vasupujya",
            "mother": "Jaya(Vijaya)",
            "height": "210 metres"
        }
    },
    {
        "name": "Vimalanatha",
        "label": "Shri Vimalanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Vimalanathji",
            "symbol": "boar",
            "age": "60 lakh years",
            "born": "kampilya",
            "died": "shikarji",
            "father": "kritvarman",
            "mother": "suramya",
            "height": "180 metres"
        }
    },
    {
        "name": "Anantanatha",
        "label": "Shri Anantanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Anantanathaji",
            "symbol": "porcupine",
            "age": "30 lakh years",
            "born": "ayodhya",
            "died": "shikarji",
            "father": "simhasena",
            "mother": "suyasha",
            "height": "150 metres"
        }
    },
    {
        "name": "Dharmanatha",
        "label": "Shri Dharmanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Dharmanathaji",
            "symbol": "vajra",
            "age": "25 lakh years",
            "born": "ratnapuri",
            "died": "shikarji",
            "father": "bhanu",
            "mother": "suvrata",
            "height": "135 metres"
        }
    },
    {
        "name": "Shantinatha",
        "label": "Shri Shantinatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Shantinathaji",
            "symbol": "deer",
            "age": "over 7 lakh years",
            "born": "hastinapur",
            "died": "shikarji",
            "father": "visvasena",
            "mother": "achira",
            "height": "120 metres"
        }
    },
    {
        "name": "Kunthunatha",
        "label": "Shri Kunthunatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Kunthunathaji",
            "symbol": "goat",
            "age": "over 95,000 years",
            "born": "hastinapur",
            "died": "shikarji",
            "father": "surya",
            "mother": "sri devi",
            "height": "105 metres"
        }
    },
    {
        "name": "Aranatha",
        "label": "Shri Aranatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Aranathaji",
            "symbol": "fish",
            "age": "over 84,000 years",
            "born": "hastinapur",
            "died": "shikarji",
            "father": "sudarsana",
            "mother": "devi(Mitra)",
            "height": "90 metres"
        }
    },
    {
        "name": "Māllīnātha",
        "label": "Shri Māllīnātha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Mallinathaji",
            "symbol": "urn or Kalasa",
            "age": "56,000 years",
            "born": "ayodhya",
            "died": "shikarji",
            "father": "kumbha",
            "mother": "rakshita",
            "height": "75 metres"
        }
    },
    {
        "name": "Munisuvrata",
        "label": "Shri Munisuvrata",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Munisuvrataji",
            "symbol": "tortoise",
            "age": "over 30,000 years",
            "born": "rajgir",
            "died": "shikarji",
            "father": "sumitra",
            "mother": "padmavatii",
            "height": "60 metres"
        }
    },
    {
        "name": "Naminatha",
        "label": "Shri Naminatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Naminathaji",
            "symbol": "Blue Water - Lilly or Blue Lotus",
            "age": "10,000 years",
            "born": "mithila",
            "died": "shikarji",
            "father": "vijaya",
            "mother": "vapra",
            "height": "45 metres"
        }
    },
    {
        "name": "Neminatha",
        "label": "Shri Neminatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Neminathaji",
            "symbol": "shankha",
            "age": "1000 years",
            "born": "dwarika",
            "died": "mount girnar",
            "father": "samudravijaya",
            "mother": "shivadevi",
            "height": "98 feet"
        }
    },
    {
        "name": "Parshvanatha",
        "label": "Shri Parshvanatha",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Parshvanathaji",
            "symbol": "snake",
            "age": "100 years",
            "born": "varanasi",
            "died": "shikarji",
            "father": "ashvasena",
            "mother": "vamadevi",
            "height": "13.5 feet"
        }
    },
    {
        "name": "Mahavira",
        "label": "Shri Mahavira",
        "info": "to be added",
        "dataPoints": {
            "name": "Shri Mahaviraji",
            "symbol": "lion",
            "age": "72 years",
            "born": "vaishali, Bihar",
            "died": "pawapuri, Bihar",
            "father": "siddhartha",
            "mother": "trishala",
            "height": "10.5 feet"
        }
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
						title = {"Tirthankar"} 
						navigation = {navigation} 
                        rightIconSource = {require('../../images/info.png')}
                        handleIconClick = {() => {navigation.navigate("TirthankarInfo", {})}}
                    />

                    <View style={{ backgroundColor: 'grey', height: 150 }}>
                        <Image source={require('../../images/tirthankar.jpeg')}
                            style={{
                                resizeMode: "cover",
                                height: 150,
                                width: deviceWidth
                            }}
                        />
                    </View>

					<View style={styles.content}>
                        {
                            data.map((item, index) => {
                                return (
                                    <TouchableOpacity key={item.name}
                                        onPress={() => {navigation.navigate("TirthankarDetails", {params: item})}}>
                                        <View style={styles.entryContainer}>
                                            <View>
                                                <Image source={require('../../images/idol.png')} style={styles.idol} />
                                            </View>
                                            <View>
                                                <Text style={styles.textMsgIndex}>{index + 1}.</Text>
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
    }
});
