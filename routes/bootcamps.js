const express = require('express');
const { getBootcamp, getBootcamps } = require('../controllers/bootcamps');

const router = express.Router();

router.route('/').get(getBootcamps);
router.route('/:id').get(getBootcamp);

router.get('/:id', (req, res) => {});

module.exports = router;
