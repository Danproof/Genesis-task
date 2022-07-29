import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import fs from 'fs'
import emails from './emails.json' assert { type: 'json' }

dotenv.config()

const { EMAIL, PASSWORD } = process.env

class Mail {
  #transporter = null
  constructor() {
    this.#transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    })
  }

  subscribe(email) {
    if (emails.includes(email)) {
      return false
    }
    emails.push(email)
    fs.writeFileSync('emails.json', JSON.stringify(emails))
    return true
  }

  async sendEmails(message) {
    try {
      const info = await this.#transporter.sendMail({
        from: EMAIL,
        to: emails,
        subject: 'Current rate',
        text: message,
        html: `<b>${message}</b>`,
      })
      return info.messageId
    } catch (e) {
      return e
    }
  }
}

export default new Mail()
