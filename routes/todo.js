import {Router} from 'express';
import { getTask, getAllTasks, saveTask } from '../db/mySqlDb.js';

const router = Router();

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
    getTask(taskId, (err, task) => {
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
    getAllTasks((err, tasks) => {
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
    // Example usage: Save a new task
    const newTask = {
        task_id: 3,
        name: 'New Task',
        description: 'This is a new task',
        completed: false,
        important: false,
        created_dt: new Date(),
        updated_dt: null
    };

    await saveTask(newTask, (err, result) => {
        if (err) {
            console.error('Error saving task:', err);
            return;
        }
        res.send("save successfully done");
    });
});

export default router;