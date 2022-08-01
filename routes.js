import { Router } from 'express'
import { rate } from './rate.js'
import mail from './mail.js'

const router = Router()

router.get('/rate', async (req, res) => {
  /*
    #swagger.tags = ['rate']
    #swagger.summary = 'Отримати поточний курс BTC до UAH'
    #swagger.description = 'Запит має повертати поточний курс BTC до UAH використовуючи будь-який third party сервіс з публічним АРІ'
    #swagger.operationId = 'rate'
    #swagger.produces = ['application/json']
    #swagger.responses[200] = {
        description: 'Повертається актуальний курс BTC до UAH',
        schema: { $ref: '#/definitions/integer' }
    }
    #swagger.responses[400] = {description: 'Invalid status value'}     
  */
  try {
    const current = await rate()
    res.json(Number(current.BTCUAH))
  } catch (e) {
    res.status(400).json('Something went wrong.')
  }
})

router.post('/subscribe', (req, res) => {
  /*
  #swagger.tags = ['subscription']
  #swagger.summary = 'Підписати емейл на отримання поточного курсу'
  #swagger.description = 'Запит має перевірити, чи немає данної електронної адреси в поточній базі даних (файловій) і, в разі її відсутності, записувати її. Пізніше, за допомогою іншого запиту ми будемо відправляти лист на ті електронні адреси, які будуть в цій базі.'
  #swagger.operationId = 'subscribe'
  #swagger.consumes = ['application/x-www-form-urlencoded']
  #swagger.produces = ['application/json']
  #swagger.parameters['email'] = {
    name: 'email',
    in: 'formData',
    description: 'Електронна адреса, яку потрібно підписати',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {description: 'E-mail додано'}
  #swagger.responses[409] = {description: 'Повертати, якщо e-mail вже є в базі даних (файловій)'}
  */
  if (mail.subscribe(req.body.email)) {
    res.json('Thank you for subscribing.')
  } else {
    res.status(409).json('This email has already been signed.')
  }
})

router.post('/sendEmails', async (req, res) => {
  /*
    #swagger.tags = ['subscription']
    #swagger.summary = 'Відправити e-mail з поточним курсом на всі підписані електронні пошти.'
    #swagger.description = 'Запит має отримувати актуальний курс BTC до UAH за допомогою third-party сервісу та відправляти його на всі електронні адреси, які були підписані раніше.'
    #swagger.operationId = 'sendEmails'
    #swagger.produces = ['application/json']
    #swagger.responses[200] ={description: 'E-mail'и відправлено.'}
  */
  try {
    let response = 'Current rate has been sent to all subscribers '
    const current = await rate()
    const invalid_emails = await mail.mailing(`BTC/UAH ${Number(current.BTCUAH)}`)
    if (invalid_emails.length) {
      response += `except: ${invalid_emails.join(', ')}`
    }
    res.json(response)
  } catch (e) {
    res.status(400).json("Something went wrong. I can't get current rate.")
  }
})

export default router
