import React, { useState, useEffect } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Share, Modal, Pressable } from 'react-native'
import Colors from '../constants/Color';
import { GetMovieDetail, GetVideoMovieDetail } from '../services/apiService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../services/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import { pushMovieToBookMark } from '../redux/features/bookMark/bookMarkSlice';
import YoutubePlayer from 'react-native-youtube-iframe';

const {width, height} = Dimensions.get('screen');
const setWidth = w => (width / 100) * w;
const setHeight = h => (height / 100) * h;

function MovieScreen({ route, navigation }) {
  const dispatch = useDispatch(); 
  const {bookMarkMovies} = useSelector(state => state.bookMark);
  let bookMark = bookMarkMovies || [];
  const { movieId } = route.params;
  
  const [movieDetail, setMovieDetail] = useState({});
  const [videoMovieDetail, setVideoMovieDetail] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  let actionBookMark = bookMark.some(bookMovie => bookMovie.id === movieDetail.id);
  const findTrailerOfficial = videoMovieDetail.find((video) => video.name === "Official Trailer");
  // console.log('movieDetail', movieDetail);
  // console.log('videoMovieDetail', videoMovieDetail);
  console.log('trailerOfficial', findTrailerOfficial);

  let key = "";
  if (findTrailerOfficial) {
   key = findTrailerOfficial.key
  } else {
   key = ""
  }
  console.log(key);

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const response = await GetMovieDetail(`/movie/${movieId}`);
        setMovieDetail(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieDetail();
     const getVideoMovieDetail = async () => {
       try {
         const response = await GetVideoMovieDetail(`/movie/${movieId}/videos`);
         setVideoMovieDetail(response.results);
       } catch (error) {
         console.log(error);
       }
    };
    getVideoMovieDetail();
  }, [])
  
    const handleBookMark = movieDetail => {
      dispatch(pushMovieToBookMark(movieDetail));
    };
  
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            movieDetail.homepage,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black', opacity: modalVisible ? 0.6 : 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.viewModal}>
          <View>
            <TouchableOpacity
              style={{flex: 0.4}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: 'white', textAlign: 'center'}}></Text>
            </TouchableOpacity>
            <View style={{flex: 0.3, width: setWidth(100)}}>
              <YoutubePlayer
                height={setHeight(30)}
                play={true}
                videoId={key}
              />
            </View>
            <TouchableOpacity
              style={{flex: 0.4}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: 'white', textAlign: 'center'}}></Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={{uri: `${URL}${movieDetail.poster_path}`}}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{opacity: 1, borderColor: 'white'}}>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: setWidth(100),
          }}>
          <TouchableOpacity
            style={{
              width: setWidth(33.33),
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="angle-left"
              size={50}
              color="white"
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 0.05,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: setWidth(100),
        }}>
        <TouchableOpacity
          style={{width: setWidth(20), alignItems: 'center'}}
          onPress={() => {
            handleBookMark(movieDetail);
          }}>
          {actionBookMark ? (
            <Icon name="heart" size={25} color="red" />
          ) : (
            <Icon name="heart-o" size={25} color="white" />
          )}
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            width: setWidth(60),
          }}>
          {movieDetail.title}{' '}
        </Text>
        <TouchableOpacity
          style={{
            width: setWidth(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="share-square-o"
            size={25}
            color="white"
            onPress={onShare}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.1, flexDirection: 'row', width: setWidth(100)}}>
        <View style={{flexDirection: 'column', width: setWidth(50)}}>
          <Text style={{color: 'white', fontSize: 15, width: setWidth(50)}}>
            {' '}
            Date: {movieDetail.release_date}{' '}
          </Text>
          <Text style={{color: 'white', fontSize: 15, width: setWidth(50)}}>
            {' '}
            Time: {movieDetail.runtime} minutes{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: setWidth(50),
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              width: setWidth(50),
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="youtube-play" size={50} color="red" />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 17}}> Watch Trailer</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.15, width: setWidth(100)}}>
        <Text
          style={{
            textAlign: 'justify',
            color: 'white',
            fontSize: 13,
            width: setWidth(100),
          }}>
          {' '}
          {movieDetail.overview}{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  view: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    flex: 0.7,
  },
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieScreen