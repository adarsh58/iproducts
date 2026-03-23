require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json()); 

const allowedOrigins = [
  'https://iproducts-two.vercel.app',
  'https://iproducts-m8sv.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy does not allow this origin.'), false);
    }
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use('/api/auth', require('./Route/Auth'))
app.use('/api/products', require('./Route/Products'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})