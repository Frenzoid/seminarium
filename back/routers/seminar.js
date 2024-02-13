/**
 * Seminars router. Connects with the user's endpoints, and catches errors.
 */
const express = require('express');
const router = express.Router();

const { errorHandler } = require("../helpers/functions.js")
const { getSeminars, getSeminar, addSeminar, editSeminar, deleteSeminar } = require('../controllers/seminar.js');



router.get('/', errorHandler(getSeminars));
router.get('/:id', errorHandler(getSeminar));
router.post('/', errorHandler(addSeminar));
router.put('/:id', errorHandler(editSeminar));
router.delete('/:id', errorHandler(deleteSeminar));


module.exports = router