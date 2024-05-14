const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const cities = [
  { name: 'Orem', population: 83401 },
  { name: 'Provo', population: 116618 },
  { name: 'Salt Lake City', population: 200567 },
];
const authToken = 'secret-token';

app.post('/login', (req, res) => {
  res.cookie('token', authToken, { expires: new Date(Date.now() + 900000) });
  res.json({ message: 'Success' });
});

app.get('/cities', (req, res) => {
  res.json(cities);
});

app.post('/cities', (req, res) => {
  const token = req.cookies.token;
  if (token === authToken) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  cities.push(req.body);

  res.json(cities);
});

module.exports = app;
