import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, StatusBar, Text, TouchableOpacity} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BookMarkScreen from './src/screens/BookMarkScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName='Home' >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="BookMark" component={BookMarkScreen} /> */}
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerTitleAlign: 'center'}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
              <Icon name="bars" size={25} color="black" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Icon name="filter" size={25} color="black" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (<Text style={{color: "black", fontSize: 20}}>MOVIES</Text>),
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
          headerShown: false,
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
  return (
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
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
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
