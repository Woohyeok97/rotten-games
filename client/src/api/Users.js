//로그인 기능구현!

// promise 요청 타임아웃 시간 선언
const TIME_OUT = 300 * 1000;

//에러처리를 위한 status 선언
const statusError = {
    status : false,
    json : {
        error : ['연결이 원활하지 않잖슴~~']
    }
}
