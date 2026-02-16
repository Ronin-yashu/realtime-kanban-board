import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const httpserver = createServer(app)
const io = new Server(httpserver, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

let tasks = []
let taskid = 1

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'no file uploaded' })
  }
  res.json({ 
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  })
})

app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

io.on('connection', (socket) => {
  console.log('user connected:', socket.id)
  
  socket.emit('tasks:init', tasks)
  
  socket.on('task:create', (taskdata) => {
    const newtask = {
      id: taskid++,
      title: taskdata.title,
      description: taskdata.description,
      status: taskdata.status || 'todo',
      priority: taskdata.priority || 'medium',
      category: taskdata.category || 'feature',
      file: taskdata.file || null,
      createdat: new Date().toISOString()
    }
    tasks.push(newtask)
    io.emit('task:created', newtask)
  })
  
  socket.on('task:update', (data) => {
    const taskindex = tasks.findIndex(t => t.id === data.id)
    if (taskindex !== -1) {
      tasks[taskindex] = { ...tasks[taskindex], ...data.updates }
      io.emit('task:updated', tasks[taskindex])
    }
  })
  
  socket.on('task:move', (data) => {
    const taskindex = tasks.findIndex(t => t.id === data.id)
    if (taskindex !== -1) {
      tasks[taskindex].status = data.status
      io.emit('task:moved', { id: data.id, status: data.status })
    }
  })
  
  socket.on('task:delete', (taskid) => {
    tasks = tasks.filter(t => t.id !== taskid)
    io.emit('task:deleted', taskid)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3000

httpserver.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
