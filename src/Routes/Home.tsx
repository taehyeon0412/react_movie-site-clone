import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  IMovie,
  LIST_TYPE,
  TV_LIST_TYPE,
  getMovies,
  popularMovies,
  topTvShow,
  upComingMovies,
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

function Home() {
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

  const { data: topTvShows } = useQuery<IGetMoviesResult>(
    [TV_LIST_TYPE[0], "topTvShows"],
    topTvShow
  );

  /* const clickedMovie =
    bigMovieMatch?.params.movieID &&
    nowPlayingMovie?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieID
    );
  //(조건1)이 &&(참)이면 (조건2)을 만족하는 항목을 반환한다. */

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={popularMovie?.results[5] as IMovie}
            detailSearchUrl={`home/banner`}
            requestUrl={"movie"}
            menuName={"home"}
          ></Banner>

          <Slider
            data={nowPlayingMovie as IGetMoviesResult}
            title={"현재 상영 영화"}
            listType={LIST_TYPE[0]}
            mediaType={"movie"}
            menuName={"home"}
          ></Slider>

          <Slider
            data={upComingMovie as IGetMoviesResult}
            title={"개봉 예정 영화"}
            listType={LIST_TYPE[1]}
            mediaType={"movie"}
            menuName={"home"}
          ></Slider>

          <Slider
            data={popularMovie as IGetMoviesResult}
            title={"인기 영화"}
            listType={LIST_TYPE[2]}
            mediaType={"movie"}
            menuName={"home"}
          ></Slider>

          <Slider
            data={topTvShows as IGetMoviesResult}
            title={"Top20 Tv 드라마"}
            listType={TV_LIST_TYPE[0]}
            mediaType={"tv"}
            menuName={"home"}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

/*AnimatePresence는 자식 컴포넌트가 render되거나 destroy될 때 효과를 준다  */
