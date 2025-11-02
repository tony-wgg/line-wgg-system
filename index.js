const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const LINE_ACCESS_TOKEN = "ใส่ Channel access token ตรงนี้"; // 👈 สำคัญมาก

app.post("/webhook", async (req, res) => {
  try {
    const events = req.body.events;
    for (let event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const replyToken = event.replyToken;
        const userMessage = event.message.text;

        // สร้างข้อความตอบกลับ
        const replyMessage = {
          replyToken: replyToken,
          messages: [
            {
              type: "text",
              text: `คุณพิมพ์ว่า: ${userMessage}`,
            },
          ],
        };

        // ส่งข้อความกลับไปที่ LINE
        await axios.post("https://api.line.me/v2/bot/message/reply", replyMessage, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
          },
        });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("LINE Webhook is active!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
