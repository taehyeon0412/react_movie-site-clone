import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  IMovie,
  LIST_TYPE,
  getMovies,
  popularMovies,
  popularTvShow,
  upComingMovies,
} from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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

  const { data: popularTvShows } = useQuery<IGetMoviesResult>(
    [LIST_TYPE[3], "popularTvShows"],
    popularTvShow
  );

  /* const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      // leaving이 true이면 리턴(아무것도 하지않음) 클릭을 여러번 연속으로 하면
      // 간격이 벌어지는 버그 수정하기 위해 인덱스 증가 안되게함
      toggleLeaving();
      const totalMovies = data.results.length - 1; //총 영화 개수 - 배너영화
      const maxIndex = Math.ceil(totalMovies / offset) - 1; //올림=> 나눗셈이 4.2개 이면 올림해서 5개로만들어서 새로운 공간을 만듦
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); //maxIndex가 아니면 인덱스 1만큼 증가
    }
  }; */

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
            bannerInfo={popularMovie?.results[0] as IMovie}
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
            data={popularTvShows as IGetMoviesResult}
            title={"Top Tv 드라마"}
            listType={LIST_TYPE[3]}
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
