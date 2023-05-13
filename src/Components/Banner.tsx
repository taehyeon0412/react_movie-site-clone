import styled from "styled-components";
import { IGetMoviesResult, getMovies } from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import { BannerSize } from "../atoms";
import { useRecoilValue } from "recoil";

const Wrapper = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.6)
    ),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  overflow-x: hidden;
  user-select: none;
  padding: 60px;
`;
//배너 전체화면

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 15px;
  @media only screen and (max-width: 1200px) {
    font-size: 3.2rem;
  }
  @media only screen and (max-width: 700px) {
    font-size: 2.6rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 2rem;
  }
  @media only screen and (max-width: 350px) {
    margin: 0;
  }
`;
//영화제목

const Overview = styled.p`
  font-size: 1rem;
  width: 45%;
  padding-left: 10px;
  font-weight: 700;
  line-height: 1.5rem;

  @media only screen and (max-width: 1200px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    width: 60%;
  }
  @media only screen and (max-width: 700px) {
    font-size: 0.8rem;
    width: 90%;
  }
  @media only screen and (max-width: 500px) {
    width: 26rem;
  }

  @media only screen and (max-width: 350px) {
    opacity: 0;
  }
`;
//영화설명

function Banner() {
  const { data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies //fetch한 API
  ); //api에서 데이터를 불러옴

  const bannerBgSize = useRecoilValue(BannerSize);

  return (
    <Wrapper
      bgphoto={makeImagePath(
        data?.results[0].backdrop_path || "",
        bannerBgSize
      )}
    >
      <>
        <Title>{data?.results[0].title}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </>
    </Wrapper>
  );
}

export default Banner;