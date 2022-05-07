import express from 'express'
const app: express.Express = express();
import { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const port = process.env.PORT;
app.get('/', async (req: Request, res: Response) => {
    const { contractAddress } = req.query
    const now = Date.now();
    const days = 7;
    try {
        const result = await axios.get(
            `https://project.apespace.workers.dev/pairs/${contractAddress}/volume/daily?to=${now}&num=${days}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.APIKEY}`
                }
            }
        )
        res.json(result.data)
    }catch (err) {
        res.sendStatus(500)
    }
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})