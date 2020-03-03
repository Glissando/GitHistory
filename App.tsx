import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Alert, Button, TextInput, StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, TouchableNativeFeedback, BackHandler } from 'react-native';
import User, { Repo, Owner, Repository, Avatar } from './components/user/User';
import { NotFoundError, InvalidError } from './components/error/Error';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { jStat } = require('jstat')

import ProgressBar from './components/progressbar/ProgressBar';
const Stack = createStackNavigator();
let user: User = null;

export default function App() {
    
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Search',
            headerStyle: {
              backgroundColor: '#3E206D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}

          />
            
            <Stack.Screen name="Project" component={Project}
            options={{title: 'Project',
            headerStyle: {
              backgroundColor: '#3E206D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
}

function Project({route, navigation}) {
  const { name } = route.params;
  const { repository } = route.params;
  return(
    <View style={styles.container}>
      <Text>{repository.name}</Text>
      <Button
        title="Back"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
    
  );
}

BackHandler.addEventListener('hardwareBackPress', function() {

  //navigation.navigate('Home');
});

function Home({navigation}) {
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
                
              <GitGraph name={value} navigation={navigation}></GitGraph>
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
    width: '100%'
  },

  repoStyle: {
    flex: 1,
    backgroundColor: '#fff',

  },

  textField: {
    color: 'white',
    height: 40, 
    width: '70%',
    borderColor: 'gray',
    backgroundColor: '#BE8ABF',
    borderWidth: 1, 
    marginTop: 50, 
    marginBottom: 10
  },

  button: {
    backgroundColor: '#BE8ABF',
  }
});


class GitGraph extends Component<{name: string, navigation: any}> {
  componentDidMount() {
    loadUserData(this.props.name, this);
    
  }

  state = {text: "", repos: Array<Repo>(), validUsername: true, finishedLoading: false};

  render() {
    /*
    if(this.state.text == "" || !this.state.repos[0]) {
      return null;
    }*/

    //loadUserData(this.props.name, this);
    let finishedLoading: boolean = this.state.finishedLoading;
    let validUsername: boolean = this.state.validUsername;
    return (
      
      <ScrollView>
          <Button
            title="Search"
            onPress={() => {
              let regex : RegExp = new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
              if(finishedLoading && regex.test(this.props.name)) {
                loadUserData(this.props.name, this);
              }
              else {
                this.setState(previousSate => (
                  { text: this.state.text, repos: this.state.repos, validUsername: false, finishedLoading: finishedLoading }
                ));
              }
            }}
          />
          
          {
            !validUsername && <InvalidError></InvalidError>
          }

          {
          this.state.repos[0] &&
          <Avatar repository={this.state.repos[0]}></Avatar>
          }
          
          {(this.state.repos[0]) && this.state.repos.map(repo => (
              <Repository key={repo.name} repository={repo} navigation={this.props.navigation}/>
          ))}
          
          {
            finishedLoading && !this.state.repos[0] && validUsername && <NotFoundError></NotFoundError>
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
        
        if(reposObject[0]){
          user = reposObject[0].name;
        }

        component.setState(previousSate => (
          { text: JSON.stringify(responseJson), repos: reposObject, validUsername: true, finishedLoading: true }
        ));
        component.forceUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
}
