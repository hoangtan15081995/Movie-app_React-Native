import { API_KEY, BASE_URL } from './config';

const GetNowPlaying = async (url) => {
  try {
    const GetNowPlaying = `${BASE_URL}${url}?api_key=${API_KEY}`;
    let response = await fetch(GetNowPlaying, {method: 'GET'});
    response = response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetMovieDetail = async (url) => {
  try {
    const GetMovieDetail = `${BASE_URL}${url}?api_key=${API_KEY}`;
    let response = await fetch(GetMovieDetail, {method: 'GET'});
    response = response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetMoviePopular = async url => {
  try {
    const GetMoviePopular = `${BASE_URL}${url}?api_key=${API_KEY}`;
    let response = await fetch(GetMoviePopular, {method: 'GET'});
    response = response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export {GetNowPlaying, GetMovieDetail, GetMoviePopular};
