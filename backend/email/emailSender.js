const nodemailer = require('nodemailer');
const {emaiSender} = require ("../config")
async function EmailSender(body,receiver) {
  try {
 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emaiSender.senderEmail,           // your Gmail address
    pass: emaiSender.password  // NOT your Gmail password
  }
});

const mailOptions = {
  from:  `"A2Z Auto Calgary" <${emaiSender.senderEmail}>`,
  to: receiver,
  subject: 'a2z email sender',
  html: body,
  replyTo: `${emaiSender.realEmail}`,
   attachments: [
    {
      filename: 'logo.png',
      path: "./assets/a2zlogo.jfif",  // your local path to the image
      cid: 'a2zlogo' // same as the cid value used in the img src
    }
  ]
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('Email sent:', info.response);
  return "Email has been sent Successfuly"
});
    } catch (error) {
        throw new Error(error)
    
 }
}


module.exports={EmailSender}
