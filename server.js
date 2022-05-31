const express = require("express")
const http = require("http");
const cors = require("cors")


//express routing
const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
  }))
  

// localhost is the default value for 2nd argument
app.listen(8050, 'localhost', () => {
  console.log('listening for requests on port 8050');
});