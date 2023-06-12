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




## **📑 참고 API**

- https://www.themoviedb.org/?language=ko : 영화 정보 API
