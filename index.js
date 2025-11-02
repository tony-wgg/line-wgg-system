const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 10000;
const axios = require("axios");

// LINE Access Token
const LINE_ACCESS_TOKEN = "ใส่โทเคนจาก LINE Developers ตรงนี้";

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  try {
    const events = req.body.events;
    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const replyToken = event.replyToken;
        const userMessage = event.message.text;

        await axios.post(
          "https://api.line.me/v2/bot/message/reply",
          {
            replyToken: replyToken,
            messages: [
              {
                type: "text",
                text: `คุณพิมพ์ว่า: ${userMessage}`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
            },
          }
        );
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Line bot is running 🚀");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
