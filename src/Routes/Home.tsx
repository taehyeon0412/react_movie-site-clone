import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  LIST_TYPE,
  getMovies,
  popularMovies,
  popularTvShow,
  upComingMovies,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
//모달창 오버레이

const MovieModal = styled(motion.div)`
  position: fixed;
  width: 35rem;
  height: 40rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 20px;
  overflow: hidden;
`;
//박스 클릭 모달창

const ModalCoverImg = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.4)
    ),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.bgphoto});
`;
//박스 클릭 모달창 이미지

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.7rem;
  position: relative;
  top: -100px;
  padding: 20px;
  font-weight: 700;
`;
// 박스 클릭 모달창 타이틀

const ModalInfo = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-weight: 700;
  position: relative;
  top: -100px;
  padding-left: 10px;
  display: flex;
  gap: 10px;
`;
// 박스 클릭 모달창 정보

const ModalInfoStar = styled.span``;
// 박스 클릭 모달창 정보 별

const ModalInfoDate = styled.span``;
// 박스 클릭 모달창 정보 개봉일

const ModalOverview = styled.p`
  bottom: 0;
  position: absolute;
  height: 30%;
  width: 100%;
  padding: 20px 20px 0px 20px;
  font-weight: 700;
`;
//박스 클릭 모달창 정보 영화설명

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

  const bigMovieMatch = useRouteMatch<{ movieID: string }>("/movies/:movieID");
  const history = useHistory(); //useHistory훅은 url를 왔다갔다 할 수 있음

  const onOverlayClick = () => history.push("/");

  const clickedMovie =
    bigMovieMatch?.params.movieID &&
    nowPlayingMovie?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieID
    );
  //(조건1)이 &&(참)이면 (조건2)을 만족하는 항목을 반환한다.

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner></Banner>

          <Slider
            data={nowPlayingMovie as IGetMoviesResult}
            title={"현재 상영 영화"}
            listType={LIST_TYPE[0]}
          ></Slider>

          <Slider
            data={popularMovie as IGetMoviesResult}
            title={"인기 영화"}
            listType={LIST_TYPE[1]}
          ></Slider>

          <Slider
            data={upComingMovie as IGetMoviesResult}
            title={"개봉 예정 영화"}
            listType={LIST_TYPE[1]}
          ></Slider>

          <Slider
            data={popularTvShows as IGetMoviesResult}
            title={"Top Tv 드라마"}
            listType={LIST_TYPE[1]}
          ></Slider>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <MovieModal layoutId={bigMovieMatch.params.movieID}>
                  {clickedMovie && (
                    <>
                      <ModalCoverImg
                        bgphoto={makeImagePath(clickedMovie.backdrop_path)}
                      />
                      <ModalTitle>{clickedMovie.title}</ModalTitle>
                      <ModalInfo>
                        <ModalInfoStar>
                          💗{clickedMovie.vote_average}
                        </ModalInfoStar>
                        <ModalInfoDate>
                          •{clickedMovie.release_date.slice(0, 4)}
                        </ModalInfoDate>
                      </ModalInfo>
                      <ModalOverview>
                        {clickedMovie.overview.length > 200
                          ? `${clickedMovie.overview.slice(0, 200)}...`
                          : `${clickedMovie.overview}`}
                      </ModalOverview>
                    </>
                  )}
                </MovieModal>
              </>
            ) : null}
          </AnimatePresence>
          {/* 영화 클릭 모달창 */}
        </>
      )}
    </Wrapper>
  );
}

export default Home;

/* 'string | undefined' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
  'undefined' 형식은 'string' 형식에 할당할 수 없습니다. 
  ==> 타입스크립트 오류일때 
  ===>어떠한 이유에서 data가 존재하지 않아 backdrop_path가 제공되지 않으면
  || "" 빈string을 보내라고 하면 해결된다*/

/*AnimatePresence는 자식 컴포넌트가 render되거나 destroy될 때 효과를 준다  */

/* onExitComplete => 여기에 함수를 넣으면 exit가 끝났을때 함수가 실행됨*/
