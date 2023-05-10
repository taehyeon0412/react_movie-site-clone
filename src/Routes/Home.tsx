import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
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

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
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
