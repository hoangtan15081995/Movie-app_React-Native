import React, {useEffect, useState} from 'react';
import {ScrollView, Image, Text, View, StyleSheet, FlatList, Button, TouchableOpacity, Dimensions, StatusBar} from 'react-native';
import GenreCard from '../Components/GenreCard';
import MovieCard from '../Components/MovieCard';
import Colors from '../constants/Color';
import { GetNowPlaying, GetMoviePopular } from '../services/apiService';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {getListMoviesNowPlaying} from "../redux/features/movies/movieSlice"


const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;


function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { listMoviesNowPlaying, bookMarkMovies } = useSelector(state => state.movies);
  console.log('bookMarkMovies', bookMarkMovies);
  const [active, setActive] = useState('');
  useEffect(() => {
      dispatch(getListMoviesNowPlaying());
  }, []);
  return (
    <>
      {/* <View style={styles.viewTop}>
        <TouchableOpacity>
          <Image source={require('../Images/menu.png')} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../Images/filter.png')} style={{width: 30, height: 30}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bars" size={30} color="#900" />
        </TouchableOpacity>
      </View> */}
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={listMoviesNowPlaying}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate('Movie', {movieId: item.id})}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  viewTop: {
    flex: 0.1,
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  headerTitle: {
    fontSize: 28,
    color: Colors.WHITE,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Colors.ACTIVE,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
  footerContainer: {
    width: setWidth(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  buttonStyle: {
    color: Colors.WHITE,
    fontSize: 20,
    width: setWidth(50),
    textAlign: 'center',
  },
});

export default HomeScreen;
