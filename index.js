const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const equipmentsRouter = require('./api/equipments');
const interventionsRouter = require('./api/interventions');
const maintenanceRouter = require('./api/maintenance');

const prisma = new PrismaClient();
const app = express();

// Configuration CORS explicite
const corsOptions = {
  origin: 'https://gmao-app.vercel.app', // Autoriser uniquement ce domaine
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autoriser ces méthodes
  allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser ces en-têtes
  credentials: true, // Autoriser les cookies et les en-têtes d'authentification
};

app.use(cors(corsOptions));

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Middleware pour gérer les requêtes OPTIONS (preflight)
app.options('*', cors(corsOptions)); // Répond à toutes les requêtes OPTIONS

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes
app.use('/api/equipments', equipmentsRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/maintenance', maintenanceRouter);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur.' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});