const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database');

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    database.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
});

// Inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    database.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error al iniciar sesión' });
        if (results.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;