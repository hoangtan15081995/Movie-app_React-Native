import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../services/config';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function MovieCard({ movie, onPress }) {
  const dispatch = useDispatch();
  const [actionBookMark, setActionBookMark] = useState(false);
  // console.log(movie)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerCard} onPress={onPress}>
        <Image
          source={{uri: `${URL}${movie.poster_path}`}}
          style={{width: setWidth(50), height: 300, borderRadius: 20}}
        />
      </TouchableOpacity>
      <View style={styles.containerText}>
        <Text style={styles.movieName}>{movie.original_title}</Text>
        <TouchableOpacity onPress={() => {
          setActionBookMark(!actionBookMark);
        }}>
          {actionBookMark ? (
             <Icon name="heart" size={20} color="red" />
          ): (     
             <Icon name="heart-o" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    width: setWidth(100),
    
  },
  containerCard: {
    // backgroundColor: Colors.ACTIVE,
    width: setWidth(50),
    height: 300,
    borderRadius: 12,
  },
  containerText: {
    width: setWidth(45),
    height: 300,
    marginHorizontal: 10,
  },
  movieName: {
    fontSize: 20,
    color: "black"
  },
});
export default MovieCard