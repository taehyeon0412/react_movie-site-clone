import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;
//전체화면

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//로딩

const Banner = styled.div<{ bgPhoto: string }>`
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
    url(${(props) => props.bgPhoto});
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
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;
//슬라이더 열

const Box = styled(motion.div)`
  background-color: white;
  height: 8rem;
  color: red;
  font-size: 20px;
`;
//슬라이더 내용

const rowVar = {
  hidden: {
    x: window.innerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 10,
  },
};
//슬라이더 애니메이션 variants

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  //console.log(data, isLoading);

  const [index, setIndex] = useState(0); //슬라이더 인덱스
  const increaseIndex = () => setIndex((prev) => prev + 1); //인덱스 1만큼 증가

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")}
          >
            <Title>{data?.results[1].title}</Title>
            <Overview>{data?.results[1].overview}</Overview>
          </Banner>

          <Slider>
            <AnimatePresence>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i}>{i}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
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
