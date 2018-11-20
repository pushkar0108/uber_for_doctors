"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class App extends Component {
	render() {
		let {title, subText, navigation, rightIconSource, handleIconClick, leftIconClickCb, rightIcon} = this.props;
		let leftCb = leftIconClickCb || navigation.goBack;

		return (
			<View style={styles.header}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                
                    <TouchableOpacity onPress={() => leftCb()}>
						<Icon
							name='chevron-left'
							type='entypo'
							size={30}
							color='#76323F' />
                    </TouchableOpacity>

                    <View style={{flex:1, justifyContent: "flex-start", paddingLeft: 10}}>
						{
							title && title.length && 
								<Text style={{ fontSize: 20 }}>
									{title.length > 20 ? `${title.substr(0, 20)}...` : title}
								</Text>
						}

						{
							subText && subText.length && 
								<Text style={{ fontSize: 10, color: "#696969" }}>
									{subText}
								</Text>
						}
                    </View>
					
					{
						rightIconSource && (
							<TouchableOpacity onPress={handleIconClick}>
								<Image source={rightIconSource} style={styles.rightIcon} />
							</TouchableOpacity>
						)
					}

					{
						rightIcon && (
							<TouchableOpacity onPress={handleIconClick}>
								{
									rightIcon
								}
							</TouchableOpacity>
						)
					}

                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#ffffff',
		height: 50,
		borderBottomWidth: 0.5,
		borderBottomColor: '#d6d7da',
	},
	rightIcon: {
		width: 25,
		height: 25,
		tintColor: "#76323F"
	}
});
