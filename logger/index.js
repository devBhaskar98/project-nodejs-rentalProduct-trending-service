// const youtubeLogger = require('./youtubeLogger')
// const productionLogger = require('./productionLogger')

import devLogger from "./devLogger.js";

let logger = null;

if (process.env.NODE_ENV === "development") {
    console.log(`logger() setup for ${process.env.NODE_ENV}`)
    logger = devLogger()
}

if (process.env.NODE_ENV === "production") {
    // logger = productionLogger()
    console.log('ENV is yet to be setup')
}

export default logger;