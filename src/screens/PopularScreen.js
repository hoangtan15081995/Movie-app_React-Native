import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MovieCard from '../Components/MovieCard';
import {useDispatch, useSelector} from 'react-redux';
import { getListMoviesPopular } from '../redux/features/movies/moviePopularSlice';
import TheFirstMovieCard from '../Components/TheFirstMovieCard';

function PopularScreen({navigation}) {
  const dispatch = useDispatch();
  const { listMoviesPopular, pageCurrentPopular } = useSelector(state => state.moviesPopular);
  const [pagePopular, setPagePopular] = useState(pageCurrentPopular);
  console.log(listMoviesPopular, 'listMoviesPopular');
  useEffect(() => {
    dispatch(getListMoviesPopular(pagePopular));
    // setPagePopular(1);
  }, []);

  const handleLoadMorePopular = () => {
    if (pagePopular === 1) {
      setPagePopular(2);
      dispatch(getListMoviesPopular(2));
    } else {
      dispatch(getListMoviesPopular(pagePopular + 1));
      setPagePopular(pagePopular + 1);
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
        data={listMoviesPopular}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <>
            {index === 0 ? (
              <TheFirstMovieCard
                movie={item}
                onPress={() => navigation.navigate('Movie', {movieId: item.id})}
              />
            ) : null}
            {index > 0 ? (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate('Movie', {movieId: item.id})}
              />
            ) : null}
          </>
        )}
        onEndReached={handleLoadMorePopular}
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

export default PopularScreen;