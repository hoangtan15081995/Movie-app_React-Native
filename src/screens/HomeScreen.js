import React from 'react';
import {StyleSheet, Dimensions, Text } from 'react-native';
import Colors from '../constants/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NowPlayingScreen from './NowPlayingScreen';
import PopularScreen from './PopularScreen';


const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;
const Tab = createMaterialTopTabNavigator();

function HomeScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="nowPlaying"
          component={NowPlayingScreen}
          options={{
            title: ({color, focused}) => (
              <Text style={{color: focused ? 'blue' : 'black', fontSize: 13}}>
                NOW PLAYING
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Popular"
          component={PopularScreen}
          options={{
            title: ({color, focused}) => (
              <Text style={{color: focused ? 'blue' : 'black', fontSize: 13}}>
                POPULAR
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
});

export default HomeScreen;
