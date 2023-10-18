import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


export function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}