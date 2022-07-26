const client = require("../Src/Connect");
const qrcode = require('qrcode-terminal');
console.log('Main Carregada')

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente Ligado!');
});

client.on('disconnected', (reason) => {
    console.log('Cliente Desconectado', reason);
});