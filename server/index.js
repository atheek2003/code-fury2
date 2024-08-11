// const express = require("express");
// const app = express();
// const cors = require("cors");
// // require("dotenv").config();
// const client = require("twilio")("ACc66ef3fed50afd616b46223cc029cc19", "77d460002b8a8892f44656363595530c");

// // app.use(cors());

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// function sendMessage(number, text) {
//   client.messages
//     .create({
//       body: text,
//       to: number,
//       from: "+18542467449",
//     })
//     .then((mes) => console.log(mes))
//     .catch((err) => console.log(err));
// }

// app.get("/", (req, res) => {
//   // sendMessage();
//   res.send(`<h1>Hello From Backend</h1>`);
// });

// app.post("/", (req, res) => {
//   // console.log(req.body);
//   try {
//     const { num, text } = req.body;
//     let numi;
//     if (num !== "" && text !== "") {
//       numi = "+" + num;
//     }
//     sendMessage(numi, text);
//     res.send("Success Sended");
//   } catch (error) {
//     res.send(error.message);
//   }
// });

// // app.listen(5000, () => {
// //   console.log("Started");
// // });


// // For local development
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(5000, () => {
//     console.log("Started on port 5000");
//   });
// }

// // Export the Express API
// module.exports = app;


const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const client = twilio("ACc66ef3fed50afd616b46223cc029cc19", "77d460002b8a8892f44656363595530c");

function sendMessage(number, text) {
  return client.messages
    .create({
      body: text,
      to: number,
      from: "+18542467449",
    })
    .then((mes) => console.log(mes))
    .catch((err) => console.log(err));
}

app.get("/", (req, res) => {
  res.send(`<h1>Hello From Backend</h1>`);
});

app.post("/", async (req, res) => {
  try {
    const { num, text } = req.body;
    if (!num || !text) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const numi = "+" + num.replace(/\D/g, '');
    await sendMessage(numi, text);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send message", details: error.message });
  }
});

// Export the Express API
module.exports = app;

