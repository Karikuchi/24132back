const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Configuración de Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración básica de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', // Reemplaza con la URL de tu frontend
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Proxy para archivos estáticos
app.use('/public', createProxyMiddleware({
    target: 'https://inmobiliaria24132.netlify.app/',
    changeOrigin: true,
    pathRewrite: {
        '^/public': '', // eliminar '/public' de la URL al redirigir
    },
}));

// Importar las rutas
const propiedadesRouter = require('./routes/propiedades');
const tipopropiedadRouter = require('./routes/tipopropiedad');
const usuariosRouter = require('./routes/usuarios');
const imagenesRouter = require('./routes/imagenes');

app.use('/propiedades', propiedadesRouter);
app.use('/tipopropiedad', tipopropiedadRouter);
app.use('/usuarios', usuariosRouter);
app.use('/imagenes', imagenesRouter);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
