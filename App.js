import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookMarkScreen from './src/screens/BookMarkScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store/Store';

const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'MOVIES',
          headerStyle: {
            backgroundColor: '#151C26',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
          headerRight: () => (
            <TouchableOpacity>
              <Icon
                name="cog"
                size={30}
                color="white"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: () => (
            <Image
              source={require('./src/Images/home2.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookMark"
        component={BookMarkScreen}
        options={{
          title: 'BookMark List',
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#151C26',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
          tabBarIcon: () => (
            <Image
              source={require('./src/Images/bookmark.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // persistor.purge()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeTabs"
            screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen
              name="HomeTabs"
              component={MyTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Movie"
              component={MovieScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
