import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {URL} from '../services/config';
import {useDispatch, useSelector} from 'react-redux';
import { addListener } from '@reduxjs/toolkit';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function CastCard({cast}) {
  const dispatch = useDispatch();



  return (
    <View style={styles.container}>
      <Text style={{width: setWidth(27),  textAlign: "center"}}>{cast.name.length > 13? cast.name.slice(0,12) + ".." : cast.name}</Text>
      <Image
        source={{uri: `${URL}${cast.profile_path}`}}
        style={{width: setWidth(20), height: setWidth(20), borderRadius: 100}}
      />
      <Text style={{width: setWidth(27),  textAlign: "center", color: "black"}}>{cast.character.length > 13 ? cast.character.slice(0,12) + "..." : cast.character}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: setWidth(30),
    // borderWidth: 1,
    // borderColor: "black",
    // justifyContent: "center",
    alignItems: "center"
  },
});


export default CastCard;
