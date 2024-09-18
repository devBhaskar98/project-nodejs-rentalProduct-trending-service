const createTrendingTable = `
    CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL
    );
`;

export default createTrendingTable;