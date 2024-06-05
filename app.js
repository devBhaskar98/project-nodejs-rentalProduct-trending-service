import express from 'express';
import http from 'http';
import {db} from './db/mySqlDb.js'

import mainRoutes from './routes/main.js';
import todoRoutes from './routes/todo.js';

const app = new express();

app.use('/', mainRoutes);
app.use('/todo', todoRoutes);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
console.log(`Server listening on ${port}`);
server.listen(port);
