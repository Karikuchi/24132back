const express = require('express');
const router = express.Router();
const database = require('../database');

// Ruta para obtener todas las propiedades
router.get('/', (req, res) => {
    database.query('SELECT * FROM propiedades', (err, results) => {
        if (err) {
            console.error('Error al obtener propiedades:', err);
            res.status(500).send('Error al obtener propiedades');
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener una propiedad por ID
router.get('/:id', (req, res) => {
    const propId = req.params.id;
    database.query('SELECT * FROM propiedades WHERE prop_codigo = ?', [propId], (err, results) => {
        if (err) {
            console.error('Error al obtener la propiedad:', err);
            res.status(500).send('Error al obtener la propiedad');
        } else {
            res.json(results);
        }
    });
});

// Ruta para crear una nueva propiedad
router.post('/', (req, res) => {
    const { prop_denom, tpo_codigo, prop_ambiente, prop_proceso, prop_metros, prop_detalle, prop_precio, prop_expensas, prop_direccion, usu_codigo } = req.body;
    const values = [prop_denom, tpo_codigo, prop_ambiente, prop_proceso, prop_metros, prop_detalle, prop_precio, prop_expensas, prop_direccion, usu_codigo];
    database.query('INSERT INTO propiedades (prop_denom, tpo_codigo, prop_ambiente, prop_proceso, prop_metros, prop_detalle, prop_precio, prop_expensas, prop_direccion, usu_codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, result) => {
        if (err) {
            console.error('Error al crear la propiedad:', err);
            res.status(500).send('Error al crear la propiedad');
        } else {
            res.status(201).send('Propiedad creada correctamente');
        }
    });
});

// Ruta para actualizar una propiedad existente
router.put('/:id', (req, res) => {
    const propId = req.params.id;
    const { prop_denom, tpo_codigo, prop_ambiente, prop_proceso, prop_metros, prop_detalle, prop_precio, prop_expensas, prop_direccion, usu_codigo } = req.body;
    const values = [prop_denom, tpo_codigo, prop_ambiente, prop_proceso, prop_metros, prop_detalle, prop_precio, prop_expensas, prop_direccion, usu_codigo, propId];
    database.query('UPDATE propiedades SET prop_denom = ?, tpo_codigo = ?, prop_ambiente = ?, prop_proceso = ?, prop_metros = ?, prop_detalle = ?, prop_precio = ?, prop_expensas = ?, prop_direccion = ?, usu_codigo = ? WHERE prop_codigo = ?', values, (err, result) => {
        if (err) {
            console.error('Error al actualizar la propiedad:', err);
            res.status(500).send('Error al actualizar la propiedad');
        } else {
            res.status(200).send('Propiedad actualizada correctamente');
        }
    });
});

// Ruta para eliminar una propiedad
router.delete('/:id', (req, res) => {
    const propId = req.params.id;
    database.query('DELETE FROM propiedades WHERE prop_codigo = ?', [propId], (err, result) => {
        if (err) {
            console.error('Error al eliminar la propiedad:', err);
            res.status(500).send('Error al eliminar la propiedad');
        } else {
            res.status(200).send('Propiedad eliminada correctamente');
        }
    });
});

module.exports = router;
