import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import {cleanup, createUser, getUser} from "./db";
import jwt from "jsonwebtoken";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/register", async (req: express.Request, res: express.Response) => {
    const {name, password} = req.body;

    if(!name || !password) {
        return res.status(404).json({error: "Missing fields"});
    }

    let hashedPassword;
    try {
        hashedPassword = await  bcrypt.hash(password, 10);
    } catch(err) {
        return res.status(500).json({message: "Couldn't create user"});
    }

    console.log(hashedPassword.length)

    try {
        if(!hashedPassword) {
            throw new Error();
        }
        await createUser(name, hashedPassword);
        return res.status(200).json({message: "User saved successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Couldn't create user"});
    }
});

app.post('/login', async (req: express.Request, res: express.Response) => {
    const { name, password } = req.body;
    if(!name || !password) {
        return res.status(500).json({message: "Missing fields"});
    }

    let user = await getUser(name);

    if(!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password).catch((err) => {
        console.error('Error comparing passwords:', err);
        return false; // Handle the error appropriately
    });

    if(!passwordMatch) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    if(process.env.JWT_SECRET) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token});
    } else {
        res.status(500).json({message: "Internal server error"});
    }
});

app.listen(port, () => {
    console.log(`Express started on port: ${port}`)
})




process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
