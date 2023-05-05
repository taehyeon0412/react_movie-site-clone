import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  margin-right: 50px;
  width: 95px;
  height: 25px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

function Header() {
  return (
    <Nav>
      <Column>
        <Logo></Logo>

        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
        </Items>
      </Column>

      <Column>
        <button>search</button>
      </Column>
    </Nav>
  );
}

export default Header;
