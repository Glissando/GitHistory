import React, { Component } from 'react';
import { Alert, Button, TextInput, StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Repo, Owner, Repository, Avatar } from './User';


export default function App() {
    const [value, onChangeText] = React.useState('Glissando');    
    let input: string = 'Glissando';
    return(
      <View style={styles.container}>
        <TextInput
      style={ styles.textField }
      onChangeText={text => {
        onChangeText(text);
         }
      }
    value={value}
      />
      
        <GitGraph name={value}></GitGraph>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E206D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },

  repoStyle: {
    flex: 1,
    backgroundColor: '#fff',

  },

  textField: {
    color: 'white',
    height: 40, 
    borderColor: 'gray',
    backgroundColor: '#BE8ABF',
    borderWidth: 1, 
    marginTop: 50, 
    marginBottom: 10
  },

  button: {
    backgroundColor: '#BE8ABF'
  }
});


class GitGraph extends Component<{name: string}> {
  componentDidMount() {
    loadUserData(this.props.name, this);
    
  }

  state = {text: "", repos: Array<Repo>()};

  render() {
    /*
    if(this.state.text == "" || !this.state.repos[0]) {
      return null;
    }*/

    //loadUserData(this.props.name, this);

    return (
      <ScrollView>
          <Button
            title="Search"
            onPress={() => {
              loadUserData(this.props.name, this);
            }}
          />
          {
          (this.state.repos[0]) &&
          <Avatar repository={this.state.repos[0]}></Avatar>
          }
          
          {(this.state.repos[0]) && this.state.repos.map(repo => (
              <Repository key={repo.name} repository={repo} />
          ))}
          
          {
            (!this.state.repos[0]) && <Text>User does not Exist</Text>
          }
          
      </ScrollView>
    );
  }
}

function loadUserData(user: string, component: Component) {
  fetch(`https://api.github.com/users/${user}/repos`)
      .then((response) => response.json())
      .then((responseJson) => {
        component.setState({
          text: responseJson
        });

        let reposObject: Array<Repo> = responseJson;
        
        component.setState(previousSate => (
          { text: JSON.stringify(responseJson), repos: reposObject }
        ));
        component.forceUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
}
