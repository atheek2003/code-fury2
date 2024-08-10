const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const client = require("twilio")(process.env.SID, process.env.Auth);

app.use(cors());
app.use(express.json());

function sendMessage(number, text) {
  client.messages
    .create({
      body: text,
      to: number,
      from: "+15056753436",
    })
    .then((mes) => console.log(mes))
    .catch((err) => console.log(err));
}

app.get("/", (req, res) => {
  // sendMessage();
  res.send(`<h1>Hello From Backend</h1>`);
});

app.post("/", (req, res) => {
  // console.log(req.body);
  try {
    const { num, text } = req.body;
    let numi;
    if (num !== "" && text !== "") {
      numi = "+" + num;
    }
    sendMessage(numi, text);
    res.send("Success Sended");
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(5000, () => {
  console.log("Started");
});
