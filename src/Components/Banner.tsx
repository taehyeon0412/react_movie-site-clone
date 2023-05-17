import styled from "styled-components";
import { IGetMoviesResult, IMovie, getMovies, popularMovies } from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import { BannerSize } from "../atoms";
import { useRecoilValue } from "recoil";
import ReactStars from "react-stars";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const Wrapper = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  min-height: 50rem;
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

  @media only screen and (max-width: 560px) {
    background-size: 100%;
  }
`;
//배너 전체화면

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 15px;
  font-weight: 700;

  @media only screen and (max-width: 1200px) {
    font-size: 3.2rem;
  }
  @media only screen and (max-width: 700px) {
    font-size: 2.6rem;
  }
  @media only screen and (max-width: 540px) {
    font-size: 1.5rem;
    width: 100%;
  }
  @media only screen and (max-width: 360px) {
    font-size: 1.5rem;
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
    font-size: 1rem;
    width: 90%;
  }
  @media only screen and (max-width: 560px) {
    font-size: 0.6rem;
    width: 100%;
  }

  @media only screen and (max-width: 360px) {
    opacity: 0;
  }
`;
//영화설명

const InfoRating = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  .rating {
    overflow: hidden;
    margin: 0;
  }
  span {
    top: -3px;
    color: ${(props) => props.theme.white.darker};
    font-weight: 700;
  }
`;
// 별점

const InfoBtn = styled.button`
  position: absolute;
  top: 3rem;
  left: 0;
  width: 10rem;
  height: 150%;
  background-color: ${(props) => props.theme.black.lighter};

  span {
    color: white;
    font-weight: 700;
  }

  &:hover {
    background-color: ${(props) => props.theme.black.darker};
    cursor: pointer;

    span {
      color: ${(props) => props.theme.white.darker};
    }
  }
`;
//버튼

function Banner({
  detailSearchUrl,
  requestUrl,
  bannerInfo,
  menuName,
}: {
  bannerInfo: IMovie;
  detailSearchUrl: string;
  requestUrl: string;
  menuName: string;
}) {
  /* const { data } = useQuery<IGetMoviesResult>(
    ["movies", "popularMovie"],
    popularMovies //fetch한 API
  ); //api에서 데이터를 불러옴 */

  const bannerBgSize = useRecoilValue(BannerSize);
  //banner 사이즈

  const history = useHistory();
  const onBoxClicked = (id: number) => {
    history.push(`/${detailSearchUrl}/${id}`);
  };
  //상세정보 클릭하면 주소에 push해준다

  const modalMatch = useRouteMatch<{ movieID: string }>(
    `/${detailSearchUrl}/:movieID`
  );
  //클릭하고 있는 영화 모달 매치

  return (
    <Wrapper
      bgphoto={makeImagePath(bannerInfo?.backdrop_path || "", bannerBgSize)}
    >
      <>
        <Title>{bannerInfo?.title}</Title>
        <Overview>{bannerInfo?.overview}</Overview>
        <InfoRating>
          <ReactStars
            count={5}
            value={bannerInfo?.vote_average ? bannerInfo?.vote_average / 2 : 0}
            color1="#E6E6E6"
            color2="#00a7f6"
            half
            size={20}
            edit={false}
            className="rating"
          />
          <span>
            {bannerInfo?.vote_average.toFixed(1)} (
            {bannerInfo?.vote_count.toLocaleString()})
          </span>
          <InfoBtn
            onClick={() => {
              onBoxClicked(Number(bannerInfo?.id));
            }}
          >
            <span>
              <i className="fa-regular fa-circle-question"></i> 상세정보
            </span>
          </InfoBtn>
        </InfoRating>
        {/* 별 rating + 버튼 */}

        <AnimatePresence>
          {modalMatch ? (
            <Modal
              dataId={Number(modalMatch?.params.movieID)} //모달에 정보 보냄
              listType={"banner"}
              mediaType={requestUrl}
              menuName={menuName}
            />
          ) : null}
        </AnimatePresence>
      </>
    </Wrapper>
  );
}

export default Banner;

/* 'string | undefined' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
  'undefined' 형식은 'string' 형식에 할당할 수 없습니다. 
  ==> 타입스크립트 오류일때 
  ===>어떠한 이유에서 data가 존재하지 않아 backdrop_path가 제공되지 않으면
  || "" 빈string을 보내라고 하면 해결된다*/
