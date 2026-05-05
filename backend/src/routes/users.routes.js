const express = require('express');

const router = express.Router();

// Placeholder for user-specific routes (profile, settings, etc.)
router.get('/', (req, res) => {
  res.json({ message: 'User routes' });
});

module.exports = router;
