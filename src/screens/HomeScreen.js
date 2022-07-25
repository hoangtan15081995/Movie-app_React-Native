import React, {useEffect, useState} from 'react';
import {ScrollView, Image, Text, View, StyleSheet, FlatList, Button, TouchableOpacity, Dimensions} from 'react-native';
import GenreCard from '../Components/GenreCard';
import MovieCard from '../Components/MovieCard';
import Colors from '../constants/Color';
import { GetNowPlaying, GetMoviePopular } from '../services/apiService';

// const Genres = ['All', 'Action', 'Comedy', 'Romance', 'Horror'];
const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function HomeScreen({ navigation }) {

  const [active, setActive] = useState('');
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMoviesNowPlaying = async () => {
      try {
        const response = await GetNowPlaying('/movie/now_playing');
        setMovies(response.results);
          console.log(response.results);
 
      } catch (error) {
        console.log(error);
      }
    };
    getMoviesNowPlaying();
  }, []);
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>MOVIES</Text>
      </View>
      {/* <View>
        <FlatList
          data={Genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <GenreCard
              genreName={item}
              index={index}
              active={item === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View> */}
      <ScrollView style={styles.container}>
        <View>
          <FlatList
            data={movies}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate('Movie', {movieId: item.id})}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={styles.buttonStyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonStyle}>BookMark</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
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
    backgroundColor: Colors.LIGHT_GRAY
  },
  buttonStyle: {
    color: Colors.WHITE,
    fontSize: 20,
    width: setWidth(50),
    textAlign: 'center',
  },
});

export default HomeScreen;
