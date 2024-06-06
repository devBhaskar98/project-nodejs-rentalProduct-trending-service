import express from 'express';
import http from 'http';
import mainRoutes from './routes/main.js';
import todoRoutes from './routes/todo.js';
import swaggerUI from 'swagger-ui-express';
import {swaggerSpec} from './swagger.js'

const app = new express();

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health-check', (req, res) => {
    res.status(200).send({status: "Fun todo service NodeJs is running...!!!!"})
})

app.use('/', mainRoutes);
app.use('/todo', todoRoutes);

const port = process.env.SERVER_PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
console.log(`Server listening on ${port}`);
server.listen(port);
