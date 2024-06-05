import {Router} from 'express';
import { getTask, getAllTasks, saveTask } from '../db/mySqlDb.js';

const router = Router();

/**
 * get all tasks
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
 * get all tasks
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