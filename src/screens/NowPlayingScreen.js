import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GirdLayout from '../Components/GirdLayout';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NoGirdLayout from '../Components/NoGirdLayout';
import MyLoader from '../Components/ContentLoader';

const {width, height} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;
const setHeight = h => (height / 100) * h;
const Tab = createMaterialTopTabNavigator();

function NowPlayingScreen({ navigation }) {

  const [layout, setLayout] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <Text style={{color: 'black', fontSize: 25, marginLeft: 20}}>
          {' '}
          Most popular
        </Text>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../Images/layout.png')}
            style={{width: 22, height: 22, marginRight: 20}}
          />
        </TouchableOpacity> */}
        {/* {layout ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('noGirdLayout');
              setLayout(false);
            }}>
            <Image
              source={require('../Images/layout.png')}
              style={{width: 22, height: 22, marginRight: 20}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('girdLayout');
              setLayout(true);
            }}>
            <Image
              source={require('../Images/layout.png')}
              style={{width: 22, height: 22, marginRight: 20}}
            />
          </TouchableOpacity>
        )} */}
        <TouchableOpacity
        >
          <Image
            source={require('../Images/layout.png')}
            style={{width: 22, height: 22, marginRight: 20}}
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator>
        <Tab.Screen
          name="noGirdLayout"
          component={NoGirdLayout}
          options={{
            tabBarStyle: {display: 'none'},
          }}
        />
        {/* <Tab.Screen
          name="girdLayout"
          component={GirdLayout}
          options={{
            tabBarStyle: {display: 'none'},
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default NowPlayingScreen


      // <Modal
      //     animationType="fade"
      //     transparent={true}
      //     visible={modalVisible}
      //     onRequestClose={() => {
      //       setModalVisible(!modalVisible);
      //     }}>
      //     <Pressable onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor: 'white', width: setWidth(100), height: setHeight(100), opacity: 0}}>
      //     </Pressable>
      //     <View style={{ opacity: 1, borderWidth: 1, borderColor: "black", width: setWidth(20), marginLeft: 27, marginTop: 70, position: "absolute", flexDirection: "row", justifyContent: "space-around"}}>
      //         <TouchableOpacity onPress={() => {navigation.navigate('noGirdLayout'); setModalVisible(!modalVisible)}}>
      //           {/* <Text>NoGirdLayout</Text> */}
      //           <Image
      //             source={require('../Images/nocolum.png')}
      //             style={{width: 20, height: 20}}
      //           />
      //         </TouchableOpacity>
      //         <TouchableOpacity onPress={() => {navigation.navigate('girdLayout'); setModalVisible(!modalVisible)}}>
      //           {/* <Text>GirdLayout</Text> */}
      //           <Image
      //             source={require('../Images/twocolums.png')}
      //             style={{width: 20, height: 20}}
      //           />
      //         </TouchableOpacity>
      //     </View>
      // </Modal>