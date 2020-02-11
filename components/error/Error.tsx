import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Error extends Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}

export class NotFoundError extends Component {
    //<Image source={require('assets/icon.png')}></Image>
    render() {
        return (
            <View>
                <Text style={styles.error}>This user does not exist</Text>
                
            </View>
        )
    }
}

export class InvalidError extends Component {
    render() {
        return (
            <View>
                <Text style={styles.error}>Invalid username</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 18,
        margin: 6,
        marginRight: 10,
        marginLeft: 10,
        textAlign: 'center'
    },
});