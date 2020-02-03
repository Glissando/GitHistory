import React, { Component, Fragment } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

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
        
        return(
            <View style={styles.repoStyle}>
                <Text style={styles.h1}>{ this.props.repository.name }</Text>
                <Text style={styles.h1}>Stars: { this.props.repository.stargazers_count }</Text>
                <Text style={styles.h1}>Watchers: { this.props.repository.watchers_count }</Text>
            </View>
        );
    }
}

export class Avatar extends Component<{repository: Repo}> {
    render() {
        return (
        <View>
            <Text>Hello there { this.props.repository.owner.login }!</Text>
            <Image source={{ uri: this.props.repository.owner.avatar_url }}
                style ={{width: 100, height: 100}} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  
    repoStyle: {
        flex: 1,
        backgroundColor: '#916dd5',
        margin: 5,
        borderRadius: 5,
        
        shadowRadius: 5,
    },
    h1: {
        color: '#fff',
    },
    avatar: {
        backgroundColor: '#916dd5',
        margin: 3,
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