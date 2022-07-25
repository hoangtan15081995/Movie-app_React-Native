import React, { useState, useEffect } from 'react'
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Color';
import { GetMovieDetail } from '../services/apiService';
import { URL } from '../services/config';

const {width, height} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;
const setHeight = h => (height / 100) * h;

function MovieScreen({ route, navigation }) {
  const { movieId } = route.params;
  const [movieDetail, setMovieDetail] = useState({})

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const response = await GetMovieDetail(`/movie/${movieId}`);
        setMovieDetail(response);
        console.log("movieDetail",response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieDetail();
  }, [])
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.view}>
        <Text>{movieDetail.title} {movieId} </Text>
        <Image source={{uri: `${URL}${movieDetail.backdrop_path}`}} style={{width: setWidth(100), height: setHeight(30) }} />
        <Button title="Go Back" onPress={() => navigation.goBack()}></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieScreen