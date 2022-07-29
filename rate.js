import Binance from 'node-binance-api'
const binance = new Binance()

export const rate = async () => {
  return binance.prices('BTCUAH')
}
