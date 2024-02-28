const nodemailer = require("nodemailer");

const mailSender = {
    sendGmail: function (param) {
        const url = `http://localhost:3000/email/?email=${param.toEmail}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_ID,
                pass: process.env.SMTP_PASS,
            },
        });

        //메일 옵션
        const mailOptions = {
            from: "sanaI@SNI.com",
            to: param.toEmail,
            subject: param.subject,
            html: `<h1>이메일 인증,
                            <div>아래 버튼을 눌러 인증을 완료해주세요
                            <a href='${url}'>이메일 인증하기</a>
                            </div>`,
        };

        //메일 발송
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    },
};

module.exports = { mailSender };
