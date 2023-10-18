import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const {Pool} = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

export async function createUser(name, hashedPassword) {
    await pool.query('INSERT INTO users (name, password) VALUES($1, $2)', [name, hashedPassword]);
}


export async function getUser(name) {
    const query = 'SELECT * FROM users WHERE name = $1';
    const values = [name];
    const result = await pool.query(query, values);

    return result.rows[0];
}

export async function cleanup() {
    try {
        await pool.end();
    } finally {
        process.exit(0);
    }
}