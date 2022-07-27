const nodemailer = require("nodemailer");


exports.sendMail =  async (receiver, subject, text, html) => {


 
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS, 
    },
  });


  let info = await transporter.sendMail({
    from: '"Node Mailer" <foo@example.com>',
    to: receiver,
    subject,
    text,
    html
  });

  console.log("Message sent: %s", info.messageId);

}


