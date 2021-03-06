import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, Alert } from "react-native";
import Reply from '../greeting/Greeting';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

let iconSize : number = 100;

export default class User {
    username: string;

    constructor(json: object) {
        
    }
}

export class Repository extends Component<{repository: Repo, navigation: any}> {
    propTypes: {
        repository: Repo,
        name: string,
        data: Repo
    };

    componentDidMount() {

    }

    render() {
        if(!this.props) {
            return "no repo set";
        }
        
        let name : string = this.props.repository.name;
        
        return(
            <TouchableNativeFeedback
        onPress={this._onPressButton.bind(this)}
        background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.repoStyle}>
                <Text style={styles.h1}>{ name.length > 24 ? name.slice(0,20) + '...' : name }</Text>
                <View style={styles.flexText}>
                    <Text style={styles.h2}>Stars: { this.props.repository.stargazers_count }</Text>
                    <Text style={styles.h2}>Watchers: { this.props.repository.watchers_count }</Text>
                </View>
            </View>
            </TouchableNativeFeedback>
        );
    }

    _onPressButton() {
        if(this.props){
            this.props.navigation.navigate('Project', {name: 'Projects', repository: this.props.repository})
        }
    }
}

export class Avatar extends Component<{repository: Repo}> {
    render() {
        return (
        <View style={styles.avatar}>
            <Text style={styles.avatarText}>Hello there { this.props.repository.owner.login }!</Text>
            
            <Image source={{ uri: this.props.repository.owner.avatar_url }}
                style ={styles.icon} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    repoStyle: {
        flex: 1,
        backgroundColor: '#542276',
        margin: 5,
        borderRadius: 5,
        shadowRadius: 5,
    },
    avatarText: {
        color: '#fff',
        fontSize: 18,
        margin: 6,
        textAlign: 'center'
    },
    h1: {
        color: '#fff',
        fontSize: 18,
        margin: 6,
        marginRight: 10,
        marginLeft: 10,
        textAlign: 'center'
    },
    h2: {
        color: '#fff',
        fontSize: 12,
        margin: 5,
        marginRight: 10,
    },
    flexText: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginLeft: '25%'
    },
    avatar: {
        
        marginBottom: 20,
        marginTop: 20,
        color: 'white',
    },
    icon: {
        marginLeft: '32%',
        borderRadius: iconSize / 2,
        width: iconSize,
        height: iconSize
    }
  });

export interface Repo {
    owner: Owner,
    name: string,
    full_name: string,
    private: boolean,
    fork: boolean,
    html_url: string,
    url: string,
    id: string,
    node_id: string,
    watchers_count: number,
    forks_count: number,
    stargazers_count: number,
}
  
export interface Owner {
    login: string,
    id: number,
    url: string,
    html_url: string,
    avatar_url: string,
    repos_url: string,
    starred_url: string,
    followers_url: string,
    following_url: string,
}