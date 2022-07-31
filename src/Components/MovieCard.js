import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../services/config';
import { useDispatch, useSelector } from 'react-redux';
import { pushMovieToBookMark } from "../redux/features/bookMark/bookMarkSlice";

const { width } = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function MovieCard({ movie, index, onPress }) {
  const dispatch = useDispatch();
  const { bookMarkMovies } = useSelector(state => state.bookMark);
  let bookMark = bookMarkMovies || [];
  // console.log(bookMark, "book")
  let actionBookMark = bookMark.some((bookMovie) => bookMovie.id === movie.id);
  // const [actionBookMark, setActionBookMark] = useState(false);
  // console.log(movie)

  const handleBookMark = (movie) => {
    // console.log("ok", movie);
    dispatch(pushMovieToBookMark(movie));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerCard} onPress={onPress}>
        <Image
          source={{uri: `${URL}${movie.poster_path}`}}
          style={{width: setWidth(50), height: 300}}
        />
      </TouchableOpacity>
      <View style={styles.containerText}>
        <Text style={styles.movieName}> {index} - {movie.original_title}</Text>
        <Text style={{ fontSize: 15 }}>Date: {movie.release_date} </Text>
        <Text style={{ fontSize: 15 }}>Vote: {movie.vote_average}/10</Text>
        <TouchableOpacity onPress={() => {
          // setActionBookMark(!actionBookMark);
          handleBookMark(movie);
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
    marginVertical: 3,
    // marginHorizontal: 10,
    backgroundColor: '#F0FFFF',
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
    fontSize: 17,
    fontWeight: "bold",
    color: 'black',
  },
});
export default MovieCard