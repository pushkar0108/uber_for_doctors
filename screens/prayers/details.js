"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { ButtonGroup} from 'react-native-elements';

import Header from '../../components/header';

export default class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0
        };

        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    handleTypeChange(selectedIndex){
        this.setState({selectedIndex});
    }

	render() {
        const { navigation } = this.props;
        const params = navigation.getParam('params', {});

        let {selectedIndex} = this.state;
        let selectedType = params.details[selectedIndex] || {};

		return (
			<SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

					<Header 
						title = {params.label} 
						navigation = {navigation} />

					<View style={styles.content}>
                        <ButtonGroup
                            onPress={this.handleTypeChange}
                            selectedBackgroundColor="blue"
                            selectedIndex={selectedIndex}
                            buttons={params.details.map(item => item.label)}
                            containerStyle={{height: 30}}
                        />

                        <View>
                            <Text style={styles.info}>
                                Information
                            </Text>
                            <Text>{selectedType.data}</Text>
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

    info: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "600"
    }
});
