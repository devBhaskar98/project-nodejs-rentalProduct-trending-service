import mySqlDb from './mySqlDb.js';

const getLastTaskId = async () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT MAX(task_id) AS max_task_id FROM tasks`;

        mySqlDb.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching tasks:', err.stack);
                reject(err);
                return;
            }
            
            resolve(results[0]['max_task_id'] + 1); // increment the taskid
        });
    });
};


export {
    getLastTaskId
}