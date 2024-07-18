import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import { workoutsRoutes } from "./routes/workouts.js";
import { usersRoutes } from "./routes/user.js";

import path from 'path';
import { fileURLToPath } from "url";

// resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', usersRoutes )

// use the client
app.use(express.static(path.join(__dirname, '/client/build')))

// render client for any path 
app.get('*', (req,res) => res.sendFile((__dirname, '/client/build/index.html')))



// connect to db
mongoose.connect(process.env.MONGO_URI, {dbName: "Cluster0"})
  .then(() => {
    // listen to port  // listen for requests
    app.listen(4000,  () => {
      console.log('connected to db $ listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
