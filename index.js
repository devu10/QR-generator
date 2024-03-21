import qr from "qr-image";
import fs from "fs";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var qrmessage;

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(morgan("tiny")); //there few option for mogan like tiny or combined

function QrImageFile() {
  return inquirer
    .prompt([
      {
        message: "Type in your URL: ",
        name: "URL",
      },
    ])
    .then((answers) => {
      const url = answers.URL;
      var qr_img = qr.image(url);
      qr_img.pipe(fs.createWriteStream("qrimg.png"));
    })
    .catch((error) => {
      if (error.isTtyError) {
      } else {
      }
    });
}

function logger(req, res, next) {
  qrmessage = req.body["message"];
  console.log(
    "Request method: " +
      req.method +
      " Request URL: " +
      req.url +
      " Request body: " +
      req.body
  );
  next();
}

function generateQr(msg) {
  return qr.imageSync(msg, { type: "png" });
}

app.use(logger);

app.get("/", (req, res) => {
  // console.log(__dirname);
  // res.send("<h1>QR Code Home</h1><br><p>Form for qr</p>");
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  const qrimg = generateQr(qrmessage);
  const qrimgBase64 = qrimg.toString("base64");

  const imgSrc = `data:image/png;base64,${qrimgBase64}`;
  res.send(`<img src="${imgSrc}" alt="QR">`);
});

app.listen(port, () => {
  console.log("Server on port 3000");
});
