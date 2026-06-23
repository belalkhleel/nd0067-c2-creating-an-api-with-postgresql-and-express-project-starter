import express, { Request, Response } from 'express';
import { ProductModel } from '../models/product';
import { authenticateToken } from './helpers';


const productModel = new ProductModel();

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productModel.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.index();
        res.json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productModel.show(parseInt(req.params.id)); 
        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
};



export default function productRoutes(app: express.Application) {
    app.post('/products', authenticateToken, createProduct);
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
};

