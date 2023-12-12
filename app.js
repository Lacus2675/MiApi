const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors'); 
const ejs = require('ejs');

app.use(express.json());
app.use(cors());
app.use('/images', express.static(__dirname + '/images')); //archivos estaticos desde la carpeta images

app.set('view engine', 'ejs'); // Establece EJS como el motor de vistas

// Ruta para obtener datos
app.get('/api/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON.');
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

// Ruta para obtener datos por ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id; // Obtén el ID de los parámetros de la URL

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON.');
      return;
    }

    const jsonData = JSON.parse(data);
    const item = jsonData.find(item => item.id === parseInt(id)); // Busca el elemento por ID

    if (!item) {
      res.status(404).send('No se encontró el elemento con el ID proporcionado.');
      return;
    }

    res.json(item);
  });
});

// Ruta para obtener datos por Marca
app.get('/api/data/marca/:marca', (req, res) => {
  const marca = req.params.marca.toLowerCase(); // Obtén la marca de los parámetros de la URL y conviértela a minúsculas

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON.');
      return;
    }

    const jsonData = JSON.parse(data);
    const items = jsonData.filter(item => item.marca.toLowerCase() === marca); // Filtra los elementos por marca (ignorando mayúsculas y minúsculas)

    if (items.length === 0) {
      res.status(404).send('No se encontraron elementos con la marca proporcionada.');
      return;
    }

    res.json(items);
  });
});

// Ruta para prueba.ejs  
app.get('/prueba', (req, res) => {
  res.render(__dirname + '/prueba.ejs');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`La API está funcionando en el puerto ${port}`);
});




