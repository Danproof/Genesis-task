import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import fs from 'fs'
import emails from './emails.json' assert { type: 'json' }

dotenv.config()

const { EMAIL, PASSWORD } = process.env

class Mail {
  #transporter = null
  #invalid_emails = []
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

  async #sendEmail(recipient, message) {
    try {
      await this.#transporter.sendMail({
        from: EMAIL,
        to: recipient,
        subject: 'Current rate',
        text: message,
        html: `<b>${message}</b>`,
      })
    } catch (e) {
      if (!this.#invalid_emails.includes(recipient)) {
        this.#invalid_emails.push(recipient)
      }
    }
  }

  async mailing(message) {
    let email
    for (email of emails) {
      await this.#sendEmail(email, message)
    }
    return this.#invalid_emails
  }
}

export default new Mail()
