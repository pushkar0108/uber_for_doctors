"use strict";

import React, { Component } from 'react';
import Sound from 'react-native-sound';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

const requireAudio = require('../assets/navkar.mp3');
const options = [
    {
        label: "Cancel",
        value: "cancel"
    },
    {
        label: "1 Time",
        value: 0
    },
    {
        label: "3 Time",
        value: 2
    },
    {
        label: "5 Time",
        value: 4
    },
    {
        label: "7 Time",
        value: 6
    },
    {
        label: "11 Time",
        value: 10
    },
    {
        label: "Loop",
        value: -1
    }
];


export default class App extends Component {

    constructor(props) {
        super(props);
        this.soundInstance = null;
        this.state = {
            loopCount: options[options.length-1].label,
            status: "initiated"
        };

        this.showActionSheet = this.showActionSheet.bind(this);
        this.handleLoopCount = this.handleLoopCount.bind(this);
        this.togglePlayAction = this.togglePlayAction.bind(this);
    }

    togglePlayAction(){
        let {status} = this.state;

        console.log("####### togglePlayAction,  status: ", status);

        switch(status){
            case "initiated": 
                this.showActionSheet();
                break;
            case "playing": 
                this.pauseSound();
                break;
            case "paused": 
                this.playSound();
                break;
        }
    }

    handleLoopCount(index) {
        let selectedOption = options[index];

        if(selectedOption.value === "cancel"){
            return;
        }
        
        this.soundInstance.setNumberOfLoops(selectedOption.value);
        this.playSound();

        this.setState({
            loopCount: selectedOption.label,
            status: "playing"
        });
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    playSound(){
        console.log("####### inside playSound ");

        // loaded successfully, Play the sound with an onEnd callback
        this.soundInstance.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                // reset the player to its uninitialized state (android only)
                // this is the only option to recover after an error occured and use the player again
                this.soundInstance.reset();
            }
        });

        this.setState({
            status: "playing"
        });
    }

    pauseSound(){
        console.log("####### inside pauseSound ");

        // Pause the sound
        this.soundInstance.pause();

        this.setState({
            status: "paused"
        });
    }

    componentDidMount() {
        // Enable playback in silence mode
        Sound.setCategory('Playback');

        this.soundInstance = new Sound(requireAudio, (error) => {
            if (error) {
                console.log('############# failed to load the sound', error);
                return;
            }

            let audioInfo = {
                "duration in seconds": this.soundInstance.getDuration(),
                "number of channels": this.soundInstance.getNumberOfChannels(),
                "volume": this.soundInstance.getVolume(),
                "pan": this.soundInstance.getPan(),
                "loops": this.soundInstance.getNumberOfLoops()
            };

            console.log(" -------- audioInfo: ", audioInfo);
        });

        // // Reduce the volume by half
        // whoosh.setVolume(0.5);

        // // Position the sound to the full right in a stereo field
        // whoosh.setPan(1);
    }

    render() {
        let {status} = this.state;
        return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' }}>

                {
                    (status === "initiated" || status === "paused") && (
                        <TouchableOpacity onPress={this.togglePlayAction}>
                            <Image source={require('../images/play.png')} style={styles.pausePlayButton} />
                        </TouchableOpacity>
                    )
                }

                {
                    status === "playing" && (
                        <TouchableOpacity onPress={this.togglePlayAction}>
                            <Image source={require('../images/pause.png')} style={styles.pausePlayButton} />
                        </TouchableOpacity>
                    )
                }

                <TouchableOpacity onPress={this.showActionSheet} style={{flexDirection: "row"}}>
                    <Image source={require('../images/loop.png')} style={styles.loopButton} />
                    <Text style={styles.loopCount}>{this.state.loopCount}</Text>
                </TouchableOpacity>
                
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{ color: '#000', fontSize: 18 }}>How many times you want to play?</Text>}
                    options={options.map(option => option.label)}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={4}
                    onPress={this.handleLoopCount}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pausePlayButton: {
        tintColor: "white",
        height: 50,
        width: 50
    },

    loopButton: {
        tintColor: "white",
        height: 30,
        width: 30
    },

    loopCount: {
        fontSize: 15,
        color: "white",
        padding: 10
    }
});