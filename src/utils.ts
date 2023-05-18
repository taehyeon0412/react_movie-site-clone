import noImg from "./asset/noImges.jpg";

export function makeImagePath(id: string, format?: string) {
  if (id === "" || id === null || id === undefined) {
    return noImg;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }
}

/* 자주 사용하는 function을 사용하기 쉽게 ts파일에
export 해두는것  (ex:영화 이미지) */
