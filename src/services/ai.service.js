const OpenAI = require('openai');
const env = require('../config/env');

// Simple wrapper around OpenAI to keep prompts and API usage centralized
function getClient() {
  if (!env.openai.apiKey) {
    const error = new Error('AI service is not configured');
    error.statusCode = 500;
    throw error;
  }

  return new OpenAI({
    apiKey: env.openai.apiKey,
  });
}

async function improveContent(text) {
  const client = getClient();

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant that improves knowledge sharing articles. Respond ONLY with the improved text, preserving the original meaning.',
      },
      {
        role: 'user',
        content: `Improve the clarity, structure, and readability of the following article content without changing its core meaning:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}

async function generateSummary(text) {
  const client = getClient();

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content:
          'You create concise summaries for technical knowledge articles. Respond ONLY with the summary, maximum 5-7 sentences, keep it under 100 characters.',
      },
      {
        role: 'user',
        content: `Generate a concise summary for the following article content:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}

async function suggestTags(text) {
  const client = getClient();

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content:
          'You generate comma-separated tags for knowledge-sharing articles. Respond ONLY with a comma-separated list of tags, no explanations.',
      },
      {
        role: 'user',
        content: `Suggest relevant tags for the following article content:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}

async function applyCustomPrompt(text, prompt) {
  const client = getClient();

  const response = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert content editor for technical articles. Apply the user\'s requested changes to the article content while maintaining professional quality. Respond ONLY with the modified content, preserving the HTML structure if present.',
      },
      {
        role: 'user',
        content: `Apply the following changes to this article:\n\nChanges requested: ${prompt}\n\nArticle content:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}

module.exports = {
  improveContent,
  generateSummary,
  suggestTags,
  applyCustomPrompt,
};

