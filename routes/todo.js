import {Router} from 'express';
import mySqlDb from '../db/mySqlDb.js';
import mongoDb from '../db/mongoDb.js'
import utils from '../utils.js'
import Task from '../db/schema/task.js'
import logger from '../logger/index.js';

// populate the mongoDb
mongoDb.connectDB();
// mongoDb.populateMongoDb();

const todoLogger = logger.todoLogger();

const router = Router();


router.get('/tasks', utils.paginatedResults(Task), (req, res) => {
    res.json(res.paginatedResults)
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of tasks
 *     description: Retrieve a list of tasks from the mySql database.
 *     responses:
 *       200:
 *         description: Successful response with a list of tasks.
 */
router.get('', (req,res) => {
    todoLogger.info("get all the task")
    mySqlDb.getAllTasks((err, tasks) => {
        if (err) {
            console.error('Error getting tasks:', err);
            return;
        }
        res.send(tasks);
    });
});

/**
 * save task
 */
router.post('', async (req,res) => {
    const data = JSON.parse(JSON.stringify(req.body, null, 2));

    // Example usage: Save a new task
    const newTask = {
        name: data.name,
        description: data.description || 'NA',
        completed: data.completed || false,
        important: data.important || false,
        created_dt: new Date(),
        updated_dt: null
    };

    await mySqlDb.saveTask(newTask, (err, result) => {
        if (err) {
            console.error('Error saving task:', err);
            return;
        }

        if(result.taskId) {
            mySqlDb.getTask(result.taskId, (err, task) => {
                if (err) {
                    console.error('Error getting tasks:', err);
                    res.status(500).send({ error: 'An error occurred while retrieving the task.' });
                    return;
                }
        
                if(task.length <= 0) {
                    res.status(404).send({ error: 'Task id not found' }); 
                }
                
                let response = {
                    msg: "Task saved successfully",
                    output: task
                }
        
                res.send(response);
            })
        }
    });
});

/**
 * @swagger
 * /task/{taskId}:
 *   get:
 *     summary: Get a task
 *     description: Retrieve a specific task by ID.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 important:
 *                   type: boolean
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 updatedDate:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.get('/task/:taskId', (req, res) => {
    // Retrieve the taskId from the URL parameters
    const taskId = req.params.taskId;
    mySqlDb.getTask(taskId, (err, task) => {
        if (err) {
            console.error('Error getting tasks:', err);
            res.status(500).send({ error: 'An error occurred while retrieving the task.' });
            return;
        }

        if(task.length <= 0) {
            res.status(404).send({ error: 'Task id not found' }); 
        }

        res.send(task);
    })
    
});

export default router;