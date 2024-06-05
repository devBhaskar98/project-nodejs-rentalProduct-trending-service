import express from 'express';
import http from 'http';
import router from './routes/main.js';

const app = new express();

app.use('/', router);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
console.log(`Server listening on ${port}`);
server.listen(port);
