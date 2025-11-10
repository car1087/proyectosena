require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./interfaces/http/routes/auth');
const dashboardRoutes = require('./interfaces/http/routes/dashboard.routes');

const app = express();
const projectRoot = '/Users/user/Desktop/proyecto sena/proyectosena';

app.use(cors());
app.use(express.json());
app.use(express.static(projectRoot));

app.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error loading index.html');
        }
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});