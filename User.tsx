import { Component } from "react";

export default class User {
    username: string;

    constructor(json: object) {
        
    }
}

export class Repository extends Component {
    componentDidMount() {

    }

    render() {
        if(!this.props) {
            return "no repo set";
        }
        return( "hey" );
    }
}

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
  