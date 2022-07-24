import React, {useEffect, useState} from 'react'
import { ScrollView, Image, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import GET from '../data/apiService';
import { IMAGE_POSTER_URL, URL } from '../data/config';

function DiscoverMovies() {

  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
   useEffect(() => {
     const getMovies = async () => {
       try {
         const response = await GET('/discover/movie');
         setMovies(response.results);
           console.log(response);
         const images = response.results.map(
           data => `${URL}${data.backdrop_path}`,
         );
         console.log(images);
         setImages(images);
       } catch (error) {
        console.log(error);
       }
     };
      getMovies();
   }, []);
  return (
      <ScrollView>
        {images.map((image,index) => {
         return <Image key={index} source={{ uri: image }} style={{ width: "100%", height: 200}} />
        })}
      </ScrollView>
  );
}

export default DiscoverMovies