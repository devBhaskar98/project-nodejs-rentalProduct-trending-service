import db from "../../db/index.js"

const create = async ({
    title,
    status,
}) => {
    const query = `
        INSERT INTO
            news (title, status)
        VALUES
            ($1, $2)
        RETURNING *
    ;`;

    const result = await db.query(query, [title, status]);

    return result.rows[0];
}

const findOne = async (id) => {
    const query = `
        SELECT * FROM
            news
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [+id]);

    return result.rows[0];
}

const findAll = async () => {
    const query = `
        SELECT * FROM
            news
    ;`;

    const result = await db.query(query);

    return result.rows;
}

const updateOne = async (id, { title, status }) => {
    const query = `
        UPDATE
            news
        SET
            title = $2,
            status = $3
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [+id, title, status]);

    return result.rows[0];
}

const deleteOne = async (id) => {
    const query = `
        DELETE FROM
            news
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [+id]);

    return result.rows[0];
}

export default {
    create,
    findOne,
    findAll,
    updateOne,
    deleteOne,
}