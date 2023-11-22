const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Endpoint para loguear datos
app.post('/log', (req, res) => {
  const currentTimestamp = new Date().toISOString();

  const logData = { timestamp: currentTimestamp, ...req.body };
  const logString = JSON.stringify(logData) + '\n';

  // Loguear en consola
  console.log(logString);

  // Loguear en archivo log.txt
  fs.appendFile('log-data/logs.txt', logString, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo log.txt', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.status(200).send('Registro exitoso');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
