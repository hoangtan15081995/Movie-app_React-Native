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
import {pushMovieToBookMark} from '../redux/features/bookMark/bookMarkSlice';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function TheFirstMovieCard({movie, onPress}) {
  const dispatch = useDispatch();
  const {bookMarkMovies} = useSelector(state => state.bookMark);
  let bookMark = bookMarkMovies || [];
  let actionBookMark = bookMark.some(bookMovie => bookMovie.id === movie.id);
  console.log(movie)

  const handleBookMark = movie => {
    dispatch(pushMovieToBookMark(movie));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: `${URL}${movie.backdrop_path}`}}
          style={{width: setWidth(100), height: 230}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          width: setWidth(100),
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.movieName}>{movie.original_title}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", width: setWidth(100)}}>
        <TouchableOpacity
          onPress={() => {
            handleBookMark(movie);
          }}>
          {actionBookMark ? (
            <Icon name="heart" size={20} color="red" />
          ) : (
            <Icon name="heart-o" size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row", width: setWidth(100), justifyContent: "space-around"}}>
        <Text style={{fontSize: 15}}>Date: {movie.release_date} </Text>
        <Text style={{fontSize: 15}}>Vote: {movie.vote_average}/10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#F0FFFF',
    width: setWidth(100),
    marginBottom: 3,
    marginTop: 5
  },
  movieName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default TheFirstMovieCard;
