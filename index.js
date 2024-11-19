const express = require('express');
const db = require('./src/database/db.js');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const alertRoutes = require('./src/v1/routes/AlertRoutes.js');
const appRoutes = require('./src/v1/routes/AppRoutes.js');
const tagRoutes = require('./src/v1/routes/TagRoutes.js');
const appTagRoutes = require('./src/v1/routes/AppTagRoutes.js');
const groupRoutes = require('./src/v1/routes/GroupRoutes.js');
const adminRoutes = require('./src/v1/routes/AdminRoutes.js');
const rolRoutes = require('./src/v1/routes/RoleRoutes.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

const port = 3000 || 8080;
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/alerts', alertRoutes);
app.use('/apps', appRoutes);
app.use('/tags', tagRoutes);
app.use('/app-tags', appTagRoutes);
app.use('/groups', groupRoutes);
app.use('/admin', adminRoutes);
app.use('/rol', rolRoutes);


app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM app');
        res.json(result.rows);  // Devuelve los datos de la base de datos
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error al obtener los usuarios');
      }
});



app.listen(port, '127.0.0.1', () => {
    console.log(`Server running on port ${port}`);
});