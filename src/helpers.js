module.exports = {
    logStart() {console.log('Bot has been started...')},
    getChatId(msg) {return msg.chat.id},
    getItemUuid(src){return src.substr(2, src.length)}
}