import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text} from 'react-native';
import Home from './src/Home';
import Constants from './src/Constants';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: "center"}}>
        <Stack.Screen name="Home" component={Home} options={headerStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const headerStyle = {
  title: "Movies",
  headerStyle: { backgroundColor: Constants.baseColor },
  headerTitleStyle: { color: Constants.textColor },
}
export default App;
