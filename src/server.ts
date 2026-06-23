import express from 'express';
import type { Request, Response } from 'express';
import bodyParser from 'body-parser'
import userRoutes from './handlers/user';
import productRoutes from './handlers/products';

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(bodyParser.json())


userRoutes(app) ;
productRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
