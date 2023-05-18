import { useQuery } from "react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetSearchResult, ISearch, searchData } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../utils";
import Modal from "../Components/Modal";

const Wrapper = styled.div`
  background: black;
`;
//전체화면

const SearchResultDiv = styled.div`
  position: absolute;
  width: 90%;
  height: calc(100vh - 9rem);
  bottom: 0;
  margin-left: 3rem;
  margin-right: 3rem;
  background-color: transparent;
`;
//검색결과 div

const SearchResultSpan = styled.div`
  padding-bottom: 3rem;
`;
//검색결과 span

const SearchNoResultSpan = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
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

function Search() {
  const location = useLocation(); // 지금있는곳에 관한 정보를 얻을 수 있음.
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data } = useQuery<IGetSearchResult>(
    ["search", keyword],
    () => searchData(keyword || ""),
    { useErrorBoundary: true }
  );
  //search api 데이터 불러오기

  const history = useHistory();
  const onBoxClicked = (menuName: string, id: number) => {
    history.push(`/search/${menuName}/${id}?keyword=${keyword}`);
    console.log(menuName, id, keyword);
  };
  //id,media_type으로 데이터 불러오기

  const modalMatch = useRouteMatch<{ menuName: string; movieID: string }>(
    `/search/:menuName/:movieID`
  );
  //클릭하고 있는 박스 모달 매치

  return (
    <Wrapper>
      <SearchResultDiv>
        <SearchResultSpan>
          "{keyword}"(으)로 검색한 결과입니다.
        </SearchResultSpan>
        {data && data.results.length > 0 ? (
          <Row>
            {data?.results.map((movie) => (
              <Box
                layoutId={movie.id + "" + movie.media_type}
                key={movie.id}
                bgphoto={makeImagePath(movie?.poster_path || "", "w500")}
                variants={boxVar}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(movie.media_type, movie.id)}
              ></Box>
            ))}
          </Row>
        ) : (
          <SearchNoResultSpan>
            "{keyword}"의 검색 결과가 없습니다.
          </SearchNoResultSpan>
        )}
      </SearchResultDiv>

      <AnimatePresence>
        {modalMatch ? (
          <Modal
            dataId={Number(modalMatch.params.movieID)}
            mediaType={modalMatch.params.menuName || ""}
            menuName={"search"}
            listType={modalMatch?.params.menuName || ""}
            returnUrl={`/search?keyword=${keyword}`}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;

//media_type = movie,tv
//movie.id = id
//menuName = home,banner등
//mediaType = tv,movie
//`/${menuName}/${listType}/:movieID`
//search/movie/496243
