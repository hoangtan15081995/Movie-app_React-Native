import React, { useState, useEffect } from 'react'
import { Button, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Color';
import { GetMovieDetail } from '../services/apiService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../services/config';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        // console.log("movieDetail",response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieDetail();
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: setWidth(100)}}>
        <TouchableOpacity style={{width: setWidth(33.33), flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}} onPress={()=> navigation.goBack()}>
          <Icon name="angle-left" size={30} color= "black" style={{marginLeft: 5}} /> 
          <Text style={{ color: "black", marginLeft: 5, fontSize: 17 }}>HOME</Text>
        </TouchableOpacity>
        <Text style={{textAlign: "center", color: "black", fontSize: 17, width: setWidth(33.33)}}>Movie Detail</Text>
        <Text style={{ textAlign: "center", width: setWidth(33.33) }}></Text>
      </View>
      <View style={styles.view}>
        <Text style={{ textAlign: "center", color: "black", fontSize: 17, marginBottom: 10 }}>{movieDetail.title} </Text>
        <Image source={{uri: `${URL}${movieDetail.backdrop_path}`}} style={{width: setWidth(100), height: setHeight(30) }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND
  },
  view: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
});

export default MovieScreen