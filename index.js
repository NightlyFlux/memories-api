import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postsRoutes from './routes/PostRouter.js'
dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({ origin: 'https://memories-client-app.netlify.app/' }))

app.use('/posts', postsRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to Memories API')
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log(`Connected to the database: ${response.connection.name}`)
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
