import mySqlDb from './mySqlDb.js';

let utilsDb = {};



utilsDb.getLastTaskId = async () => {
    const db = mySqlDb.getSqlDbConnection();
    return new Promise((resolve, reject) => {
        const query = `SELECT MAX(task_id) AS max_task_id FROM tasks`;

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching tasks:', err.stack);
                reject(err);
                return;
            }
            
            resolve(results[0]['max_task_id'] + 1); // increment the taskid
        });
    });
};

export default utilsDb;