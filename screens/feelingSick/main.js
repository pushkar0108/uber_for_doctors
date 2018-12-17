"use strict";

import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Icon } from 'react-native-elements';

import Header from '../../components/header';
import NoData from '../../components/noData';
import DSAuth from '../../dataServices/auth';

const docCategories = [
    {
        name: "cancel",
        label: "Cancel"
    },
    {
        name: "familyMed",
        label: "Family Medicine",
    },
    {
        name: "familyMed2",
        label: "Psychiatrist",
    },
    {
        name: "familyMed3",
        label: "Allergist",
    },
    {
        name: "familyMed4",
        label: "Cardiologist",
    },
    {
        name: "familyMed2",
        label: "ENT",
    },
    {
        name: "familyMed3",
        label: "Emergency",
    }
];

export default class App extends Component {

    constructor(props) {
        super(props);

        this.showActionSheet = this.showActionSheet.bind(this);
        this.handleSelectedAction = this.handleSelectedAction.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.getDoctorList = this.getDoctorList.bind(this);
        this.getDocCard = this.getDocCard.bind(this);
        this.getHeading = this.getHeading.bind(this);

        this.state = {
            doctors: {},
            selectedDoctorCategory: docCategories[1],
            refreshing: false
        };
    }

    componentDidMount() {
        this.getDoctorList();

        this.intervalId = setInterval(() => {
            this.getDoctorList();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getDoctorList() {
        let { selectedDoctorCategory } = this.state;
        let params = {
            selectedDoctorCategory: selectedDoctorCategory
        };

        return DSAuth.getDoctorList({ params })
            .then(response => {
                this.setState({ doctors: response || {} });
            })
            .catch(error => {
                console.log("##### [main.js] Error in fetching doctor list, error: ", error);
            });
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    handleSelectedAction(index) {
        const { navigation } = this.props;
        let selectedDoctorCategory = docCategories[index];

        if(selectedDoctorCategory.name === "cancel"){
            return;
        }
        
        this.setState({
            selectedDoctorCategory: selectedDoctorCategory
        }, () => {
            this.getDoctorList();
        });
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getDoctorList()
            .finally(() => {
                this.setState({refreshing: false});
            });
    }

    getDocCard(doctor) {
        const { navigation } = this.props;

        return (
            <TouchableOpacity key={doctor.pcpId}
                onPress={() => {
                    return navigation.navigate("RequestDoc", {params: {
                        selectedDoc: doctor
                    }});
                }}>
                <View style={styles.entryContainer}>
                    <View>
                        <Icon
                            iconStyle={styles.idol}
                            name='user'
                            type='entypo'
                            size={35}
                            color='#d6d7da' />
                    </View>
                    <View>

                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textMsg}>
                                {doctor.name}
                            </Text>

                            <Icon
                                name='star-outlined'
                                type='entypo'
                                size={15}
                                color='brown' />
                            <Icon
                                name='star-outlined'
                                type='entypo'
                                size={15}
                                color='brown' />
                            <Icon
                                name='star-outlined'
                                type='entypo'
                                size={15}
                                color='brown' />
                        </View>

                        <Text>copay - {doctor.copay}</Text>
                        <Text>price - {doctor.price}</Text>
                        <Text>speciality - {doctor.speciality}</Text>
                    </View>
                    <View style={{marginLeft: "auto", flexDirection: "row"}}>
                        {
                            doctor.is_online && (
                                <Icon
                                    name='dot-single'
                                    type='entypo'
                                    size={40}
                                    color='green'
                                    iconStyle = {{
                                        marginLeft: 10
                                    }}
                                />
                            )
                        }

                        <Icon
                            name='chevron-right'
                            type='entypo'
                            size={23}
                            color='#d6d7da' />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getHeading(category) {
        return (
            <View style={{
                fontSize: 20,
                fontFamily: 'Gill Sans',
                textAlign: 'left',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                alignSelf: "center",
                backgroundColor: "#d6d7da",
                paddingTop: 2,
                paddingBottom: 2
            }}>
                <Text>
                {category.head}
                </Text>
            </View>
        );
    }

	render() {
        let {doctors = {}} = this.state;
        let {pcp = {}, cir = {}, oth = {}} = doctors;
        const { navigation } = this.props;
        let { selectedDoctorCategory } = this.state;

		return (
			<SafeAreaView style={styles.content}>
					<Header
						title = {selectedDoctorCategory.label} 
						navigation = {navigation} 
                        rightIcon = {<Icon
                                        iconStyle={styles.idol}
                                        name='chevron-down'
                                        type='entypo'
                                        size={35}
                                        color='#76323F' />}
                        handleIconClick = {() => {
                            return this.showActionSheet();
                        }}
                    />

                    <ActionSheet
                        ref = {o => this.ActionSheet = o}
                        // title = {<Text style={{ color: '#000', fontSize: 18 }}></Text>}
                        options = {docCategories.map(option => option.label)}
                        cancelButtonIndex = {0}
                        destructiveButtonIndex = {0}
                        onPress = {this.handleSelectedAction}
                    />

                    {
                        !doctors ? <NoData /> :

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

                                <TouchableOpacity
                                    onPress={() => {
                                        return navigation.navigate("RequestDoc", {params: {}});
                                    }}>
                                    <View style={styles.entryContainer}>
                                        <View style={{justifyContent: "center", flexDirection: "row", flex:1, alignItems: 'baseline'}}>
                                            <Icon
                                                iconStyle={{
                                                    marginRight: 10
                                                }}
                                                name='medkit'
                                                type='font-awesome'
                                                size={30}
                                                color='green' />

                                            <Text style={{
                                                color: 'green',
                                                fontSize: 17,
                                                fontWeight: "600"
                                            }}>{"Quick Visit"}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                {this.getHeading(pcp)}
                                {
                                    pcp.list && pcp.list.map((doctor, index) => {
                                        return this.getDocCard(doctor);
                                    })
                                }

                                {this.getHeading(cir)}
                                {
                                    cir.list && cir.list.map((doctor, index) => {
                                        return this.getDocCard(doctor);
                                    })
                                }

                                {this.getHeading(oth)}
                                {
                                    oth.list && oth.list.map((doctor, index) => {
                                        return this.getDocCard(doctor);
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

        borderTopWidth: 0.8,
        borderTopColor: '#d6d7da',

        alignItems: "center"
    },

    idol: {
        marginRight: 10
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
