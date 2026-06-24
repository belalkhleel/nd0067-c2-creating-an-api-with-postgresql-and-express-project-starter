import express, { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { generateToken, authenticateToken } from './helpers';

const userModel = new UserModel();

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.create(req.body);
        const token = generateToken(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, password } = req.body;
        const user = await userModel.authenticate(firstname, lastname, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.index();
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userModel.show(parseInt(req.params.id));
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.update(parseInt(req.params.id), req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.delete(parseInt(req.params.id));
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

export default function userRoutes(app: express.Application) {
    app.post('/users', createUser);
    app.post('/users/login', login);
    app.get('/users', authenticateToken, getAllUsers);
    app.get('/users/:id', authenticateToken, getUserById);
    app.put('/users/:id', authenticateToken, updateUser);
    app.delete('/users/:id', authenticateToken, deleteUser);
};