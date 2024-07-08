const express = require('express');
const router = express.Router();
const database = require('../database');

// Ruta para obtener todos los tipos de propiedades
router.get('/', (req, res) => {
    database.query('SELECT * FROM tipopropiedad', (err, results) => {
        if (err) {
            console.error('Error al obtener tipos de propiedad:', err);
            res.status(500).send('Error al obtener tipos de propiedad');
        } else {
            res.json(results);
        }
    });
});

// Ruta para crear un nuevo tipo de propiedad
router.post('/', (req, res) => {
    const { tpo_denom } = req.body;
    database.query('INSERT INTO tipopropiedad (tpo_denom) VALUES (?)', [tpo_denom], (err, result) => {
        if (err) {
            console.error('Error al crear tipo de propiedad:', err);
            res.status(500).send('Error al crear tipo de propiedad');
        } else {
            res.status(201).send('Tipo de propiedad creado correctamente');
        }
    });
});

// Ruta para actualizar un tipo de propiedad existente
router.put('/:id', (req, res) => {
    const tpoId = req.params.id;
    const { tpo_denom } = req.body;
    database.query('UPDATE tipopropiedad SET tpo_denom = ? WHERE tpo_codigo = ?', [tpo_denom, tpoId], (err, result) => {
        if (err) {
            console.error('Error al actualizar tipo de propiedad:', err);
            res.status(500).send('Error al actualizar tipo de propiedad');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Tipo de propiedad no encontrado');
        } else {
            res.status(200).send('Tipo de propiedad actualizado correctamente');
        }
    });
});

// Ruta para eliminar un tipo de propiedad
router.delete('/:id', (req, res) => {
    const tpoId = req.params.id;
    database.query('DELETE FROM tipopropiedad WHERE tpo_codigo = ?', [tpoId], (err, result) => {
        if (err) {
            console.error('Error al eliminar tipo de propiedad:', err);
            res.status(500).send('Error al eliminar tipo de propiedad');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Tipo de propiedad no encontrado');
        } else {
            res.status(200).send('Tipo de propiedad eliminado correctamente');
        }
    });
});

module.exports = router;
