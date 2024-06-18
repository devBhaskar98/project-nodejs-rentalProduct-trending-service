import mysql from 'mysql';
import utilsDb from './utilsDb.js';

// Db setup
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin@123",
    database: "funtodos"
});

let mySqlDb = {};

mySqlDb.connectDB = async () => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('establishing connection with mysql db...' + db.threadId);
    });
}

// Function to get all tasks
mySqlDb.getAllTasks = (callback) => {
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
mySqlDb.getTask = (taskId, callback) => {
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
mySqlDb.saveTask = async (task, callback) => {
    try {
        const task_id =  await utilsDb.getLastTaskId();
        console.log('Id generated ', task_id);

        const { name, description, completed, important, created_dt, updated_dt } = task;

        const query = 'INSERT INTO tasks (task_id, name, description, completed, important, created_dt, updated_dt) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [task_id, name, description, completed, important, created_dt, updated_dt], (err, result) => {
            if (err) {
                console.error('Error saving task:', err.stack);
                callback(err, null);
                return;
            }
            result.taskId  = task_id;
            callback(null, result);
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};

mySqlDb.getSqlDbConnection = () => {
    return db;
}

mySqlDb.connectDB();

export default mySqlDb;