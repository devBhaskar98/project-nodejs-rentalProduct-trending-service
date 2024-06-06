import { URL } from 'url';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

let utils = {};

utils.setupEnv = async () => {
  return new Promise((resolve, reject) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      if(process.env.NODE_ENV === 'production') {
        console.log('Node app running in production')
        dotenv.config({ path: new URL('prod.env', import.meta.url) });
      } else {
        console.log('Node app running in development mode')
        dotenv.config({ path: new URL('dev.env', import.meta.url) });
      }

      

      // Resolve the promise after a short delay to ensure dotenv.config completes
      resolve(true);
  });
};


utils.paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}

utils.setupEnv();

export default utils;