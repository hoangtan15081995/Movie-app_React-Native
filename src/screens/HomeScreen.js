import React, {useEffect, useState} from 'react';
import {ScrollView, Image, Text, View, StyleSheet, FlatList} from 'react-native';
import GenreCard from '../Components/GenreCard';
import MovieCard from '../Components/MovieCard';
import Colors from '../constants/Color';
import { GetNowPlaying } from '../services/apiService';

const Genres = ['All', 'Action', 'Comedy', 'Romance', 'Horror', 'Sci-Fi'];

function HomeScreen({ navigation }) {

  const [activeGenre, setActiveGenre] = useState('');
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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Showing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
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
      </View>
      <View>
        <FlatList
          data={movies}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate("Movie", {movieId: item.id})}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    // fontFamily: FONTS.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Colors.ACTIVE,
    // fontFamily: FONTS.BOLD,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
