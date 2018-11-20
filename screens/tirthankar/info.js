"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import Header from '../../components/header';

export default class App extends Component {

	render() {
        const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.container}>
                <Header 
                    title = {"Tirthankar Info"} 
                    navigation = {navigation} 
                />
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

					<View style={styles.content}>
                        <Text style={styles.textMsg}>
                            Time rolls along in eternal cycles of rise and decline. Utsarpini is a ìrisingî era in which human morale and natural conditions improve over time. At the end of Utsarpini, begins Avasarpini, a ìdecliningî era of the same length, in which human morale and virtues deteriorate. During the middle of every rising and declining era twenty-four souls become Tirthankaras. They are the humans like us who rise to that level. While accumulating different karmas, they also accumulate get a special karma called Tirthankar Nam Karma in the last 3rd of their life by performing one or more of the 20 special austerities. Tirthankar Nam Karma matures in the final life and leads the person to become a Tirthankara. After attaining omniscience, Tirthankara reorganize Jain religion to suit the changing times. Tirthankaras are also called Arihantas, Jinas, Kevalis, and Vitragi. Arihant means ìdestroyer of inner enemies,î Jina means ìvictor of inner enemies,î and vitragi means ìone who does not have anymore attachment or hatred towards anyone.î This means that they are totally detached from worldly aspects. They have destroyed the four ghati karmas, namely Jnanavarniya Karma, Darshanavarniya Karma, Mohniya Karma, and Antaraya Karma. They are Kevaljnani meaning that they know everything everywhere that happened in the past, that is happening now, and that will happen in the future at the same time. They are also Kevaldarshani, meaning that they can see all that happened in the past, that is happening now, and that will happen in the future all at the same time. They reinstate the fourfold order of sadhus (monks), sadhvis (nuns), shravaks (male householders), and shravikas (female householders). Jains celebrate five major events in the life of a Tirthankar. They are called Kalyanak (auspicious events). They are: Chyavana Kalyanak ñ This is the event when the Tirthankarís soul departs from its last life, and is conceived in the motherís womb.
                            Janma Kalyanak ñ This is the event when the Tirthankarís soul is born.
                            Diksha Kalyanak ñ This is the event when the Tirthankarís soul gives up all his/her worldly possessions and becames a monk/nun. (Digambar sect does not believe that women can become Tirthankar or be liberated.)
                            Kevaljnana Kalyanak ñ This is event when Tirthankarís soul destroys the four ghati karmas completely and attains the Kevaljnana (absolute knowledge). Celestial angels set Samavsaran for Tirthankars from where he/she delivers the first sermon. This is the most important event for the entire Jain order as the Tirthankar reinstates Jain Sangh and preaches the Jain path of purification and liberation.
                            Nirvana Kalyanak ñ This event is when a Tirthankarís soul is liberated from this worldly physical existence forever and becomes a Siddha. On this day, the Tirthankarís soul destroys the four aghati karmas completely, and attains salvation, the state of eternal bliss.
                            There are other significant events also in the final life of a Tirthankars. When a Tirthankarís soul is conceived, his/her mother has fourteen dreams (some texts mention sixteen dreams). A Tirthankarís soul, while even in motherís womb, has three types of knowledge, namely Matijnan, Shrutjnan, and Avadhijnan. One year before the time of renunciation, a group of celestial angels come to pay homage to the future Tirthankar. They remind him/her that the time to renounce the world is arriving. When a Tirthankar renounces the worldly life, he attains Manahparyavjnan, the fourth type of the knowledge, which enables him/her to know peopleís thoughts.
                        </Text>
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
    
    entryContainer: {
        padding: 15,
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 0.8,
        borderBottomColor: '#d6d7da',
        alignItems: "flex-start"
    },

    textMsgIndex: {
        fontWeight: "600",
        fontSize: 20,
        minWidth: 40
    },

    textMsgDataPoint: {
        fontWeight: "600",
        fontSize: 20,
        minWidth: 70
    },

    textMsg: {
        fontSize: 15
    }
});
