const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../database');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json(results);
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM usuarios WHERE usu_codigo = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).json({ error: 'Error al obtener usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuarios (usu_user, usu_password) VALUES (?, ?)';

        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    } catch (error) {
        console.error('Error al hash la contraseña:', error);
        res.status(500).json({ error: 'Error al hash la contraseña' });
    }
});

// Actualizar un usuario existente
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'UPDATE usuarios SET usu_user = ?, usu_password = ? WHERE usu_codigo = ?';

        db.query(query, [username, hashedPassword, userId], (err, results) => {
            if (err) {
                console.error('Error al actualizar usuario:', err);
                return res.status(500).json({ error: 'Error al actualizar usuario' });
            }
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        });
    } catch (error) {
        console.error('Error al hash la contraseña:', error);
        res.status(500).json({ error: 'Error al hash la contraseña' });
    }
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM usuarios WHERE usu_codigo = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
});

module.exports = router;
