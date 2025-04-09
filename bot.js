const https = require("https");

const TOKEN = "7823952305:AAEQr6TmCkGhtAvpk8dhDgjtajI4JVac2LE"; // Bot token'ını buraya yaz
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

function sendMessage(chatId, text) {
  const data = JSON.stringify({
    chat_id: chatId,
    text: text
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = https.request(options, (res) => {
    res.on("data", () => {});
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const body = req.body;

    const chatId = body.message.chat.id;
    const text = body.message.text;

    if (text.toLowerCase().includes("sipariş")) {
      sendMessage(chatId, "Siparişinizi alıyorum. Ne sipariş etmek istersiniz?");
    } else {
      sendMessage(chatId, "Merhaba! Sipariş vermek için 'sipariş' yazabilirsiniz.");
    }

    res.status(200).send("OK");
  } else {
    res.status(200).send("Bu endpoint sadece POST içindir.");
  }
};