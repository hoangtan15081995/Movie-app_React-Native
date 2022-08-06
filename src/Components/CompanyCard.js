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
import {addListener} from '@reduxjs/toolkit';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function CompanyCard({company}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={{width: setWidth(40), textAlign: 'center', color: 'black'}}>
        {company.name.length > 13 ? company.name.slice(0, 12) + '..' : company.name}
      </Text>
      <Image
        source={{uri: `${URL}${company.logo_path}`}}
        style={{
          width: setWidth(20),
          height: setWidth(20),
          resizeMode: 'stretch',
        }}
      />
      <Text style={{width: setWidth(27), textAlign: 'center', color: 'black'}}>
        {company.origin_country}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: setWidth(35),
    // height: 500,
    // borderWidth: 1,
    // borderColor: "black",
    // justifyContent: "center",
    alignItems: 'center',
  },
});

export default CompanyCard;
