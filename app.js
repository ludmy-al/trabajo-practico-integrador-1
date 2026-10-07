import 'dotenv/config'
import express from "express"
import { starBD } from './src/config/database.js'

const app = express()

const PORT = process.env.PORT || 6767



app.listen(PORT, async () =>  {
    await starBD()
    console.log("se prendio el server");
})