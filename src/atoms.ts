import { atom, selector } from "recoil";

// Window innerWidth값 감지
export const windowWidth = atom({
  key: "windowWidth",
  default: window.innerWidth,
});

//배너 사이즈 검색 할 사이즈
export const BannerSize = selector({
  key: "bannerSize",
  get: ({ get }) => {
    const width = get(windowWidth);
    if (width < 501) {
      return "w500";
    } else {
      return "";
    }
  },
});
