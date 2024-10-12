const express=require('express');
const VagaController = require('../controller/vagaController');
const router = express.Router();
const vagaController = new VagaController

router.get('/',vagaController.getAll)
router.get('/:codigo',vagaController.getByCodigo)
router.delete('/:codigo',vagaController.deleteVaga)
router.post('/',vagaController.create)
router.put('/:codigo',vagaController.update)
router.post('/filtrar',vagaController.filtrar)
module.exports=router

