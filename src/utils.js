import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

utils.setupEnv = async () => {
  return new Promise((resolve, reject) => {
    try {
      // Convert import.meta.url to file path
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      // Load the correct .env file based on the NODE_ENV environment variable
      if (process.env.NODE_ENV === 'production') {
        console.log('Node app running in production');
        dotenv.config({ path: resolve(__dirname, 'prod.env') }); // Resolve the correct path to prod.env
      } else {
        console.log('Node app running in development mode');
        dotenv.config({ path: resolve(__dirname, 'dev.env') }); // Resolve the correct path to dev.env
      }

      // Resolve the promise once dotenv is configured
      resolve(true);
    } catch (error) {
      reject(error); // Reject the promise if an error occurs
    }
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