import { useQuery } from "react-query";
import {
  IGetMoviesResult,
  IMovie,
  TV_LIST_TYPE,
  onTheAir,
  topTvShow,
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

function Tv() {
  const { data: topTvShows, isLoading } = useQuery<IGetMoviesResult>(
    [TV_LIST_TYPE[0], "topTvShows"],
    topTvShow
  );

  const { data: onTheAirs } = useQuery<IGetMoviesResult>(
    [TV_LIST_TYPE[1], "onTheAirs"],
    onTheAir
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={topTvShows?.results[0] as IMovie}
            detailSearchUrl={`tv/banner`}
            requestUrl={"tv"}
            menuName={"tv"}
          ></Banner>

          <Slider
            data={topTvShows as IGetMoviesResult}
            title={"Top20 Tv 드라마"}
            listType={TV_LIST_TYPE[0]}
            mediaType={"tv"}
            menuName={"tv"}
          ></Slider>

          <Slider
            data={onTheAirs as IGetMoviesResult}
            title={"방영중 Tv 드라마"}
            listType={TV_LIST_TYPE[1]}
            mediaType={"tv"}
            menuName={"tv"}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
