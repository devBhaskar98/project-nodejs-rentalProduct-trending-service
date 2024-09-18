import db from "../index.js"
import createTrendingTable from "./1_create-trending-table.js";

const runDbMigrations = async () => {
  console.log('BEGIN DB MIGRATION');

  // use single client forn transactions
  const client = await db.connect()

  try {
    await client.query('BEGIN'); // begin transaction

    await client.query(createTrendingTable);

    await client.query('COMMIT') // commit transaction

    console.log('END DB MIGRATION');
  } catch (e) {
    await client.query('ROLLBACK') // rollback transaction

    console.log('DB migration failed');

    throw e
  } finally {
    client.release()
  }
}

export default runDbMigrations;