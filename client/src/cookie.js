//리액트에서 쿠키를 사용하기위한 라이브러리 react-cookie
//보안을 위해 쿠키에 refreshToken을 저장할거임

import { Cookies } from 'react-cookie'

const cookies = new Cookies()

//리프레쉬 토큰을 쿠키에 저장하기 위한 함수
//아마 'refresh_token 이란 이름으로 저장하는듯
export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expiresDate = today.setDate(today.getDate() + 7);
  //expries뜻 = 만료

  return cookies.set('refresh_token', refreshToken, {
    sameSite : 'strict',
    path : '/',
    expires : new Date(expiresDate)
  })
}

//쿠키에 저장된 리프레쉬 토큰을 가져오기 위한 함수
export const getCookieToken = () => {
  return cookies.get('refresh_token');
}

//저장된 쿠키를 삭제하는 함수
//로그아웃등에 사용되는듯 하다.
export const removeCookieToken = () => {
  return cookies.remove('refresh_token', { sameSite : 'strict', path : '/' })
}
