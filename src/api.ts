const API_KEY = "8fb9a6933b05a0378bc2109608540342";
const BASE_PATH = "https://api.themoviedb.org/3";

export const LIST_TYPE = [
  "nowPlaying",
  "popularMovies",
  "upcomingMovies",
  "popularTvShow",
]; // 영상 종류

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
//영화 상세정보 인터페이스

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
//영화 APi 결과값 인터페이스
//타입스크립트에게 home의 useQuery의 결과가 IGetMoviesResult타입이라고 알려준다

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=ko&region=kr&api_key=${API_KEY}`
  ).then((response) => response.json());
}
//now_playing

export function popularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?language=ko&region=kr&api_key=${API_KEY}`
  ).then((response) => response.json());
}
//popular

export function upComingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?language=ko&region=kr&api_key=${API_KEY}`
  ).then((response) => response.json());
}
//upcoming

export function popularTvShow() {
  return fetch(`${BASE_PATH}/tv/top_rated?language=ko&api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
//popularTvShow
