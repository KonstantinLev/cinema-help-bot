const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const helper = require('./helpers');
const kb = require('./keyboard_buttons');
const keyboard = require('./keyboard');
const mongoose = require('mongoose');
const request = require('request');

helper.logStart();

// mongoose.connect(config.DB_URL, {
//
// }).then(() => {
//     console.log('MongoDB connected!');
// }).catch((err) => {
//     console.error(err);
// });

const bot = new TelegramBot(config.TOKEN, {
    polling: true
});



request('http://api.kinopoisk.cf/getFilm?filmID=714888',  (error, response, body) => {
    console.log('Status:', body);
});

bot.on('message', msg => {

    const chatId = helper.getChatId(msg);

    switch(msg.text){
        case kb.home.favourite:

            break;
        case kb.home.films:
            bot.sendMessage(chatId, `Выберите жанр:`, {
                reply_markup: {
                    keyboard: keyboard.films
                }
            });
            break;
        case kb.home.cinemas:

            break;
        case kb.back:
            bot.sendMessage(chatId, `Вернулись на главную`, {
                reply_markup: {
                    keyboard: keyboard.home
                }
            });
            break;
    }

});

bot.onText(/\/start/, msg => {
    const text = `Здравствуйте, ${msg.from.first_name}\n Выберите команду для начала работы:`
    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    });
});