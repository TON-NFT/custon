const config = {
    // Список окончаний для адресов. В кавычках, через запятую
      endings: ['the', 'best', 'wallet', 'ever'],

    // Показывать ли все адреса что выпадают вне зависимости от окончания?
    // true – показывать, false – не показывать
    showEveryWallet: false,

    // Выключать ли скрипт после первого найденого кошелька?
    // true – выключать, false – не выключать
    stopAfterFirstWallet: false,

    // Уведомлять ли о найденных адресах в Telegram?
    // true – уведомлять, false – не уведомлять
    // ВАЖНО! Для правильной работы этого параметра, заполни все данные в config/tg.js
    notifyInTelegram: false,
}

export default config