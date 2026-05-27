const express = require('express');
const { subscreverNewsletter } = require('../controllers/newsletterController');

const router = express.Router();

router.post('/', subscreverNewsletter);

module.exports = router;
