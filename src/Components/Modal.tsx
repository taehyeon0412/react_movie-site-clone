import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";
import { IGetMoviesResult, IMovie, detailData } from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";

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
  padding-left: 2rem;
`;
//모달창 정보 박스

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

          <ModalInfoBox></ModalInfoBox>
        </>
      </MovieModalBox>
    </>
  );
}

export default Modal;

/* <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
          </AnimatePresence> */
