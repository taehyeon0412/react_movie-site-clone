import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "./../api";
import { useEffect, useState } from "react";
import useWindowDimensions from "../useWindow";
import { makeImagePath } from "../utils";
import { useHistory, useRouteMatch } from "react-router-dom";
import Modal from "./Modal";

const Wrapper = styled(motion.div)`
  position: relative;

  overflow: hidden;
  min-height: 25rem;
`;
//전체 슬라이더

const Title = styled.div`
  font-size: 2rem;
  padding-left: 2rem;
  font-weight: 700;
  padding-bottom: 1rem;

  @media only screen and (max-width: 1250px) {
    font-size: 1.8rem;
  }

  @media only screen and (max-width: 800px) {
    font-size: 1.7rem;
  }
  @media only screen and (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  position: absolute;
  width: 100%;

  @media only screen and (min-width: 1530px) {
    grid-template-columns: repeat(10, 1fr);
  }
  @media only screen and (max-width: 1530px) {
    grid-template-columns: repeat(9, 1fr);
  }
  @media only screen and (max-width: 1450px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media only screen and (max-width: 1350px) {
    grid-template-columns: repeat(7, 1fr);
  }
  @media only screen and (max-width: 1250px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media only screen and (max-width: 950px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
//슬라이더 열

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 17rem;
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
    y: -20,
    scale: 1.1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
//박스 애니메이션

interface ISlider {
  data: IGetMoviesResult;
  title: string;
  listType: string;
  mediaType: string;
  menuName: string;
}

function Slider({ data, title, listType, mediaType, menuName }: ISlider) {
  const width = useWindowDimensions(); //window width 추적
  const [index, setIndex] = useState(0); //슬라이더 인덱스
  const [leaving, setLeaving] = useState(false); //슬라이더 상태
  const [offset, setOffset] = useState(0);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  //onExitComplete 에 넣어서 exit의 애니메이션이 끝나고 나서 함수가 실행되게함

  const history = useHistory(); //useHistory훅은 url를 왔다갔다 할 수 있음
  const onBoxClicked = (
    movieID: number,
    listType: string,
    menuName: string
  ) => {
    // console.log(movieID);
    history.push(`/${menuName}/${listType}/${movieID}`);
  };
  //클릭하고 있는 박스의 영화ID,listType를 주소창에 push 해주는것

  const modalMatch = useRouteMatch<{ movieID: string }>(
    `/${menuName}/${listType}/:movieID`
  );
  //클릭하고 있는 영화 모달 매치

  useEffect(() => {
    if (width > 1530) {
      setOffset(10);
    } else if (width > 1450) {
      setOffset(9);
    } else if (width > 1350) {
      setOffset(8);
    } else if (width > 1250) {
      setOffset(7);
    } else if (width > 950) {
      setOffset(6);
    } else if (width > 800) {
      setOffset(5);
    } else if (width > 640) {
      setOffset(4);
    } else {
      setOffset(3);
    }
  });
  //윈도우 크기별 offset(보이는 영화개수)
  //recoil로 해도 되지만 useEffect로 하는 방법도 있다는것을 학습하기위해

  return (
    <Wrapper>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          initial={{ x: width + 5 }}
          animate={{ x: 0 }}
          exit={{ x: -width - 5 }}
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                layoutId={movie.id + "" + listType}
                key={movie.id}
                bgphoto={makeImagePath(movie?.poster_path || "", "w500")}
                variants={boxVar}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(movie.id, listType, menuName)}
              ></Box>
            ))}
        </Row>
      </AnimatePresence>

      <AnimatePresence>
        {modalMatch ? (
          <Modal
            dataId={Number(modalMatch?.params.movieID)} //모달에 정보 보냄
            listType={listType}
            requestUrl={mediaType}
            menuName={menuName}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Slider;

/* onExitComplete => 여기에 함수를 넣으면 exit가 끝났을때 함수가 실행됨*/
