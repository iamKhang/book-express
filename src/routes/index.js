const express = require('express');
const router = express.Router();
const homeRoutes = require('./home');

router.use('/', homeRoutes);

module.exports = router;
