import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import {Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookMarkScreen from './src/screens/BookMarkScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/redux/store/Store';
import SettingScreen from './src/screens/SettingScreen';

const Tab = createBottomTabNavigator();
// const [bookmark, setBookmark] = useState(false);

function MyTabs({ navigation }) {
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
          // headerShown: false,
          title: 'Home',
          // headerStyle: {
          //   backgroundColor: '#151C26',
          // },
          // headerTitleStyle: {
          //   color: 'black',
          // },
          headerRight: () => (
            // <TouchableOpacity>
            //   <Icon
            //     name="filter"
            //     size={30}
            //     style={{marginRight: 10}}
            //     onPress={() => navigation.navigate('Setting')}
            //   />
            // </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Image
                source={require('./src/Images/filter.png')}
                style={{width: 20, height: 20, marginRight: 20}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({color, focused}) => (
            //  focused? setBookmark(true) : setBookmark(false),
            <Icon name="home" size={26} color={focused ? 'blue' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={BookMarkScreen}
        options={{
          title: 'Search',
          headerShown: false,
          // headerStyle: {
          //   backgroundColor: '#151C26',
          // },
          headerTitleStyle: {
            color: 'black',
          },
          tabBarIcon: ({color, focused}) => (
            <Icon name="search" size={26} color={focused ? 'blue' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="BookMark"
        component={BookMarkScreen}
        options={{
          title: 'Bookmark list',
          // headerShown: false,
          // headerStyle: {
          //   backgroundColor: '#151C26',
          // },
          headerTitleStyle: {
            color: 'black',
          },
          tabBarIcon: ({color, focused}) => (
            <Icon name="bookmark" size={26} color={focused ? 'blue' : color} />
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
              options={{
                headerShown: false,
                title: 'Home',
                headerTitleStyle: {
                  color: 'black',
                },
                // headerRight: () => (
                //   <TouchableOpacity
                //     onPress={() => navigation.navigate('Setting')}>
                //     <Image
                //       source={require('./src/Images/filter.png')}
                //       style={{width: 22, height: 22, marginRight: 20}}
                //     />
                //   </TouchableOpacity>
                // ),
              }}
            />
            <Stack.Screen
              name="Movie"
              component={MovieScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
