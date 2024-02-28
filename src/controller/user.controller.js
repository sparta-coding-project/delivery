const userService = require("../service/user.service");
const { mailSender } = require("../utils/nodemailer/mail");
class UserController {
    userSignUp = async (req, res) => {
        try {
            const {
                email,
                clientId,
                password,
                passwordConfirm,
                name,
                profileImage,
                grade,
            } = req.body;
            if (grade && !["BIZ", "CUSTOMER"].includes(grade)) {
                return res.status(400).json({
                    success: false,
                    message: "등급이 올바르지 않습니다.",
                });
            }

            if (!clientId) {
                if (!email) {
                    return res.status(400).json({
                        success: false,
                        message: "이메일은 필수값입니다.",
                    });
                }

                if (!password) {
                    return res.status(400).json({
                        success: false,
                        message: "비밀번호는 필수값입니다.",
                    });
                }

                if (!passwordConfirm) {
                    return res.status(400).json({
                        success: false,
                        message: "비밀번호 확인은 필수값입니다.",
                    });
                }

                if (password.length < 6) {
                    return res.status(400).json({
                        success: false,
                        message: "비밀번호는 최소 6자 이상입니다.",
                    });
                }

                if (password !== passwordConfirm) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "비밀번호와 비밀번호 확인값이 일치하지 않습니다.",
                    });
                }
            }

            if (!name) {
                return res
                    .status(400)
                    .json({ success: false, message: "이름은 필수값입니다." });
            }

            let emailParam = {
                toEmail: email,
                subject: "회원가입 승인 이메일입니다.",
                text: "회원가입 승인 이메일입니다.",
            };

            mailSender.sendGmail(emailParam);

            await userService.userSignUp({
                email,
                clientId,
                password,
                name,
                profileImage,
                grade,
            });

            return res.status(201).json({
                email,
                name,
            });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };

    userSignIn = async (req, res) => {
        try {
            const { clientId, email, password } = req.body;

            const token = await userService.userSignIn({
                clientId,
                email,
                password,
            });
            return res.json(token);
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };

    getMyInfo = (req, res) => {
        try {
            const user = res.locals.user;

            return res.json({
                email: user.email,
                name: user.name,
                profileImage: user.profileImage,
            });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    };
}

const userController = new UserController();
module.exports = userController;
