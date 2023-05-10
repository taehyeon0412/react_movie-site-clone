const API_KEY = "8fb9a6933b05a0378bc2109608540342";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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
//영화 API 정보 가져오기
