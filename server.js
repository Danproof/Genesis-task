import fs from 'fs'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes.js'

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', router)
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running')
})
