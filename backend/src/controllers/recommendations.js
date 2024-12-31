import OpenAI from 'openai';
import { logger } from '../utils/logger.js';
import { mockAssets } from '../utils/mockData.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getRecommendations(req, res, next) {
  try {
    const prompt = `Given the following portfolio, provide trading recommendations:
    
Portfolio:
${mockAssets.map(a => `${a.name} (${a.symbol}): $${a.value}`).join('\n')}

Provide 3 recommendations in the following format:
- Action (buy/sell/hold)
- Asset
- Amount
- Reason
- Confidence (0-1)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a crypto trading advisor. Provide conservative, well-reasoned trade recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    // Parse GPT response and format recommendations
    // For now, return mock data
    res.json([{
      action: 'hold',
      asset: 'BTC',
      amount: 0,
      reason: completion.choices[0].message.content || 'Market conditions suggest holding current position',
      confidence: 0.8
    }]);
  } catch (error) {
    logger.error('Failed to generate recommendations:', error);
    next(error);
  }
}