const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const authenticateJWT = require('./middleware/auth');

const register = require('./routes/auth/Register');
const login = require('./routes/auth/Login');

const host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;

mongoose.connect(`mongodb://${host}:${db_port}/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

const app = express();

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(express.json());
app.use(cors());

app.use('/register', register);
app.use('/login', login);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`http://localhost:${port}`));