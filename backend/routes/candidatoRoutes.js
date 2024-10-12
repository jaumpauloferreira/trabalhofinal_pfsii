const express = require('express');
const CandidatoController = require('../controller/candidatoController');
const router = express.Router();
const candidatoController = new CandidatoController

router.get('/', candidatoController.getAll)
router.get('/:cpf', candidatoController.getByCPF)
router.delete('/:cpf', candidatoController.deleteCandidato)
router.post('/', candidatoController.create)
router.put('/:cpf', candidatoController.update)
router.post('/filtrar', candidatoController.filtrar)
module.exports = router