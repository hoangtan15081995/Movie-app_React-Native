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
  console.log('movieDetail', movieDetail);
  console.log('videoMovieDetail', videoMovieDetail);
  console.log('trailerOfficial', findTrailerOfficial);

  let key = "";
  if (findTrailerOfficial) {
   key = findTrailerOfficial.key
  } else {
   key = ""
  }
  console.log(key);

  let vote = movieDetail.vote_average || 6.7;

  let genres = movieDetail.genres || [{ id: 12, name: 'Adventure' }, { id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }];
  console.log(genres, 'genres');

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
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: setWidth(100),
          backgroundColor: 'black',
        }}>
        <ImageBackground
          source={require('../Images/backgroundDetail2.jpg')}
          resizeMode="cover"
          style={{minHeight: setHeight(100)}}
          imageStyle={{opacity: 0.3}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginLeft: 5,
              }}>
              <TouchableOpacity onPress={() =>  navigation.goBack() }>
                <Icon name="angle-left" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginRight: 5,
              }}>
              <TouchableOpacity>
                <Icon
                  name="share-square-o"
                  size={22}
                  color="white"
                  onPress={onShare}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <YoutubePlayer height={setHeight(25)} play={true} videoId={key} />
          </View>
          <View style={{marginTop: 30, marginBottom: 15}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#98b4d4',
                fontSize: 30,
                fontWeight: 'bold',
                // paddingHorizontal: 40,
              }}>
              {movieDetail.title}
            </Text>
          </View>
          <View>
            <View style={{marginTop: 10}}>
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
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{color: 'white', fontSize: 15, paddingHorizontal: 20}}>
                Date:{' '}
                <Text style={{color: 'orange', fontSize: 18}}>
                  {movieDetail.release_date}
                </Text>
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{color: 'white', fontSize: 15, paddingHorizontal: 20}}>
                Time:{' '}
                <Text style={{color: 'orange', fontSize: 18}}>
                  {movieDetail.runtime} minutes
                </Text>
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{color: 'white', fontSize: 15, paddingHorizontal: 20}}>
                Vote:{' '}
                <Text style={{color: 'orange', fontSize: 18}}>
                  {vote.toFixed(1)}/10
                </Text>
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{color: 'white', fontSize: 15, paddingHorizontal: 20}}>
                Genres:{' '}
                {genres.map((genre, index) => 
                <Text key={index} style={{ color: 'orange', fontSize: 18 }}>
                    {genre.name} <Text>{genres.length - 1 === index ? "" : ", " }</Text>
                </Text>
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderBottomColor: '#98b4d4',
              marginHorizontal: setWidth(38),
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#98b4d4',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              {' '}
              OVERVIEW{' '}
            </Text>
          </View>
          <View style={{width: setWidth(100), marginTop: 20}}>
            <Text
              style={{
                textAlign: 'justify',
                color: 'white',
                fontSize: 17,
                width: setWidth(100),
                paddingHorizontal: 20,
              }}>
              {movieDetail.overview}{' '}
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
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






 {
   /* <Modal
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
            <View style={{width: setWidth(100)}}>
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
      </Modal> */
 }
 {
   /* <ImageBackground
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
      </ImageBackground> */
 }
 {
   /* <View
        style={{
          // flex: 0.05,
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
        <TouchableOpacity>
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
            Date: {movieDetail.release_date}
          </Text>
          <Text style={{color: 'white', fontSize: 15, width: setWidth(50)}}>
            Time: {movieDetail.runtime} minutes
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
      <View style={{ width: setWidth(100)}}>
        <Text
          style={{
            textAlign: 'justify',
            color: 'white',
            fontSize: 15,
            width: setWidth(100),
          }}>
          {' '}
          {movieDetail.overview}{' '}
        </Text>
      </View> */
 }