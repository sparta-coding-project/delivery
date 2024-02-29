const emailService = require("../service/email.service");

class EmailController {
    getEmail = async (req, res) => {
        try {
            const { email } = req.query;
            await emailService.getEmail(email);

            res.status(200).send("회원가입이 완료되었습니다.");
        } catch (error) {
            console.error("이메일 유효성 업데이트 중 오류 발생:", error);
            res.status(500).send(
                "서버 오류로 인해 회원가입을 완료할 수 없습니다."
            );
        }
    };
}

const emailController = new EmailController();
module.exports = emailController;
