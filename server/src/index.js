require('./server/dbMongo/mongoose');
const http = require('http');
const express = require('express');
const router = require('./server/router');
const cors = require('cors');
const controller = require('./socketInit');
const errorsHandler = require('./server/handlerError/errorsHandler');
const errorsHandleLogger = require('./server/loggers/errorsHandleLogger');

const PORT = process.env.PORT || 9632;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);

app.use(errorsHandleLogger);
app.use(errorsHandler);

const server = http.createServer(app);
server.listen(PORT/*,
  () => console.log(`Example app listening on port ${ PORT }!`)*/);
controller.createConnection(server);


