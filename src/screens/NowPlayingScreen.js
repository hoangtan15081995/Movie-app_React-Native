import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MovieCard from '../Components/MovieCard';
import { getListMoviesNowPlaying } from '../redux/features/movies/movieNowPlayingSlice';
import {useDispatch, useSelector} from 'react-redux';
import TheFirstMovieCard from '../Components/TheFirstMovieCard';

function NowPlayingScreen({ navigation }) {
  console.log(navigation);

  const dispatch = useDispatch();
  const { listMoviesNowPlaying, pageCurrentNowPlaying } = useSelector(state => state.moviesNowPlaying);
  const [pageNowPlaying, setPageNowPlaying] = useState(pageCurrentNowPlaying);
  console.log(listMoviesNowPlaying, 'listMoviesNowPlaying');
  useEffect(() => {
      dispatch(getListMoviesNowPlaying(pageNowPlaying));
      // setPageNowPlaying(1);
  }, []);

  const handleLoadMoreNowPlaying = () => {
    if (pageNowPlaying === 1) {
      setPageNowPlaying(2);
      dispatch(getListMoviesNowPlaying(2));
    } else {
      dispatch(getListMoviesNowPlaying(pageNowPlaying + 1));
      setPageNowPlaying(pageNowPlaying + 1);
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20}}>
        <Text style={{color: "black", fontSize: 25, marginLeft: 20}}> Most popular</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image
            source={require('../Images/layout.png')}
            style={{width: 22, height: 22, marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={listMoviesNowPlaying}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Movie', {movieId: item.id})}
          />
          // <>
          //   {index === 0 ? (
          //     <TheFirstMovieCard
          //       movie={item}
          //       onPress={() => navigation.navigate('Movie', {movieId: item.id})}
          //     />
          //   ) : null}
          //   {index > 0 ? (
          //     <MovieCard
          //     movie={item}
          //     onPress={() => navigation.navigate('Movie', {movieId: item.id})}
          //     />
          //   ) : null
          // }
          // </>
        )}
        onEndReached={handleLoadMoreNowPlaying}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default NowPlayingScreen