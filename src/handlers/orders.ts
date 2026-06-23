import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { authenticateToken } from './helpers';

const orderStore = new OrderStore();


const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.create(req.body);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to create order' });
    }
};


const addProductToOrder = async (req: Request, res: Response) => {
try{    const orderId = parseInt(req.params.id);
    res.status(200).json({ message: `Product added to order ${orderId}` });
}catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to add product to order' });}

}


const getcurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const order = await orderStore.currentOrderByUser(userId);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to get current order by user' });
    }
};


export default function orderRoutes(app: express.Application) {
    app.post('/orders', authenticateToken, createOrder);
    app.post('/orders/:id/products', authenticateToken, addProductToOrder);
    app.get('/orders/users/:userId', authenticateToken, getcurrentOrderByUser);
}
