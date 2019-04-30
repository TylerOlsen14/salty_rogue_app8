const express = require('express');// backend framework
const mongoose = require('mongoose');// ORM to interact with database
const bodyParser = require('body-parser');// allow requests and get data from body
const cors = require('cors')

const record = require('./routes/api/record')

const app = express();

app.use(cors())
//Bodyparser middleware
app.use(bodyParser.json());

// // DB config
// const db = require('./config/keys').mongoURI;

//connect to Mongo
mongoose
  .connect("mongodb://Tucker:Tucker@cluster0-shard-00-00-tihhu.mongodb.net:27017,cluster0-shard-00-01-tihhu.mongodb.net:27017,cluster0-shard-00-02-tihhu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected ... '))
  .catch(err => console.log(err));

  //use routes
app.use('/', record)

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server started on port ${port}`))
