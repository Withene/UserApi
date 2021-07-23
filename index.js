const express = require('express');
const app = express();
const router = require('./routes/routes');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '.env' });
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando');
});
