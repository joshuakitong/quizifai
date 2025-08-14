export async function generateQuiz(topic, numQuestions, difficulty) {
  const res = await fetch("http://localhost:5000/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, numQuestions, difficulty }),
  });

  const data = await res.json();
  return data.quiz;
}
