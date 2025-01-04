import express from "express";
import { getEtudiants, createEtudiant, updateEtudiant, deleteEtudiant } from "../controllers/EtudiantController.js";

const router = express.Router();

router.get('/', getEtudiants);
router.post('/', createEtudiant);
router.put('/:id', updateEtudiant);
router.delete('/:id', deleteEtudiant);

export default router;