const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// GET /api/maintenance - Récupérer toutes les maintenances
app.get('/', async (req, res) => {
  try {
    const maintenances = await prisma.maintenance.findMany();
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des maintenances' });
  }
});

// POST /api/maintenance - Créer une nouvelle maintenance
app.post('/', async (req, res) => {
  const { equipmentId, details, date } = req.body;
  try {
    const maintenance = await prisma.maintenance.create({
      data: { equipmentId: parseInt(equipmentId), details, date: new Date(date) },
    });
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la maintenance' });
  }
});

module.exports = app;