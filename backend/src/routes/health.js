const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  try {
    const check = db.prepare('SELECT 1 AS connected').get();
    if (check && check.connected === 1) {
      return res.status(200).json({
        status: 'ok',
        db: 'connected'
      });
    }

    return res.status(500).json({
      status: 'error',
      db: 'disconnected'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      db: 'disconnected',
      message: error.message
    });
  }
});

module.exports = router;
