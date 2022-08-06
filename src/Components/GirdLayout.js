import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import MovieGirdCard from './MovieGirdCard';

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;

function GirdLayout({ navigation }) {
  console.log(navigation, "navi")
  const numColumns = 2
  // const listMoviesNowPlaying = ["1", "2", "3", "4"]
  const dispatch = useDispatch();
  const {listMoviesNowPlaying} = useSelector( state => state.moviesNowPlaying);
  return (
    <View>
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
        // onEndReached={handleLoadMoreNowPlaying}
        // ListFooterComponent={renderFooter}
      />
    </View>
  );
}

export default GirdLayout