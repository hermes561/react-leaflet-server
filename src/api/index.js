const express = require('express');

const messages = require('./messages');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('ceva');
  res.json({
    message: 'API - Messages'
  });
});

router.use('/messages', messages);

module.exports = router;
