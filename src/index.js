import TonWeb from 'tonweb'
import tonMnemonic from 'tonweb-mnemonic'
import fs from 'fs'

const apiKey = 'be776176a149e646fc1630392d69f9ddb28749397661c374a81aab8b25871efe'
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey }))

import config from '../config/setup.js'
import notify from './bot.js'

/* Все параметры берём из конфига */
const { endings, showEveryWallet, stopAfterFirstWallet, notifyInTelegram } = config

async function createTonWallet() {
  const mnemonic = await tonMnemonic.generateMnemonic()
  const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic)
  const { publicKey, secretKey } = keyPair
  const wallet = tonweb.wallet.create({ publicKey })
  const addr = await wallet.getAddress()
  const address = addr.toString(true, true, true, false)

  if (showEveryWallet) {
    console.log(address)
  }

  if (!endings.some(end => address.endsWith(end))) {
    return createTonWallet()
  }

  /* Сохраняем красивый кошелёк */
  const name = address.slice(address.length - 10)
  const mnemonicPharse = `'${mnemonic.join("', '")}'`
  const mnemonicFunction = 'const words = [' + mnemonicPharse + '].map((word, i) => document.getElementById(importsInput + i).value = word)'

  fs.mkdirSync(`./wallets/${name}`, { recursive: true })
  fs.writeFileSync(`./wallets/${name}/manual.txt`, `https://wallet.ton.org\nImport existing wallet\n${mnemonicFunction}`)
  fs.writeFileSync(`./wallets/${name}/secret.js`, `export const address = '${address}'`)

  if (notifyInTelegram) {
    notify(address, mnemonicFunction)
  }

  console.log(address)

  if (stopAfterFirstWallet) {
    process.exit(0)
  }

  createTonWallet()
}

createTonWallet()