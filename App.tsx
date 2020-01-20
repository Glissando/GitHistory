import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Repo, Owner } from './User';

export default class App extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>This is an application made to learn React!</Text>
        <GitGraph></GitGraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  itemStyle: {
    flex: 1,
    backgroundColor: '#fff',

  },
});


class GitGraph extends Component {
  componentDidMount() {

    fetch("https://api.github.com/users/Glissando/repos")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          text: responseJson
        });

        let reposObject: Array<Repo> = responseJson;
        
        this.setState(previousSate => (
          { text: JSON.stringify(responseJson), repos: reposObject }
        ));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  state = {text: "", repos: Array<Repo>()};

  render() {
    if(this.state.text == "" || !this.state.repos[0]) {
      return null;
    }
    
    return (
    <ScrollView>
      <Text>Hello there { this.state.repos[0].owner.login }!</Text>
      <Image source={{ uri: this.state.repos[0].owner.avatar_url }} />
    </ScrollView>
    );
  }
}

function loadUserData(user: Owner) {

}