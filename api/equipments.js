const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router(); // Utiliser Router au lieu d'une app complète

router.use(express.json()); // Pas nécessaire si déjà dans index.js

// GET /api/equipments - Récupérer tous les équipements
router.get('/', async (req, res) => {
  try {
    const equipments = await prisma.equipment.findMany();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des équipements' });
  }
});

// POST /api/equipments - Créer un nouvel équipement
router.post('/', async (req, res) => {
  const { name, type, status } = req.body;
  try {
    const equipment = await prisma.equipment.create({
      data: { name, type, status },
    });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'équipement' });
  }
});

// PUT /api/equipments/:id - Mettre à jour un équipement
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, status } = req.body;
  try {
    const equipment = await prisma.equipment.update({
      where: { id: parseInt(id) },
      data: { name, type, status },
    });
    res.status(200).json(equipment);
  } catch (error) {
    console.error('Erreur PUT:', error); // Ajouter un log pour déboguer
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'équipement' });
  }
});

// DELETE /api/equipments/:id - Supprimer un équipement
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.equipment.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'équipement' });
  }
});

module.exports = router; // Exporter le routeur