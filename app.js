import express from 'express';
import http from 'http';
import mainRoutes from './routes/main.js';
import todoRoutes from './routes/todo.js';
import swaggerUI from 'swagger-ui-express';
import {swaggerSpec} from './swagger.js';
import logger from './logger/index.js';



const app = new express();
/*###########################################
MIDDLEWARE
###########################################*/

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/health-check', (req, res) => {
    logger.info("information log");
    res.status(200).send({status: "Fun todo service NodeJs is running...!!!!"})
    logger.info("TEST");
})
app.use('/', mainRoutes);
app.use('/todo', todoRoutes);

/*###########################################
GLOBAL HANDLERS
###########################################*/

// Catch-all middleware for unknown routes
app.use((req, res) => {
    res.status(404).send({
        msg: 'route undefined'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).send('500 - Internal Server Error');
});
  
// Example route that throws an error


/*###########################################
APP START
###########################################*/
const port = process.env.SERVER_PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
console.log(`Server listening on ${port}`);
server.listen(port);
