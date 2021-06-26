const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij0ac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());




client.connect(err => {
  const BlogCollection = client.db("house-blog-site").collection("blog-content");

  app.get('/', (req, res) => {
    res.send('Hello new node start here!')
  })
  
  app.get('/hotelInfo', (req, res) => {
    hotelCollection.find({})
      .toArray((err, documents) => {
          res.send(documents)
      })
  })

  app.get('/singleHotel/:id', (req, res) => {
    hotelCollection.find({id: req.params.id})
      .toArray((err, documents) => {
          res.send(documents)
      })
  })

});



app.listen(port)