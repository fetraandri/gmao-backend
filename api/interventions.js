const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// GET /api/interventions - Récupérer toutes les interventions
app.get('/', async (req, res) => {
  try {
    const interventions = await prisma.intervention.findMany();
    res.status(200).json(interventions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des interventions' });
  }
});

// POST /api/interventions - Créer une nouvelle intervention
app.post('/', async (req, res) => {
  const { equipmentId, description, date } = req.body;
  try {
    const intervention = await prisma.intervention.create({
      data: { equipmentId: parseInt(equipmentId), description, date: new Date(date) },
    });
    res.status(201).json(intervention);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'intervention' });
  }
});

module.exports = app;