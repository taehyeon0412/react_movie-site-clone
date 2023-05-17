import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  IMovie,
  LIST_TYPE,
  getMovies,
  popularMovies,
  upComingMovies,
  topMovies,
} from "../api";
import styled from "styled-components";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: black;
`;
//전체화면

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//로딩

function Movie() {
  const { data: nowPlayingMovie, isLoading } = useQuery<IGetMoviesResult>(
    [LIST_TYPE[0], "nowPlaying"],
    getMovies //fetch한 API
  );

  const { data: popularMovie } = useQuery<IGetMoviesResult>(
    [LIST_TYPE[1], "popularMovie"],
    popularMovies
  );

  const { data: upComingMovie } = useQuery<IGetMoviesResult>(
    [LIST_TYPE[2], "upComingMovie"],
    upComingMovies
  );

  const { data: topMovie } = useQuery<IGetMoviesResult>(
    [LIST_TYPE[2], "topMovies"],
    topMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={topMovie?.results[0] as IMovie}
            detailSearchUrl={`movie/banner`}
            requestUrl={"movie"}
            menuName={"movie"}
          ></Banner>

          <Slider
            data={topMovie as IGetMoviesResult}
            title={"현재 상영 영화"}
            listType={LIST_TYPE[3]}
            mediaType={"movie"}
            menuName={"movie"}
          ></Slider>

          <Slider
            data={nowPlayingMovie as IGetMoviesResult}
            title={"현재 상영 영화"}
            listType={LIST_TYPE[0]}
            mediaType={"movie"}
            menuName={"movie"}
          ></Slider>

          <Slider
            data={upComingMovie as IGetMoviesResult}
            title={"개봉 예정 영화"}
            listType={LIST_TYPE[1]}
            mediaType={"movie"}
            menuName={"movie"}
          ></Slider>

          <Slider
            data={popularMovie as IGetMoviesResult}
            title={"인기 영화"}
            listType={LIST_TYPE[2]}
            mediaType={"movie"}
            menuName={"movie"}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
