const nodemailer = require('nodemailer')
const senderInfo = require('../config/senderInfo.json')

const mailSender = {
    sendGmail: function (param) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderInfo.user,
                pass: senderInfo.pass,
            },
        })

        //메일 옵션
        const mailOptions = {
            from: 'sanaI@SNI.com',
            to: param.toEmail,
            subject: param.subject,
            text: param.text,
        }

        //메일 발송
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    },
}

module.exports = { mailSender }
