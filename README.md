## **🛠사용 기술 및 라이브러리**

- Typescript
- framer-motion (애니메이션)
- react-dom(useHistory,useRouteMatch)
- react-query
- recoil (상태 관리)
- styled components
- react-hook-form
- font-fontawesome, react-icons
- react-stars
- react-device-detect
- theme

## Route

- `/` , `/home/:listType/:movieID` home 페이지
- `/tv` , `/tv/:listType/:movieID` tv 페이지
- `/movie` , `/movie/:listType/:movieID` 영화 페이지
- `/search` ,`/search/:menuName/:movieID` 검색 페이지
- `/:menuName/:listType/:movieID` 모달창 페이지

## 🎨 UI

**1. Home** `/` , `/home/:listType/:movieID`

**2. TV 페이지** `/tv` , `/tv/:listType/:movieID`

**3. 영화 페이지** `/movie` , `/movie/:listType/:movieID`

**4. 검색 페이지** `/search` ,`/search/:menuName/:movieID`

**5. 모달창 페이지** `/:menuName/:listType/:movieID`

## **📝 기능**

> 슬라이드 기능
> 
API를 fetch 하여 영화, TV의 정보를 받은 뒤 화면 크기에 따라 반응형으로 
출력 되게 하였고 버튼을 누르면 슬라이드 기능이 실행됩니다.

> 검색 기능 
> 
-keyword를 입력하면 keyword에 부합하는 결과값을 페이지에 나타내고 

클릭하면 모달창으로 정보를 볼 수 있게 만들었습니다.


- 체크리스트
    - header-
    1.네비게이션 아이템 호버시 밑줄 그어짐 //완료
    2.네비게이션 아이템 클릭시 밑줄 그어짐 상태 유지 //완료
    3.영화 사이트 아이콘 바꾸기 //유지
    4.미디어 작아지면 input 위치 바꾸기(반응형으로) //완료
    - home-
    1.사이트화면 커질때 작아질때에 맞춰서 반응형으로 만들기 //완료
    2.슬라이더 박스 hover하면 info 나오게 만들기 // 영화포스터로 대체
    3.슬라이더 화살표 만들기 //완료
    -슬라이더에 hover하면 화살표 생김 //완료
    -화살표에 hover하면 스케일 조금 커짐 //완료
    -끝페이지까지 가면 화살표 사라짐
    -왼쪽 오른쪽 애니메이션 다르게 하기 //완료
    4.영화정보 모달창 튀는 현상 수정하기 //완료
    5.슬라이더 작동 오류 수정하기 //완료
    6.모달창 띄우고 난 뒤 홈으로 돌아왔을때 transform-origin 안되는 현상 수정하기 / 힌트 : originX 사용??
    7.슬라이더 제목 div 만들기 - 인기작 top 20 //완료
    8.배너에 상세정보버튼추가하기 //완료
    9.배너에 상세정보버튼 누르면 모달창 띄우기 //완료
    10.박스 클릭시 url주소 /:listType/:movieID로 뜨게하기 //완료
    11.모바일 슬라이더 터치 스크롤 구현하기 //
    - search-
    미디어 줄이면 결과값 width 크게하기 //완료
    - 각 요소들 컴포넌트화
    슬라이더 //완료
    배너 //완료
    헤더 // 완료
    모달 //완료
    -listType+[movie.id](http://movie.id/) 가 일치할때 모달창 띄움 //완료
    -모달창 @media 크기별로 다르게 설정 //완료
    -모달창에 x 버튼 만들기 //완료
    
    tv API 정보 수정하기//완료
    
    - tv 화면 만들기 //완료
    - css 모바일 + window 반응형으로 만들기 //완료

## **📑 참고 API**

- https://www.themoviedb.org/?language=ko : 영화 정보 API
