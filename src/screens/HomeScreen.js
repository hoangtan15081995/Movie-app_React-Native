import React, {useEffect, useState} from 'react';
import {ScrollView, Image, Text, View, StyleSheet, FlatList, Button, TouchableOpacity, Dimensions, StatusBar, useWindowDimensions } from 'react-native';
import GenreCard from '../Components/GenreCard';
import MovieCard from '../Components/MovieCard';
import Colors from '../constants/Color';
import { GetNowPlaying, GetMoviePopular } from '../services/apiService';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon  from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getListMoviesNowPlaying, getMoviePopular } from "../redux/features/movies/movieSlice"
import { TabView, SceneMap } from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';

const FirstRoute = () =>
  <View style={{ flex: 1 }}>
  <Text>Hello</Text>
  </View>;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

const {width} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;
const NOW_PLAYING = "NOW PLAYING";
const UPCOMING = "UPCOMING";

const Genres = [NOW_PLAYING, UPCOMING];

function HomeScreen({ navigation }) {
  console.log(navigation);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: NOW_PLAYING},
    {key: 'second', title: UPCOMING},
  ]);
  
  const dispatch = useDispatch();
  const { listMoviesNowPlaying, listMoviesPopular } = useSelector(state => state.movies);
  console.log("render");
  // console.log(listMoviesPopular || [], "UPCOMING");
  useEffect(() => {
      dispatch(getListMoviesNowPlaying());
      dispatch(getMoviePopular());
  }, []);
  return (
    <>
      
      <SafeAreaView style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            first: () => (
              <View style={{flex: 1}}>
                <FlatList
                  data={listMoviesNowPlaying}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <MovieCard
                      movie={item}
                      onPress={() =>
                        navigation.navigate('Movie', {movieId: item.id})
                      }
                    />
                  )}
                />
              </View>
            ),
            second: () => (
              <View style={{flex: 1}}>
                <FlatList
                  data={listMoviesPopular}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <MovieCard
                      movie={item}
                      onPress={() =>
                        navigation.navigate('Movie', {movieId: item.id})
                      }
                    />
                  )}
                />
              </View>
            ),
          })}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              renderLabel={({route, focused, color}) => (
                <Text style={{color: "#151C26", fontWeight: "bold"}}>{route.title}</Text>
              )}
              {...props}
              indicatorStyle={{backgroundColor: '#151C26'}}
              style={{backgroundColor: 'white'}}
            />
          )}
        />
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
