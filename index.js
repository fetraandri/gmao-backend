const express = require('express');
const cors = require('cors'); 
const { PrismaClient } = require('@prisma/client');
const equipmentsRouter = require('./api/equipments');
const interventionsRouter = require('./api/interventions');
const maintenanceRouter = require('./api/maintenance');

const prisma = new PrismaClient();
const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api/equipments', equipmentsRouter);
app.use('/api/interventions', interventionsRouter);
app.use('/api/maintenance', maintenanceRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});