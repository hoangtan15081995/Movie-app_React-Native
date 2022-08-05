import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../services/config';
import { useDispatch, useSelector } from 'react-redux';
import { pushMovieToBookMark } from "../redux/features/bookMark/bookMarkSlice";

const { width } = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function MovieCard({ movie, onPress }) {
  const dispatch = useDispatch();
  const { bookMarkMovies } = useSelector(state => state.bookMark);
  let bookMark = bookMarkMovies || [];
  // console.log(bookMark, "book")
  let actionBookMark = bookMark.some((bookMovie) => bookMovie.id === movie.id);
  // const [actionBookMark, setActionBookMark] = useState(false);
  console.log(movie, "movie card")

  const handleBookMark = (movie) => {
    // console.log("ok", movie);
    dispatch(pushMovieToBookMark(movie));
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{uri: `${URL}${movie.poster_path}`}}
            style={{width: setWidth(35), height: 200, borderRadius: 10}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerText}>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.movieName}>{movie.original_title}</Text>
          </TouchableOpacity>
          <Text
            style={{ textAlign: 'left'}}>
            {movie.release_date} | {movie.original_language.toUpperCase()}
          </Text>

          <TouchableOpacity
            onPress={() => {
              // setActionBookMark(!actionBookMark);
              handleBookMark(movie);
            }}>
            {actionBookMark ? (
              <Icon name="heart" size={20} color="red" />
            ) : (
              <Icon name="heart-o" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize: 15}}>Vote: {movie.vote_average}/10</Text>
          <Text style={{fontSize: 15}}>Public</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginVertical: 20,
    marginHorizontal: 20,
    marginBottom: 20
    // backgroundColor: '#F0FFFF',
    // width: setWidth(100),
  },
  containerCard: {
    // backgroundColor: Colors.ACTIVE,
    // width: setWidth(50),
    // height: 300,
    marginRight: 20
  },
  containerText: {
    width: setWidth(65) - 60,
    // height: 300,
    // marginHorizontal: 10,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  movieName: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'black',
    textAlign: "left"
  },
});
export default MovieCard