import dotenv from 'dotenv';
dotenv.config();

import jwt ,{Secret} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {User} from '../models/user';

const secretKey: Secret = process.env.JWT_SECRET as Secret;



export const generateToken = (user: User): string => {
    return jwt.sign({user}, secretKey, { expiresIn: '1h' });
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Access token is missing' });
        }
        jwt.verify(token, secretKey);
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid access token' });
    }};

