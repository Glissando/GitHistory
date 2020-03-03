import React, { Component, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Constants from 'expo-constants';

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick(savedCallback) {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay, savedCallback);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  
  const App = () => {
    let animation = useRef(new Animated.Value(0));
    const [progress, setProgress] = useState(0);
    useInterval(() => {
      // update progress until 100
      if(progress < 100) {
        setProgress(progress + 1);
      }
    }, 1000);
  
    useEffect(() => {
      Animated.timing(animation.current, {
        toValue: progress,
        duration: 100
      }).start();
    },[progress])
  
    const width = animation.current.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })
  
    return (
      <View style={styles.container}>
        <Text>
          Loading…..
        </Text>
        <View style={styles.progressBar}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "#8BED4F", width }]}/>
        </View>
        <Text>
          {`${progress}%`}
        </Text>
  
      </View>
    );
  }

  export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        marginRight: '50%'
    },
    progressBar: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    text: {

    },
});  