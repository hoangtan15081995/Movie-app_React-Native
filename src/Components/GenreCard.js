import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Color';

const { width } = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function GenreCard({genreName, index, active, onPress}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active ? Colors.ACTIVE : Colors.WHITE,
      }}
      onPress={() => onPress(genreName)}>
      <Text
        key={index}
        style={{
          ...styles.genreText,
          color: active ? Colors.WHITE : Colors.BLACK,
        }}>
        {genreName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    marginHorizontal: 10,
    width: setWidth(25),
  },
  genreText: {
    fontSize: 13,
    color: Colors.BLACK,
  },
});

export default GenreCard