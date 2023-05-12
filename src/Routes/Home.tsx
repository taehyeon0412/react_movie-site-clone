import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import useWindowDimensions from "../useWindow";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
  padding-bottom: 10rem;
  user-select: none;
`;
//전체화면

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//로딩

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.6)
    ),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
//배너

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 15px;
`;
//영화제목

const Overview = styled.p`
  font-size: 1rem;
  width: 55%;
  padding-left: 10px;
`;
//영화설명

const Slider = styled.div`
  position: relative;
  top: -10rem;
`;
//전체 슬라이더

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
//슬라이더 열

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 14rem;
  font-size: 20px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }
  &:first-child {
    transform-origin: center left; //변화하는 기준점
  }
  &:last-child {
    transform-origin: center right;
  }
`;
//슬라이더 내용

const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    y: -50,
    scale: 1.4,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
//박스 애니메이션

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

const offset = 7; //Box에 담는 영화개수(자르는 개수)

function Home() {
  const width = useWindowDimensions(); //window width 추적
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies //fetch한 API
  );
  //console.log(data, isLoading);

  const [index, setIndex] = useState(0); //슬라이더 인덱스
  const [leaving, setLeaving] = useState(false); //슬라이더 상태

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      /* leaving이 true이면 리턴(아무것도 하지않음) 클릭을 여러번 연속으로 하면 
        간격이 벌어지는 버그 수정하기 위해 인덱스 증가 안되게함*/
      toggleLeaving();
      const totalMovies = data.results.length - 1; //총 영화 개수 - 배너영화
      const maxIndex = Math.ceil(totalMovies / offset) - 1; //올림=> 나눗셈이 4.2개 이면 올림해서 5개로만들어서 새로운 공간을 만듦
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); //maxIndex가 아니면 인덱스 1만큼 증가
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  //onExitComplete 에 넣어서 exit의 애니메이션이 끝나고 나서 함수가 실행되게함

  const bigMovieMatch = useRouteMatch<{ movieID: string }>("/movies/:movieID");
  const history = useHistory(); //useHistory훅은 url를 왔다갔다 할 수 있음
  const onBoxClicked = (movieID: number) => {
    // console.log(movieID);
    history.push(`/movies/${movieID}`);
  };
  //클릭하고 있는 박스의 영화ID찾기
  const onOverlayClick = () => history.push("/");

  const clickedMovie =
    bigMovieMatch?.params.movieID &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieID);
  //(조건1)이 &&(참)이면 (조건2)을 만족하는 항목을 반환한다.

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {/* 배너 */}

          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: width + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 5 }}
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1) //배너에 있는 영화를 제외해야되니까 먼저 첫번째 영화를 슬라이스해줌
                  .slice(offset * index, offset * index + offset) //5*0,5*0+5 =>0~5번째까지
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                      variants={boxVar}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClicked(movie.id)}
                      //박스를 클릭하면 onBoxClicked호출 movie.id를 보냄
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          {/* 슬라이더 */}

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
