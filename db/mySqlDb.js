import mysql from 'mysql';
import {getLastTaskId} from './utils.js'

// Db setup
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin@123",
    database: "funtodos"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    // console.log('Connected to the database as id ' + db.threadId);
});

// Function to get all tasks
const getAllTasks = (callback) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err.stack);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

// Function to get all tasks
const getTask = (taskId, callback) => {
    const query = `SELECT * FROM tasks where task_id = ${taskId}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err.stack);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};



// Function to save a new task
const saveTask = async (task, callback) => {
    try {
        const task_id = await getLastTaskId();
        console.log('Id generated ', task_id);

        const { name, description, completed, important, created_dt, updated_dt } = task;

        const query = 'INSERT INTO tasks (task_id, name, description, completed, important, created_dt, updated_dt) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [task_id, name, description, completed, important, created_dt, updated_dt], (err, result) => {
            if (err) {
                console.error('Error saving task:', err.stack);
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};



export {
    db,
    getTask,
    getAllTasks,
    saveTask
}
