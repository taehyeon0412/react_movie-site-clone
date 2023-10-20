
![홈페이지 ](https://github.com/taehyeon0412/canvas_JS_mystyle/assets/71374539/19c9e66a-fc8d-4f61-931b-3f8007596a92)



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






💡 성장 경험

### 반응형 웹사이트에 대한 이해

사용자의 기기에 반응형으로 만듦에 따라 데스크톱만이 아닌 모바일이나 태블릿 환경에 대한 이해도를 높였습니다.

### SPA(Single Page Application)에 대한 이해

리액트를 이용하여 페이지 전환 시 화면이 깜빡이지 않는 부드러운 화면 전환 효과를 구현했고 SPA 프레임워크에서 사용되는 react-router-dom 라이브러리를 이해하는데 큰 도움이 되었습니다.

### 공통 컴포넌트 모듈화

웹사이트에 사용되는 slider, modal 등 과 같은 컴포넌트를 모듈화하여 범용적으로 사용할 수 있게 하였습니다. 동일한 코드를 중복적으로 사용할 필요 없이 효율적으로 개발을 할 수 있게 학습하였습니다.

### 애니메이션 구현

기존에는 css로 애니메이션을 만들었는데 css의 투박한 애니메이션이 아닌 framer-motion 등 리액트 라이브러리를 통해 부드럽고 깔끔한 애니메이션을 만들 수 있다는 것을 학습했습니다.

### TypeScript 학습

TypeScript를 학습하며 에러의 사전 방지와 코드 가이드 및 자동 완성으로 효율적인 개발을 할 수 있게 생산성이 향상되는 것을 느꼈습니다. 아직은 익숙지 않아 오류 때문에 고생한 경험이 많아 개발 공부를 하면서 조금 더 갈고 닦아야 될 것 같습니다.

오류가 생겼을 때 공식 문서, 스택오버플로우, gpt, 구글링, slack 등 다양한 방법을 통해 오류를 해결하고 이해하려고 노력했습니다.
