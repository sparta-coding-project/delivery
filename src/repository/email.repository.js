const { dataSource } = require("../typeorm");

class EmailRepository {
    getEmail = async (email) => {
        // 이메일이 일치하는 사용자를 찾습니다.
        const userRepository = dataSource.getRepository("User");
        const user = await userRepository.findOne({
            where: { email: email },
        });
        // 사용자의 emailValidation 속성을 true로 업데이트합니다.
        user.emailValidation = true;

        // 업데이트된 사용자 정보를 저장합니다.
        await userRepository.save(user);
        return user;
    };
}

const emailRepository = new EmailRepository();
module.exports = emailRepository;
