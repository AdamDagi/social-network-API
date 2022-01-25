const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// app.use(routes);
async function start() {
    await mongoose.connect(`mongodb+srv://AdamDagi:${Password}@cluster0.j80q4.mongodb.net/socialNetworkApi?retryWrites=true&w=majority`)
    app.listen(PORT, () => console.log('Now listening'));
}

start();