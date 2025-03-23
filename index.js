const wa = require('@open-wa/wa-automate');

wa.create({
  sessionId: "WHATSAPP_SESSION",
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  qrTimeout: 0,
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Привет!');
    }
  });
}
