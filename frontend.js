const express = require("express");
const app = express();
const fs = require("fs");
const frontEndPort = 4000;
// const frontEndPort = process.env.FE_PORT || 80;
const bodyParser = require('body-parser');
const ssl = process.env.SSL ? process.env.SSL : true;
var expressWinston = require("express-winston");
var winston = require("winston");
const { constants } = require("crypto");
const path = require("path");
const helmet = require("helmet");
const multer = require('multer');
const upload = multer();
var convert = require('xml-js');

const allowedMethods = ["GET", "HEAD", "POST"];
// Place the express-winston logger before the router.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
    expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            })
        ]
    })
);
app.use(
    helmet({
        frameguard: {
            action: "deny"
        }
    })
);

app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.post('/payment-transaction', upload.none(), async (req, res) => {
    // return res.send('<html><body>Hello</body></html>')
    // res.sendFile(path.join(__dirname, "dist/index.html"));
    // console.log(req);
    const formData = req.body;
    // console.log('form data', formData);
    let buff_a = new Buffer.from(formData.paymentResponse, 'base64');
    let xml_a = buff_a.toString('ascii');
    // console.log(text);
    let json_a = convert.xml2json(xml_a, { compact: true, spaces: 4 });
    let json_obj_a = JSON.parse(json_a);
    // console.log(json_b.PaymentResponse.payload._text);
    let buff_b = new Buffer.from(json_obj_a.PaymentResponse.payload._text, 'base64');
    let xml_b = buff_b.toString('ascii');
    // console.log(xml_b);
    let json_b = convert.xml2json(xml_b, { compact: true, spaces: 4 });
    let json_obj_b = JSON.parse(json_b);
    console.log(json_obj_b);
    let p_obj = {
        amt: json_obj_b.PaymentResponse.amt._text,
        uniqueTransactionCode: json_obj_b.PaymentResponse.uniqueTransactionCode._text,
        dateTime: json_obj_b.PaymentResponse.dateTime._text,
        status: json_obj_b.PaymentResponse.status._text
    }
    let p_json = JSON.stringify(p_obj);
    let p_buff = new Buffer.from(p_json);
    let param = p_buff.toString('base64');
    // console.log(xml_b);
    res.redirect(`${req.url}?param=${param}`)

})

if (ssl == "false") {
    const http = require("http");
    http.createServer(app).listen(frontEndPort, "0.0.0.0", function (err) {
        // console.log(`Ready on http://0.0.0.0:${frontEndPort}`);
    });
} else {
    app.disable("x-powered-by");
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With"
        );
        res.header(
            "Content-Security-Policy",
            "default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'"
        );
        res.header(
            "Strict-Transport-Security",
            "max-age=63072000; includeSubdomains; preload;"
        );

        //intercepts OPTIONS method
        if (!allowedMethods.includes(req.method)) {
            //respond with 200
            res.send(405);
        } else {
            //move on
            next();
        }
    });
    const https = require("https");
    const key = fs.readFileSync(__dirname + "/ssl/server.key");
    const cert = fs.readFileSync(__dirname + "/ssl/server.crt");
    const options = {
        key: key,
        cert: cert,
        secureOptions:
            constants.SSL_OP_NO_TLSv1 |
            constants.SSL_OP_NO_TLSv1_1 |
            constants.SSL_OP_NO_TLSv2 |
            constants.SSL_OP_NO_SSLv3
    };
    https
        .createServer(options, app)
        .listen(frontEndPort, "0.0.0.0", function (err) {
            // console.log(`> Ready on https://0.0.0.0:${frontEndPort}`);
            console.log(process.env)
            console.log(process.env.VUE_APP_TITLE)
            console.log(process.env.VUE_APP_CONFIG)
        });
}


