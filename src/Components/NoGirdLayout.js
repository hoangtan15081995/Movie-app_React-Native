import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { getListMoviesNowPlaying } from '../redux/features/movies/movieNowPlayingSlice';
import {getListMoviesPopular} from '../redux/features/movies/moviePopularSlice';
import MovieCard from './MovieCard';
import MovieGirdCard from './MovieGirdCard';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function NoGirdLayout({navigation}) {
  console.log(navigation, 'navi');
  const dispatch = useDispatch();
  const { listMoviesNowPlaying, pageCurrentNowPlaying } = useSelector(state => state.moviesNowPlaying);
  const [pageNowPlaying, setPageNowPlaying] = useState(pageCurrentNowPlaying);
  const [layout, setLayout] = useState(false)
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
      <FlatList
        data={listMoviesNowPlaying}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Movie', {movieId: item.id})}
          />
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

export default NoGirdLayout;
