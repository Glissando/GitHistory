import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const replies : Replies = require('C:/Users/coda1/Documents/GitHistory/assets/replies.json');

class Reply extends Component<{name: string}> {
    stringFormat(str: string, arr: Array<string>) {
        return str.replace(
            /\{([0-9]+)\}/g,
            function (_, index) { return arr[index]; });
    }

    randomRange(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }
}

export default class Greeting extends Reply {
    
    render() {
        let greetings: Array<string> = replies.welcome;
        let r: number = this.randomRange(0, greetings.length);
        let reply: string = greetings[r];
        let name: string = this.props.name;
        return(
            <View>
                <Text>
                    { this.stringFormat(reply, [name]) }
                </Text>
            </View>
        );
    }
}

export interface Replies {
    welcome: Array<string>
}