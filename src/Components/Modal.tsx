import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";
import { IGenre, IGetMoviesResult, IMovie, detailData } from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import ReactStars from "react-stars";

const GlobalStyle = createGlobalStyle`
  html{overflow: hidden;}
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 99;
`;
//모달창 오버레이

const MovieModalBox = styled(motion.div)`
  position: fixed;
  width: 40rem;
  height: 40rem;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 20px;
  overflow: auto;
  z-index: 100;

  ::-webkit-scrollbar {
    display: none;
  }
`;
//모달창

const ModalCoverImg = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 60%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.4)
    ),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.bgphoto});

  position: relative;
`;
//모달창 이미지

const ModalSmallImg = styled.div`
  width: 30%;
  margin-top: -8rem;
  margin-left: 1rem;
  img {
    width: 100%;
  }
  position: absolute;
`;
//모달창 작은 이미지

const ModalTextBox = styled.div`
  position: absolute;
  left: calc(20% + 4rem);
  float: right;
  width: 70%;
  padding-left: 2rem;
  bottom: 2rem;
`;
// 모달창 제목박스

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.5rem;
  position: relative;
  font-weight: 700;
  margin-bottom: 10px;
`;
//모달창 타이틀

const ModalSmallTitle = styled.h3`
  color: ${(props) => props.theme.white.darker};
  font-size: 1rem;
  position: relative;
  font-weight: 600;
`;
//모달창 작은 타이틀

const ModalInfoBox = styled.div`
  position: absolute;
  left: calc(20% + 4rem);
  float: right;
  width: 70%;
  height: 40%;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
`;
//모달창 정보 박스

const ModalInfoItem = styled.span`
  position: relative;
  margin-left: 0.5rem;
  padding-left: 0.7rem;
  font-size: 0.9rem;
  font-weight: 700;

  ::before {
    content: "";
    position: absolute;
    top: 40%;
    left: 0;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: #7e7e7e;
  }
`;
//모달창 정보 아이템

const ModalInfoRating = styled.div`
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
    color: #f1ef5b;
    font-weight: 700;
  }
`;
//모달창 별점

const ModalOverview = styled.div`
  margin-left: 0.5rem;
  width: 95%;
  font-size: 0.9rem;
  line-height: 1.3rem;
  padding-bottom: 3rem;
`;
//박스 클릭 모달창 정보 영화설명

interface IModal {
  dataId: number;
  listType: string;
  requestUrl: string;
  menuName: string;
}

export function Modal({ dataId, listType, requestUrl, menuName }: IModal) {
  const { data } = useQuery<IMovie>(
    [listType + dataId, "detail" + dataId],
    () => detailData(requestUrl, dataId)
  );
  //api.ts에 있는 detailData()에 requestUrl,dataId 정보를 넣는다

  const history = useHistory();
  const modalMatch = useRouteMatch<{ movieID: string }>(
    `/${menuName}/${listType}/:movieID`
  );
  //클릭하고 있는 영화 모달 매치

  const overlayClicked = () => {
    if (menuName === "home") {
      history.push("/");
    } else if (menuName === "tv") {
      history.push("/tv");
    } else if (menuName === "movie") {
      history.push("/movie");
    }
  };

  const getGenreToString = (arr: IGenre[]): string => {
    if (arr && arr.length > 0) {
      return (
        arr.map((genre, idx) => {
          return idx + 1 === arr.length ? `${genre.name}` : `${genre.name}`;
        }) + ""
      );
    }
    return "";
  };
  //장르는 [] 배열이므로 거기에 있는것들을 map으로 풀어야된다

  return (
    <>
      <GlobalStyle />
      <Overlay
        onClick={overlayClicked}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      ></Overlay>
      <MovieModalBox layoutId={modalMatch?.params.movieID + listType}>
        <>
          <ModalCoverImg bgphoto={makeImagePath(data?.backdrop_path || "")}>
            <ModalTextBox>
              <ModalTitle>{data?.title}</ModalTitle>
              <ModalSmallTitle>{data?.original_title}</ModalSmallTitle>
            </ModalTextBox>
          </ModalCoverImg>

          <ModalSmallImg>
            <img
              src={makeImagePath(data?.poster_path || "", "w500")}
              alt="poster"
            />
          </ModalSmallImg>

          <ModalInfoBox>
            <>
              <ModalInfoItem>{data?.release_date.slice(0, 4)}</ModalInfoItem>

              <ModalInfoItem>
                {data?.runtime ? `${data?.runtime}분` : ""}
              </ModalInfoItem>

              <ModalInfoItem>
                {getGenreToString(data?.genres || [])}
              </ModalInfoItem>

              <ModalInfoRating>
                <ReactStars
                  count={5}
                  value={data?.vote_average ? data?.vote_average / 2 : 0}
                  color1="#E6E6E6"
                  color2="#FFCC33"
                  half
                  size={20}
                  edit={false}
                  className="rating"
                />
                <span>({data?.vote_average.toFixed(1)}점)</span>
              </ModalInfoRating>

              <ModalOverview>{data?.overview}</ModalOverview>
            </>
          </ModalInfoBox>
        </>
      </MovieModalBox>
    </>
  );
}

export default Modal;

/* content: "";
    position: absolute;
    width: 0.3rem;
    height: 1.2rem;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgb(204, 204, 204); */
