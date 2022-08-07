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

function MovieGirdCard({movie, onPress, numColumns}) {
  const dispatch = useDispatch();
  const {bookMarkMovies} = useSelector(state => state.bookMark);
  let bookMark = bookMarkMovies || [];
  // console.log(bookMark, "book")
  let actionBookMark = bookMark.some(bookMovie => bookMovie.id === movie.id);
  // const [actionBookMark, setActionBookMark] = useState(false);
  // console.log(movie, "movie card")

  const handleBookMark = movie => {
    // console.log("ok", movie);
    dispatch(pushMovieToBookMark(movie));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          // borderWidth: 1,
          // borderColor: 'black',
          // width: setWidth(40),
          // paddingLeft:20
        }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{uri: `${URL}${movie.poster_path}`}}
            style={{width: setWidth(50) - 20, height: 200, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerText}>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.movieName}>{movie.original_title}</Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'center'}}>
            {movie.release_date} | {movie.original_language}
          </Text>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              // setActionBookMark(!actionBookMark);
              handleBookMark(movie);
            }}>
            {actionBookMark ? (
              <Icon name="heart" size={15} color="red" />
            ) : (
              <Icon name="heart-o" size={15} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Vote: {movie.vote_average}/10
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>Public</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // marginVertical: 20,
    // marginHorizontal: 20,
    // marginBottom: 20,
    // borderWidth: 1,
    // borderColor: 'black',
    marginBottom: 20
    // justifyContent: "center"
    // backgroundColor: '#F0FFFF',
    // width: setWidth(100) / numColumns,
  },
  containerCard: {
    // backgroundColor: Colors.ACTIVE,
    // width: setWidth(50),
    // height: 300,
    // marginRight: 20,
    // borderWidth: 1,
    // borderColor: 'black',
    // justifyContent: "center"
    alignItems: "center"
  },
  containerText: {
    // width: setWidth(40),
    // height: 300,
    // marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  movieName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    width: setWidth(50)
  },
});
export default MovieGirdCard;
