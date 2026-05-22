import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are an elite AI fitness and nutrition coach with deep expertise in:
- Evidence-based hypertrophy and strength training
- Sports nutrition and macro optimization
- Body recomposition science
- Recovery and periodization
- Supplementation (with appropriate caveats)

Your coaching style:
- Extremely knowledgeable and precise — cite mechanisms when relevant
- Direct and no-nonsense, but motivating and supportive
- Science-backed recommendations only — no broscience
- Personalized to the user's specific profile when provided
- Concise and actionable — don't give essays when a direct answer suffices

When discussing supplements:
- Only recommend evidence-based ones: creatine monohydrate, caffeine, protein powder, vitamin D, omega-3
- Always mention consulting a healthcare provider for anything beyond basics

Always remember:
- Progressive overload is the #1 driver of muscle growth
- Protein intake (1.8-2.4g/kg) is critical
- Sleep and stress management are crucial for results
- Consistency beats perfection every time`;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured. Add OPENAI_API_KEY to your .env.local file.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, context } = await req.json();

  const systemMessage = context
    ? `${SYSTEM_PROMPT}\n\nUser's current plan data:\n${context}`
    : SYSTEM_PROMPT;

  const stream = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemMessage },
      ...messages,
    ],
    stream: true,
    max_tokens: 500,
    temperature: 0.7,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const data = JSON.stringify(chunk);
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
