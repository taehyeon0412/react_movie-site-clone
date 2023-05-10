const API_KEY = "8fb9a6933b05a0378bc2109608540342";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=ko&region=kr&api_key=${API_KEY}`
  ).then((response) => response.json());
}
