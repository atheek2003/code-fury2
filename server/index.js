const express = require("express");
const app = express();
const cors = require("cors");
// require("dotenv").config();
const client = require("twilio")("ACc66ef3fed50afd616b46223cc029cc19", "77d460002b8a8892f44656363595530c");

app.use(cors());
app.use(express.json());

function sendMessage(number, text) {
  client.messages
    .create({
      body: text,
      to: number,
      from: "+18542467449",
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
