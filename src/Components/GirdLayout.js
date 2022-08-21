import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getListMoviesNowPlaying } from '../redux/features/movies/movieNowPlayingSlice';
import { getListMoviesPopular } from '../redux/features/movies/moviePopularSlice';
import MovieCard from './MovieCard';
import MovieGirdCard from './MovieGirdCard';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function GirdLayout({ navigation }) {
  // console.log(navigation, "navi")
  const numColumns = 2
  const dispatch = useDispatch();
  // const {listMoviesPopular, pageCurrentPopular} = useSelector(state => state.moviesPopular);
  // const [pagePopular, setPagePopular] = useState(pageCurrentPopular);
  // console.log(listMoviesPopular, 'listMoviesPopular');
  // useEffect(() => {
  //   dispatch(getListMoviesPopular(pagePopular));
  //   // setPagePopular(1);
  // }, []);

  // const handleLoadMorePopular = () => {
  //   if (pagePopular === 1) {
  //     setPagePopular(2);
  //     dispatch(getListMoviesPopular(2));
  //   } else {
  //     dispatch(getListMoviesPopular(pagePopular + 1));
  //     setPagePopular(pagePopular + 1);
  //   }
  // };
  const {listMoviesNowPlaying, pageCurrentNowPlaying} = useSelector(state => state.moviesNowPlaying);
  const [pageNowPlaying, setPageNowPlaying] = useState(pageCurrentNowPlaying);
  const [layout, setLayout] = useState(false);
  console.log(listMoviesNowPlaying, 'listMoviesNowPlaying');
  console.log('pageNowPlaying gird', pageNowPlaying);

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
      <FlatList
        style={{width: setWidth(100)}}
        data={listMoviesNowPlaying}
        horizontal={false}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          // <Text> {index}</Text>
          <MovieGirdCard
            movie={item}
            numColumns={numColumns}
            onPress={() => navigation.navigate('Movie', {movieId: item.id})}
          />
        )}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMoreNowPlaying}
      />
      {/* <FlatList
        data={listMoviesPopular}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Movie', {movieId: item.id})}
          />
        )}
        onEndReached={handleLoadMorePopular}
        ListFooterComponent={renderFooter}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default GirdLayout