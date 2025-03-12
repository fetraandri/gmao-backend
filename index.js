const express = require('express');
const cors = require('cors'); 
const { PrismaClient } = require('@prisma/client');
const equipmentsRouter = require('./api/equipments');
const interventionsRouter = require('./api/interventions');
const maintenanceRouter = require('./api/maintenance');

const prisma = new PrismaClient();
const app = express();

// Configuration CORS explicite
app.use(cors({
  origin: 'https://gmao-app.vercel.app',  // L'URL de ton front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Ajouter une gestion des requêtes OPTIONS (preflight request)
app.options('*', cors());  // Répond à toutes les requêtes OPTIONS

// Log pour vérifier que les requêtes passent par ici
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/equipments', equipmentsRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/maintenance', maintenanceRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
