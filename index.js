const fs = require('fs');
const wa = require('@open-wa/wa-automate');

const sessionPath = './session.data.json';

let sessionData = null;
if (fs.existsSync(sessionPath)) {
  sessionData = require(sessionPath);
}

wa.create({
  sessionId: "WHATSAPP_SESSION",
  sessionData,
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  qrTimeout: 0,
}).then(client => {
  fs.writeFileSync(sessionPath, JSON.stringify(client.getSessionData()));
  start(client);
});

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Привет!');
    }
  });
}
