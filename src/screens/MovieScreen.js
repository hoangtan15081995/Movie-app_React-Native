import React, { useState, useEffect } from 'react'
import { Button, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Share, Modal, Pressable, FlatList } from 'react-native'
import Colors from '../constants/Color';
import {
  GetMovieDetail,
  GetVideoMovieDetail,
  GetCastMovieDetail,
} from '../services/apiService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL } from '../services/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import { pushMovieToBookMark } from '../redux/features/bookMark/bookMarkSlice';
import YoutubePlayer from 'react-native-youtube-iframe';
import CastCard from '../Components/CastCard';
import CompanyCard from '../Components/CompanyCard';

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
  const [castMovieDetail, setCastMovieDetail] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  let actionBookMark = bookMark.some(bookMovie => bookMovie.id === movieDetail.id);
  const findTrailerOfficial = videoMovieDetail && videoMovieDetail.find((video) => video.name === "Official Trailer");
  console.log('movieDetail', movieDetail);
  console.log('videoMovieDetail', videoMovieDetail);
  console.log('trailerOfficial', findTrailerOfficial);
  console.log('castMovieDetail', castMovieDetail);
  
  let overview = movieDetail.overview || "loading...";

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
  let languages = movieDetail.spoken_languages || [{english_name: 'French', iso_639_1: 'fr', name: 'Français'}, {english_name: 'English', iso_639_1: 'en', name: 'English'}]

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const response = await GetMovieDetail(`/movie/${movieId}`);
        setMovieDetail(response);
        setCompanies(response.production_companies);
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

     const getCastMovieDetail = async () => {
       try {
         const response = await GetCastMovieDetail(`/movie/${movieId}/credits`);
         setCastMovieDetail(response.cast);
       } catch (error) {
         console.log(error);
       }
    };
    getCastMovieDetail();
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
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 7,
          }}>
          <View
            style={{
              width: setWidth(33.33),
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Icon name="angle-left" size={30} color="black" />
                <Text style={{color: 'black', marginLeft: 5, fontSize: 16}}>
                  Home
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 15}}>Movie Details</Text>
          </View>
          <View
            style={{
              width: setWidth(33.3),
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}>
              <Icon
                name="share-square-o"
                size={22}
                color="black"
                onPress={onShare}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {modalVisible ? (
            <YoutubePlayer height={230} play={true} videoId={key} />
          ) : (
            <>
              <Image
                source={{uri: `${URL}${movieDetail.backdrop_path}`}}
                style={{width: setWidth(100), height: 230}}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  top: 95,
                  left: setWidth(50) - 18,
                }}>
                <Icon
                  name="youtube-play"
                  size={40}
                  color="red"
                  style={{opacity: 0.7}}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            marginTop: 8,
            marginBottom: 25,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            {movieDetail.title}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{width: setWidth(20), alignItems: 'center'}}
            onPress={() => {
              handleBookMark(movieDetail);
            }}>
            {actionBookMark ? (
              <Icon name="heart" size={25} color="red" />
            ) : (
              <Icon name="heart-o" size={25} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: setWidth(100),
          }}>
          <View
            style={{
              width: setWidth(33.33),
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 20,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Duration
              </Text>
              <Text>{movieDetail.runtime} minutes</Text>
            </View>
          </View>
          <View
            style={{
              width: setWidth(33.33),
              flexDirection: 'column',
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Genre
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{width: setWidth(30)}}>
                  {genres.map((genre, index) => (
                    <>
                      {index > 1 ? (
                        ''
                      ) : (
                        <Text key={genre}>
                          {genre.name}{' '}
                          <Text>
                            {index > 0 || genres.length === 1 ? '' : ', '}
                          </Text>
                        </Text>
                      )}
                    </>
                  ))}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: setWidth(33.33),
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginRight: 20,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Language
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{width: setWidth(30)}}>
                  {languages.map((language, index) => (
                    <>
                      {index > 1 ? (
                        ''
                      ) : (
                        <Text key={language}>
                          {language.english_name}{' '}
                          <Text>
                            {index > 0 || languages.length === 1 ? '' : ', '}
                          </Text>
                        </Text>
                      )}
                    </>
                  ))}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: setWidth(100), marginTop: 25}}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              marginLeft: 20,
              marginBottom: 5,
            }}>
            Synopsis
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              width: setWidth(100),
              fontSize: 15,
              paddingHorizontal: 20,
            }}>
            {/* {overview} */}
            {readMore
              ? overview
              : overview.length > 210
              ? overview.slice(0, 209) + '...'
              : overview}
          </Text>
          {readMore ? (
            <TouchableOpacity
              onPress={() => {
                setReadMore(false);
              }}
              style={{
                color: 'red',
                fontSize: 15,
                paddingHorizontal: 20,
                alignItems: 'flex-end',
              }}>
              <Icon name="sort-asc" size={27} color="red" />
            </TouchableOpacity>
          ) : overview.length > 210 ? (
            <TouchableOpacity
              onPress={() => {
                setReadMore(true);
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 15,
                  paddingHorizontal: 20,
                  textAlign: 'right',
                }}>
                Read more
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'black',
            flexDirection: 'column',
            marginTop: 25,
            marginRight: 20,
            marginLeft: 20,
            // height: 100,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Main Cast
          </Text>
          <FlatList
            data={castMovieDetail}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <CastCard cast={item} />}
          />
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'black',
            flexDirection: 'column',
            marginTop: 25,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 30,
            // height: 100,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            Production Companies
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{flexDirection: 'row'}}>
            {companies &&
              companies.map(company => {
                if (company.logo_path !== null) {
                  return <CompanyCard company={company} />;
                }
              })}
          </ScrollView>
        </View>
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