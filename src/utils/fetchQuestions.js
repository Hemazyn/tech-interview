export async function fetchQuestions({ role, field, experience, category, difficulty, numQuestions }) {
     const query = new URLSearchParams({ role, field, experience, category, difficulty, numQuestions: numQuestions.toString() });

     const response = await fetch(`/api/generateQuestions?${query.toString()}`);
     const data = await response.json();
     console.log('openrouter output:', data);
     return data;
}