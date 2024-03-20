import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

function testQr() {
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

app.get("/", (req, res) => {
  console.log(__dirname);
  // res.send("<h1>QR Code Home</h1><br><p>Form for qr</p>");
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log("Server on port 3000");
});
