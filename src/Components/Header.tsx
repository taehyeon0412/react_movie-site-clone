import styled from "styled-components";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useWindowDimensions from "../useWindow";

const Nav = styled(motion.nav)`
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 60px;
  color: white;
  user-select: none; //user-select:none 속성은 해당요소의 드레그, 더블클릭, 블럭지정을 막는다.

  @media only screen and (max-width: 420px) {
    padding: 10px 30px;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 365px) {
    margin-right: 20px;
  }
`;

const Items = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 0.5rem;

  @media only screen and (max-width: 365px) {
    gap: 0;
  }
`;

interface ItemProps {
  tvMatch?: boolean;
  movieMatch?: boolean;
}

const Item = styled.li<ItemProps>`
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 4rem;
  border-bottom: ${(props) => (props.tvMatch ? `solid 3px white` : null)};
  border-bottom: ${(props) => (props.movieMatch ? `solid 3px white` : null)};
  &:hover {
    color: ${(props) => props.theme.white.lighter};
    border-bottom: solid 3px white;
    cursor: pointer;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    cursor: pointer;
  }

  @media only screen and (max-width: 530px) {
    svg {
      z-index: 98;
    }
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center; //애니메이션이 어디부터 시작되는지
  position: absolute;
  width: 18.5rem;
  left: -15rem;
  padding: 5px 10px;
  padding-left: 40px;
  font-size: 1rem;
  z-index: -1;
  color: white;
  background-color: ${(props) => props.theme.black.lighter};
  border: 1px solid ${(props) => props.theme.white.lighter};
  outline: none;
  ::placeholder {
    color: ${(props) => props.theme.white.lighter};
  }

  @media only screen and (max-width: 660px) {
    width: 16rem;
    left: -11rem;
  }
  @media only screen and (max-width: 600px) {
    width: 12rem;
    left: -7rem;
    ::placeholder {
      opacity: 0;
    }
  }
  @media only screen and (max-width: 530px) {
    width: 20rem;
    left: -15rem;
    z-index: 97;
    ::placeholder {
      opacity: 1;
    }
  }
  @media only screen and (max-width: 490px) {
    width: 16rem;
    left: -11.5rem;
    z-index: 97;
    ::placeholder {
      opacity: 1;
    }
  }
  @media only screen and (max-width: 415px) {
    width: 14rem;
    left: -11rem;
    z-index: 97;
    ::placeholder {
      opacity: 0;
    }
  }
  @media only screen and (max-width: 365px) {
    width: 13rem;
    left: -10rem;
    z-index: 97;
    ::placeholder {
      opacity: 0;
    }
  }
`;

interface IForm {
  keyword: string;
}
//form 인터페이스

const logoVar = {
  normal: {
    scale: 1,
  },
  active: {
    scale: 1.2,
  },
};
//로고 애니메이션

const navVar = {
  top: {
    backgroundColor: "rgb(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};
//스크롤 애니메이션

function Header() {
  /* const searchInput = useRef() as React.RefObject<HTMLInputElement>; //서치인풋 추적 */
  const width = useWindowDimensions(); //window width 추적
  const [svgWidth, setSvgWidth] = useState(0); //돋보기svg 애니메이션 위치
  const tvMatch = useRouteMatch("/tv");
  const movieMatch = useRouteMatch("/movie");
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll(); //scrollYProgress는 0~1사이 소수점값
  const navAnimation = useAnimation();
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    /* searchInput.current?.focus(); */
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) navAnimation.start("top");
    else navAnimation.start("scroll");
    //console.log(latest);
  }); //스크롤할때 값을 읽어서내서 알려줌

  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
    /* console.log("제출됨"); */
  };

  //검색바

  useEffect(() => {
    if (width > 660) {
      setSvgWidth(-14.5);
    } else if (width > 600) {
      setSvgWidth(-10.5);
    } else if (width > 530) {
      setSvgWidth(-6.5);
    } else if (width > 490) {
      setSvgWidth(-14.5);
    } else if (width > 415) {
      setSvgWidth(-11);
    } else if (width > 370) {
      setSvgWidth(-10.5);
    } else if (width > 300) {
      setSvgWidth(-9.5);
    }
  });
  //검색svg 위치 조정

  return (
    <Nav variants={navVar} initial="top" animate={navAnimation}>
      <Column>
        <Link to="/">
          <Logo
            variants={logoVar}
            initial="normal"
            whileHover="active"
            viewBox="0 0 1024 276.742"
          >
            <motion.path
              xmlns="http://www.w3.org/2000/svg"
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
              fill="#d81f26"
            />
          </Logo>
        </Link>

        <Items>
          <Item tvMatch={tvMatch?.isExact}>
            <Link to="/tv">TV</Link>
          </Item>

          <Item movieMatch={movieMatch?.isExact}>
            <Link to="/movie">영화</Link>
          </Item>
        </Items>
      </Column>
      {/* 첫번째 컬럼 : 헤더 메뉴 */}

      <Column>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? `${svgWidth}rem` : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", {
              required: true,
              minLength: 2,
            })}
            /* ref={searchInput} */
            initial={false}
            transition={{ type: "linear" }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="제목, 장르로 검색해보세요."
          />
        </Search>
      </Column>
      {/* 두번째 컬럼 : 서치바 */}
    </Nav>
  );
}

export default Header;

/* initial={false}로 하는이유
=>새로고침시 애니메이션이 실행되지 않기 위해 */
