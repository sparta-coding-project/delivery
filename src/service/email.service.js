const emailRepository = require("../repository/email.repository");

class EmailService {
    getEmail = async (email) => {
        const user = await emailRepository.getEmail(email);

        if (!user) {
            return res.status(404).send("사용자를 찾을 수 없습니다.");
        }
    };
}

const emailService = new EmailService();
module.exports = emailService;
