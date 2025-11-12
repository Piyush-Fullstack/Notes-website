const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use('/api/auth',authRoutes);    
app.use('/api/tasks',taskRoutes);    
module.exports = app;