// const express = require("express");
// const app = express();
// const fs = require("fs");
// const frontEndPort = process.env.FE_PORT || 80;
// const bodyParser = require('body-parser');
// const ssl = process.env.SSL ? process.env.SSL : true;
// var expressWinston = require("express-winston");
// var winston = require("winston");
// const { constants } = require("crypto");
// const path = require("path");
// const helmet = require("helmet");
// const multer = require('multer');
// const upload = multer();
// var convert = require('xml-js');

// const allowedMethods = ["GET", "HEAD", "POST"];
// // Place the express-winston logger before the router.

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());

// app.use(
//   expressWinston.logger({
//     transports: [
//       new winston.transports.Console({
//         json: true,
//         colorize: true
//       })
//     ]
//   })
// );
// app.use(
//   helmet({
//     frameguard: {
//       action: "deny"
//     }
//   })
// );

// app.use(express.static(__dirname + "/dist"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/index.html"));
// });

// app.post('/thankyou', upload.none(), async (req, res) => {
//   // return res.send('<html><body>Hello</body></html>')
//   // res.sendFile(path.join(__dirname, "dist/index.html"));
//   // console.log(req);
//   const formData = req.body;
//   // console.log('form data', formData);
//   let buff_a = new Buffer.from(formData.paymentResponse, 'base64');
//   let xml_a = buff_a.toString('ascii');
//   // console.log(text);
//   let json_a = convert.xml2json(xml_a, { compact: true, spaces: 4 });
//   let json_obj_a = JSON.parse(json_a);
//   // console.log(json_b.PaymentResponse.payload._text);
//   let buff_b = new Buffer.from(json_obj_a.PaymentResponse.payload._text, 'base64');
//   let xml_b = buff_b.toString('ascii');
//   // console.log(xml_b);
//   let json_b = convert.xml2json(xml_b, { compact: true, spaces: 4 });
//   let json_obj_b = JSON.parse(json_b);
//   // console.log(json_obj_b.PaymentResponse.status._text);
//   // console.log(json_obj_b.PaymentResponse.uniqueTransactionCode._text);
//   let status = json_obj_b.PaymentResponse.status._text;
//   let orderId = json_obj_b.PaymentResponse.uniqueTransactionCode._text;
//   // console.log(json_obj_a.PaymentResponse.payload._text);
//   // console.log(`${req.url}?orderId=${orderId}&status=${status}`);
//   res.redirect(`${req.url}?status=${status}`)
// })

// if (ssl == "false") {
//   const http = require("http");
//   http.createServer(app).listen(frontEndPort, "0.0.0.0", function (err) {
//     // console.log(`Ready on http://0.0.0.0:${frontEndPort}`);
//   });
// } else {
//   app.disable("x-powered-by");
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, Content-Length, X-Requested-With"
//     );
//     res.header(
//       "Content-Security-Policy",
//       "default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'"
//     );
//     res.header(
//       "Strict-Transport-Security",
//       "max-age=63072000; includeSubdomains; preload;"
//     );

//     //intercepts OPTIONS method
//     if (!allowedMethods.includes(req.method)) {
//       //respond with 200
//       res.send(405);
//     } else {
//       //move on
//       next();
//     }
//   });
//   const https = require("https");
//   const key = fs.readFileSync(__dirname + "/ssl/server.key");
//   const cert = fs.readFileSync(__dirname + "/ssl/server.crt");
//   const options = {
//     key: key,
//     cert: cert,
//     secureOptions:
//       constants.SSL_OP_NO_TLSv1 |
//       constants.SSL_OP_NO_TLSv1_1 |
//       constants.SSL_OP_NO_TLSv2 |
//       constants.SSL_OP_NO_SSLv3
//   };
//   https
//     .createServer(options, app)
//     .listen(frontEndPort, "0.0.0.0", function (err) {
//       // console.log(`> Ready on https://0.0.0.0:${frontEndPort}`);
//       console.log(process.env)
//       console.log(process.env.VUE_APP_TITLE)
//       console.log(process.env.VUE_APP_CONFIG)
//     });
// }