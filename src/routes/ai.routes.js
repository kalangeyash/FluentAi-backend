const express = require('express');
const aiController = require('../controllers/ai.controller');
const auth = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { aiTextSchema, aiPromptSchema } = require('../validators/ai.validators');

const router = express.Router();

// AI endpoints are auth-protected so the API key is only ever used server-side
router.post('/improve', auth, validate(aiTextSchema), aiController.improve);
router.post('/summary', auth, validate(aiTextSchema), aiController.summary);
router.post('/tags', auth, validate(aiTextSchema), aiController.tags);
router.post('/apply-prompt', auth, validate(aiPromptSchema), aiController.applyPrompt);

module.exports = router;

