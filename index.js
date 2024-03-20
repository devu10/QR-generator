import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import express from "express";
const app = express();
const port = 3000;

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
  console.log(req.rawHeaders);
  res.send("<h1>test Success</h1>");
});

app.get("/qr", (req, res) => {
  console.log(req.header);
  res.send("<h2>QR code</h2>");
});

app.listen(port, () => {
  console.log("Server on port 3000");
});
