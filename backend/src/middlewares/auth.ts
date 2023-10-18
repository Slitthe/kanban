import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";

dotenv.config();

interface UserToken {
    user?: string | jwt.JwtPayload;
}

export function authenticateToken(req: express.Request & UserToken, res: express.Response, next: express.NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401);
    }

    const secret = process.env.JWT_SECRET;

    if(secret) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if(user) {
                req.user = user;
            }
            next();
        });
    } else {
        res.status(500).json({message: "Internal server error"});
    }


}