const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
//routes

app.get('/', (req, res) => {
    res.send('teste')
})

app.get('/blog', (req, res) => {
    res.send('hello blog')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: ErrorEvent.message})
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}) 

//update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        //We cannot find product by ID
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`}) 
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



mongoose.connect('mongodb+srv://admin:pedroh2602@devtaminapi.hu89vih.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`)
        })
    }).catch((error) => {
        console.log(error)
    }) 