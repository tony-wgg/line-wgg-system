const express = require("express");
const app = express();

app.use(express.json());

// ✅ Route สำหรับตรวจสอบจาก LINE
app.post("/webhook", (req, res) => {
  console.log("Received webhook event:", req.body);
  res.sendStatus(200); // ต้องตอบกลับ 200 ให้ LINE
});

// ✅ หน้าแรก (ทดสอบเปิดในเบราว์เซอร์)
app.get("/", (req, res) => {
  res.send("LINE Webhook is working!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
