export async function generateQuiz(topic, numQuestions, difficulty) {
  const FIREBASE_FUNCTION_URL = "http://localhost:5001/quizifai-f62d4/us-central1/api/generate-quiz";

  const res = await fetch(FIREBASE_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, numQuestions, difficulty }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to generate quiz: ${errorText}`);
  }

  const data = await res.json();
  return data.quiz;
}
