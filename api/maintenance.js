const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router(); // Utiliser Router au lieu d'une app complète

// GET /api/maintenance - Récupérer toutes les maintenances
router.get('/', async (req, res) => {
  try {
    const maintenances = await prisma.maintenance.findMany({
      include: { equipment: true }, // Inclure les données de l'équipement
    });
    res.status(200).json(maintenances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des maintenances' });
  }
});

// POST /api/maintenance - Créer une nouvelle maintenance
router.post('/', async (req, res) => {
  const { equipmentId, details, date, status } = req.body;
  try {
    // Validation basique
    if (!equipmentId || !details || !date || !status) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    if (!['En attente', 'En cours', 'Terminée'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    const maintenance = await prisma.maintenance.create({
      data: {
        equipmentId: parseInt(equipmentId),
        details,
        date: new Date(date),
        status,
      },
    });
    res.status(201).json(maintenance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la maintenance' });
  }
});

// PUT /api/maintenance/:id - Mettre à jour une maintenance
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { equipmentId, details, date, status } = req.body;
  try {
    // Validation basique
    if (status && !['En attente', 'En cours', 'Terminée'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    const updateData = {};
    if (equipmentId !== undefined) updateData.equipmentId = parseInt(equipmentId);
    if (details !== undefined) updateData.details = details;
    if (date !== undefined) updateData.date = new Date(date);
    if (status !== undefined) updateData.status = status;

    const maintenance = await prisma.maintenance.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.status(200).json(maintenance);
  } catch (error) {
    if (error.code === 'P2025') { // Erreur Prisma : enregistrement non trouvé
      res.status(404).json({ error: 'Maintenance non trouvée' });
    } else {
      console.error('Erreur PUT:', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la maintenance' });
    }
  }
});

// DELETE /api/maintenance/:id - Supprimer une maintenance
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.maintenance.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Maintenance non trouvée' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression de la maintenance' });
    }
  }
});

module.exports = router; // Exporter le routeur