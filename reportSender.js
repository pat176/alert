const nodemailer = require('nodemailer');
const defaultMailingList = "parth.eng1210@gmail.com";
const senderEmail = "parth.eng1210@gmail.com";
const senderPassword = "1210@parth"; // gmail app password
module.exports = {
  sendMail: async (subject, text, to = defaultMailingList) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

      const message = {
        from: senderEmail,
        to,
        subject,
        text: subject,
        html: text,
      };

      transporter.sendMail(message, () => { console.log("here") });
    } catch (e) {
      // handle errors here
    }
  },
};
//b8a4ce0dc14c286b06e7c6e710649a82aa5bf1a73f7080dc026e988eb91ff2f9