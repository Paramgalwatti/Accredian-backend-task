// src/services/emailService.js
const nodemailer = require('nodemailer');

const sendReferralEmail = async (referrerEmail, refereeEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: refereeEmail,
    subject: 'You have been referred!',
    text: `You have been referred by ${referrerEmail}. Join us today!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Referral email sent successfully.');
  } catch (error) {
    console.error('Error sending referral email:', error);
  }
};

module.exports = {
  sendReferralEmail,
};
