import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import projectRoutes from './routes/projectRoutes.js'
import userRoutes from './routes/userRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import fileRoutes from './routes/fileRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)
app.use('/api/company',companyRoutes)
app.use('/api/file',fileRoutes)
app.use('/api/company',companyRoutes)


const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.sendFile('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
