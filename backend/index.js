const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json()); 

app.use(cors({
  origin: 'https://iproducts-two.vercel.app',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use('/api/auth', require('./Route/Auth'))
app.use('/api/products', require('./Route/Products'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})