const express = require('express');
const router = express.Router();
const database = require('../database');

// Ruta para obtener todas las imágenes
router.get('/', (req, res) => {
    database.query('SELECT * FROM imagenes', (err, results) => {
        if (err) {
            console.error('Error al obtener imágenes:', err);
            res.status(500).send('Error al obtener imágenes');
        } else {
            res.json(results);
        }
    });
});

// Ruta para subir una nueva imagen
router.post('/', (req, res) => {
    const { imagen_url, prop_codigo } = req.body; // Supongamos que tienes la URL de la imagen y el código de la propiedad
    const values = [imagen_url, prop_codigo];
    database.query('INSERT INTO imagenes (imagen_url, prop_codigo) VALUES (?, ?)', values, (err, result) => {
        if (err) {
            console.error('Error al subir la imagen:', err);
            res.status(500).send('Error al subir la imagen');
        } else {
            res.status(201).send('Imagen subida correctamente');
        }
    });
});

// Ruta para eliminar una imagen
router.delete('/:id', (req, res) => {
    const imgId = req.params.id;
    database.query('DELETE FROM imagenes WHERE img_codigo = ?', [imgId], (err, result) => {
        if (err) {
            console.error('Error al eliminar la imagen:', err);
            res.status(500).send('Error al eliminar la imagen');
        } else {
            res.status(200).send('Imagen eliminada correctamente');
        }
    });
});

module.exports = router;