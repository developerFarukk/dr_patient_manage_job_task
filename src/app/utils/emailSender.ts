import nodemailer from 'nodemailer'
import config from '../config'

const emailSender = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_password,
    },
  })

  await transporter.sendMail({
    from: `"Doctor-Patient Appointment Management System 👻" <${config.emailSender.email}>`,
    to,
    subject,
    text,
    html,
  })

}

export default emailSender
