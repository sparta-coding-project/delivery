module.exports = function (err, req, res, next) {
    console.error(err)

    let statusCode = err.status || 500
    // 에러 메시지 출력
    console.error('에러 메시지:', err.message)

    //스택 추적 출력
    console.error('스택 추적:', err.stack)

    //에러 처리 하기
    if (err.message.includes('토큰 사용자가 존재하지 않습니다.')) {
        statusCode = 404
    } else if (err.message.includes('데이터베이스 오류')) {
        statusCode = 500
    } else if (err.message.includes('인증 오류')) {
        statusCode = 401
    } else if (
        err.message.includes('데이터 일관성 오류') ||
        err.message.includes('내부 서버 오류')
    ) {
        statusCode = 500
    }
    res.status(statusCode).json({ errorMessage: err.message })
    next(err)
}
