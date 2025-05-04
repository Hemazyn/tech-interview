import { NextResponse } from 'next/server';

export async function GET(req) {
     const { searchParams } = new URL(req.url);
     const role = searchParams.get('role');
     const field = searchParams.get('field');
     const experience = searchParams.get('experience');
     const category = searchParams.get('category');
     const difficulty = searchParams.get('difficulty');
     const numQuestions = searchParams.get('numQuestions') || 5;

     const prompt = `You are an expert interviewer. Generate ${numQuestions} distinct ${experience}-level interview questions and answers for the role of "${role}" in the "${field}" domain. Each question should fall under the "${category}" category and be of "${difficulty}" difficulty. Respond ONLY in strict JSON format with this structure: {"questions": [{ "question": "Q1", "answer": "A1" },{ "question": "Q2", "answer": "A2" },...]}`.trim();

     try {
          const completion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
               method: 'POST',
               headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    model: "gpt-3.5-turbo", // or another model
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7
               })
          });

          const data = await completion.json();

          if (!data || !data.choices || data.choices.length === 0) {
               return new Response(JSON.stringify({ error: 'No questions generated' }), { status: 500 });
          }

          const content = data.choices[0].message.content.trim();

          try {
               const parsed = JSON.parse(content);
               return new Response(JSON.stringify(parsed), {
                    status: 200,
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
          } catch (err) {
               console.error('Failed to parse LLM response as JSON:', err);
               return new Response(JSON.stringify({ error: 'Invalid JSON format from LLM' }), { status: 500 });
          }
     } catch (error) {
          console.error('API Error:', error);
          return new Response(JSON.stringify({ error: 'Failed to generate questions' }), { status: 500 });
     }
}