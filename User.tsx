import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

let iconSize : number = 100;

export default class User {
    username: string;

    constructor(json: object) {
        
    }
}

export class Repository extends Component<{repository: Repo}> {
    propTypes: {
        repository: Repo,
        name: string,
    };

    componentDidMount() {

    }

    render() {
        if(!this.props) {
            return "no repo set";
        }
        
        let name : string = this.props.repository.name;
        
        return(
            <View style={styles.repoStyle}>
                <Text style={styles.h1}>{ name.length > 24 ? name.slice(0,20) + '...' : name }</Text>
                <View style={styles.flexText}>
                    <Text style={styles.h2}>Stars: { this.props.repository.stargazers_count }</Text>
                    <Text style={styles.h2}>Watchers: { this.props.repository.watchers_count }</Text>
                </View>
            </View>
        );
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

export class NullAvatar extends Component {
    //<Image source={require('assets/icon.png')}></Image>
    render() {
        return (
            <View>
                <Text style={styles.h1}>This user does not exist</Text>
                
            </View>
        )
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
        marginRight: 10,
        marginLeft: 10,
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
        marginLeft: '25%',
        marginBottom: 20,
        marginTop: 20,
        color: 'white',
    },
    icon: {
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