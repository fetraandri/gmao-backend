const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router(); // Utiliser Router au lieu d'une app complète

// GET /api/interventions - Récupérer toutes les interventions
router.get('/', async (req, res) => {
  try {
    const interventions = await prisma.intervention.findMany({
      include: { equipment: true }, // Inclure les données de l'équipement
    });
    res.status(200).json(interventions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des interventions' });
  }
});

// POST /api/interventions - Créer une nouvelle intervention
router.post('/', async (req, res) => {
  const { equipmentId, description, date, status } = req.body;
  try {
    // Validation basique
    if (!equipmentId || !description || !date || !status) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    if (!['En attente', 'En cours', 'Terminée'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    const intervention = await prisma.intervention.create({
      data: {
        equipmentId: parseInt(equipmentId),
        description,
        date: new Date(date),
        status,
      },
    });
    res.status(201).json(intervention);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'intervention' });
  }
});

// PUT /api/interventions/:id - Mettre à jour une intervention
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { equipmentId, description, date, status } = req.body;
  try {
    // Validation basique
    if (status && !['En attente', 'En cours', 'Terminée'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    const updateData = {};
    if (equipmentId !== undefined) updateData.equipmentId = parseInt(equipmentId);
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = new Date(date);
    if (status !== undefined) updateData.status = status;

    const intervention = await prisma.intervention.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.status(200).json(intervention);
  } catch (error) {
    if (error.code === 'P2025') { // Erreur Prisma : enregistrement non trouvé
      res.status(404).json({ error: 'Intervention non trouvée' });
    } else {
      console.error('Erreur PUT:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'intervention' });
    }
  }
});

// DELETE /api/interventions/:id - Supprimer une intervention
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.intervention.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Intervention non trouvée' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'intervention' });
    }
  }
});

module.exports = router; // Exporter le routeur