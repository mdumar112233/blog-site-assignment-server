const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij0ac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


 app.get('/', (req, res) => {
    res.send('Hello new node start here!')
  })

client.connect(err => {
  const BlogCollection = client.db("house-blog-site").collection("blog-content");

  app.post('/blogInfo', (req, res) => {
    const blogInfo = req.body;
    BlogCollection.insertOne(blogInfo)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/blogData', (req, res) => {
    BlogCollection.find({})
      .toArray((err, documents) => {
          res.send(documents)
      })
  })

  app.get('/fullBlog/:id', (req, res) => {
    BlogCollection.find({id: req.params._id})
      .toArray((err, documents) => {
          res.send(documents)
      })
  })

  app.delete('/delete/:id', (req, res) => {
    BlogCollection.deleteOne({_id: ObjectID(req.params.id)})
    .then(result => {
      res.send(result.deletedCount > 0);
    })
  })

});



app.listen(port)