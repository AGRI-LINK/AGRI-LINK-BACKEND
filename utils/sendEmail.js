import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"AgriLink" <your-email@gmail.com>',
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
