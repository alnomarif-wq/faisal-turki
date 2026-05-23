import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

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

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'NO_KEY', message: 'ANTHROPIC_API_KEY is missing in environment variables.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  let body: { messages: { role: string; content: string }[]; context?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'INVALID_JSON', message: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, context } = body;

  const systemMessage = context
    ? `${SYSTEM_PROMPT}\n\nUser's current plan data:\n${context}`
    : SYSTEM_PROMPT;

  const encoder = new TextEncoder();

  try {
    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemMessage,
      messages: messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              const data = JSON.stringify({
                choices: [{ delta: { content: chunk.delta.text } }],
              });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (streamErr) {
          const errMsg = streamErr instanceof Error ? streamErr.message : 'Stream error';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'API_ERROR', message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
