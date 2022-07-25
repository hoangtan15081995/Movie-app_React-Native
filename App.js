import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Movie"
          component={MovieScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const headerStyle = {
//   title: "Movies",
//   headerStyle: { backgroundColor: Colors.BASIC_BACKGROUND },
//   headerTitleStyle: { color: Colors.WHITE },
// }
export default App;
