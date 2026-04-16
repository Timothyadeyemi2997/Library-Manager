const express = require('express');
const router = express.Router();

const {
  createAttendant,
  getAllAttendants,
  getAttendantById,
  updateAttendant,
  deleteAttendant
} = require('../controller/attendantController');

router.post('/', createAttendant);
router.get('/', getAllAttendants);
router.get('/:id', getAttendantById);
router.put('/:id', updateAttendant);
router.delete('/:id', deleteAttendant);

module.exports = router;