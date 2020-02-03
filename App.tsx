import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Repo, Owner, Repository, Avatar } from './User';

export default class App extends Component {
  render() {
    const [value, onChangeText] = React.useState('Useless Placeholder');
    return(
      <View style={styles.container}>
        <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
      />
        <GitGraph></GitGraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E206D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  repoStyle: {
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
          <Avatar repository={this.state.repos[0]}></Avatar>
          
          {this.state.repos.map(repo => (
              <Repository key={repo.name} repository={repo} />
          ))}
      </ScrollView>
    );
  }
}

function loadUserData(user: Owner) {

}
