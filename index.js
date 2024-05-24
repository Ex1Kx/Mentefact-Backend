const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint para crear el PDF
app.post('/create-pdf', (req, res) => {
  const html = req.body.html;
  const options = { format: 'Letter' };

  pdf.create(html, options).toFile('mentefacto.pdf', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendFile(path.resolve(result.filename));
  });
});

// Heroku asignará un puerto a tu aplicación, usaremos ese puerto o el 5000 en local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`);
});
