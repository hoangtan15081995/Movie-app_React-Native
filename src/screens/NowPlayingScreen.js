import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MovieCard from '../Components/MovieCard';
import { getListMoviesNowPlaying } from '../redux/features/movies/movieNowPlayingSlice';
import {useDispatch, useSelector} from 'react-redux';
import GirdLayout from '../Components/GirdLayout';

const {width, height} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;
const setHeight = h => (height / 100) * h;

function NowPlayingScreen({ navigation }) {
  // console.log(navigation);

  const dispatch = useDispatch();
  const { listMoviesNowPlaying, pageCurrentNowPlaying } = useSelector(state => state.moviesNowPlaying);
  const [pageNowPlaying, setPageNowPlaying] = useState(pageCurrentNowPlaying);
  const [layout, setLayout] = useState(false)
  console.log(listMoviesNowPlaying, 'listMoviesNowPlaying');
  const numColumns = 3;

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
        <TouchableOpacity onPress={() => setLayout(!layout)}>
          <Image
            source={require('../Images/layout.png')}
            style={{width: 22, height: 22, marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
      {layout ? <GirdLayout navigation={navigation} /> : 
      <View>
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
       }
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