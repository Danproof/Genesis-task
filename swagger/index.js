import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
  info: {
    title: 'GSES2 BTC application',
  },
  host: 'localhost:3000',
  basePath: '/api',
  tags: [
    {
      name: 'rate',
      description: 'Отримання поточного курсу BTC до UAH',
    },
    {
      name: 'subscription',
      description: 'Робота з підпискою',
    },
  ],
  schemes: ['http'],
  definitions: {
    integer: 0
  }
}

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../routes')]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(
  ({ success }) => {
    console.log(`Generated: ${success}`)
  }
)
