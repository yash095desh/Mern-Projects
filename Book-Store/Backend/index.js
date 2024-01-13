import express from 'express'
import { port ,databaseURL} from "./conf.js";
import mongoose from 'mongoose';
import { Books } from './modals/booksModel.js';
import booksRouter from './Routes/booksRoute.js'

const app = express();

app.use(express.json())

app.use('/books',booksRouter)

app.get('/',(req,res)=>{
    return res.status(234).send('Welcome to Mern Tutorial')
})


mongoose.connect(databaseURL)
.then(()=>{
    console.log('database connected')
    app.listen(port,()=>{
        console.log(`listning on port ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})

