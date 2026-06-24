import express, { Request, Response } from 'express';
import { OrderProduct, OrderStore } from '../models/order';
import { authenticateToken } from './helpers';

const orderStore = new OrderStore();

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.create(req.body);
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create order' });
    }
};

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const orderProduct: OrderProduct = {
            order_id: parseInt(req.params.id),
            product_id: req.body.product_id,
            quantity: req.body.quantity
        };
        const added = await orderStore.addProduct(orderProduct);
        res.json(added);
    } catch (err) {
        res.status(400).json({ message: 'Failed to add product to order' });
    }
};

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.currentOrderByUser(parseInt(req.params.userId));
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: 'Failed to get current order by user' });
    }
};

const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.update(parseInt(req.params.id), req.body.status);
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update order' });
    }
};

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.delete(parseInt(req.params.id));
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete order' });
    }
};

export default function orderRoutes(app: express.Application) {
    app.post('/orders', authenticateToken, createOrder);
    app.post('/orders/:id/addProducts', authenticateToken, addProductToOrder);
    app.get('/orders/users/:userId', authenticateToken, getCurrentOrderByUser);
    app.put('/orders/:id', authenticateToken, updateOrder);
    app.delete('/orders/:id', authenticateToken, deleteOrder);
};