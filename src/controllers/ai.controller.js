const aiService = require('../services/ai.service');

// Controllers simply forward to AI service and rely on centralized error handling
async function improve(req, res, next) {
  try {
    const { text } = req.body;
    const improved = await aiService.improveContent(text);
    res.json({ improved });
  } catch (err) {
    next(err);
  }
}

async function summary(req, res, next) {
  try {
    const { text } = req.body;
    const summaryText = await aiService.generateSummary(text);
    res.json({ summary: summaryText });
  } catch (err) {
    next(err);
  }
}

async function tags(req, res, next) {
  try {
    const { text } = req.body;
    const tagsText = await aiService.suggestTags(text);
    res.json({ tags: tagsText });
  } catch (err) {
    next(err);
  }
}

async function applyPrompt(req, res, next) {
  try {
    const { text, prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      const error = new Error('Prompt is required');
      error.statusCode = 400;
      throw error;
    }
    const modified = await aiService.applyCustomPrompt(text, prompt);
    res.json({ modified });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  improve,
  summary,
  tags,
  applyPrompt,
};

