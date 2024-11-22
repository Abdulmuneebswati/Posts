const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./routes");
process.on('uncaughtException', (e) => {
  console.log(e);
});


const app = express();


app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors()); 



app.use('/api', router);


app.use((err, req, res, next) => {
  
  // for now log the error and return 500; need to handle it differently in future
  if (res.headersSent) {
    return next(err);
  }
  
  return res.status(err.status || err.code || 500).send({
    code: err.status || err.code || 500,
    success: false,
    message: err.message,
  });
});

module.exports = app;