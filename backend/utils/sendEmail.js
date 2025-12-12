const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create a transporter
    // For development, we use Ethereal Email which fakes sending emails
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // 2. Define email options
    const mailOptions = {
        from: '"WishMade Store" <no-reply@wishmade.com>',
        to: options.email,
        subject: options.subject,
        html: options.message, // HTML body
    };

    // 3. Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return info;
};

module.exports = sendEmail;
