// const youtubeLogger = require('./youtubeLogger')
// const productionLogger = require('./productionLogger')

import devLogger from "./devLogger.js";
import TodoLogger from "./loggers.js";

let logger = null;

if (process.env.NODE_ENV === "development") {
    console.log(`logger() setup for ${process.env.NODE_ENV}`)
    logger = devLogger()
}

if (process.env.NODE_ENV === "production") {
    // logger = productionLogger()
    console.log('ENV is yet to be setup')
}

logger.todoLogger = () => {
    return TodoLogger();
}

export default logger;