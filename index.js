const fs = require('fs');
const wa = require('@open-wa/wa-automate');

const sessionPath = '/app/storage/session.data.json';

let sessionData = null;
if (fs.existsSync(sessionPath)) {
  try {
    sessionData = JSON.parse(fs.readFileSync(sessionPath));
  } catch (e) {
    console.error('Ошибка при чтении session.data.json:', e);
  }
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

  // 🔥 Включаем API для n8n
  apiHost: '0.0.0.0',
  customPort: 8080,
  enableLocalhost: true,

  // 💬 Вебхук на входящие (опционально)
  // webhook: {
  //   url: "https://n8n.yourdomain.com/webhook/whatsapp",
  //   events: ['onMessage']
  // }
}).then(client => {
  // Автосохранение сессии
  client.getSessionData().then(data => {
    fs.writeFileSync(sessionPath, JSON.stringify(data));
  });

  start(client);
});

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Привет от OpenWA!');
    }
  });
}
