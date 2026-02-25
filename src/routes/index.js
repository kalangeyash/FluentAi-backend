const express = require('express');
const authRoutes = require('./auth.routes');
const articleRoutes = require('./article.routes');
const aiRoutes = require('./ai.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/ai', aiRoutes);

module.exports = router;
