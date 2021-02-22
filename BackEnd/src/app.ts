import express  from 'express'
import {router as users} from  './Routes/usersR'
import {router as events} from  './Routes/eventR'
import cors from 'cors'

const app = express()
const bodyParser = require ('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'token',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "http://localhost:4200",
    preflightContinue: false,
  };
app.use(cors(options))
module.exports = app.listen(3005)
app.use('/events',events)
app.use('/users',users)