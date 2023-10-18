import pg from "pg";
import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const {Pool} = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,

});



app.post("/register", async (req, res) => {
    const {name, password} = req.body;

    if(!name || !password) {
        return res.status(404).json({error: "Missing fields"});
    }

    let hashedPassword;
    try {
        hashedPassword = await  bcrypt.hash(name, 10);
    } catch(err) {
        return res.status(500).json({message: "Couldn't create user"});
    }

    try {
        if(!hashedPassword) {
            throw new Error();
        }
        await pool.query('INSERT INTO users (name, password) VALUES($1, $2)', [name, hashedPassword]);
        return res.status(200).json({message: "User saved successfully"})
    } catch (err) {
        res.status(500).json({message: "Couldn't create user"});
    }
});

app.listen(port, () => {
    console.log(`Express started on port: ${port}`)
})



async function cleanup() {
    try {
        await pool.end();
    } finally {
        process.exit(0);
    }
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
