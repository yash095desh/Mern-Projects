import express from "express";
import { Books } from "../modals/booksModel.js";

const router = express.Router()


router.get('/',async(req,res)=>{
    try {
        const books = await Books.find({})
        return res.status(201).send({
            count : books.length,
            data : books,
        })

    } catch (error) {
        console.log(err.message)
        return res.send({
            error: error.message
        })
    }
})
router.get('/:id',async(req,res)=>{
   try {
    const {id} = req.params;
    const book = await Books.findById(id) ;
    return res.send({
        data:book
    })
   } catch (error) {
    console.log(error)
    return res.send({
        error : error.message
    })
   }
})

router.post('/',async(req,res)=>{
    try {
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send({
                message : 'send all required feilds : title,author,publishYear'
            })
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        }

        const book = await Books.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message)
    }
})
router.put('/:id',async(req,res)=>{
    try {
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send("msg ::please send required details: title,author,publishYear")
        }
        const {id} = req.params;
        const result = await Books.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(400).send("can't Connect to server")
        }
        {
            return res.status(201).send(`updated Sucsessfully${result}`)
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const result = await Books.findByIdAndDelete(id)
        return res.status(201).send(`Deleted Sucsessfully  ${result}`)

    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
})

export default router