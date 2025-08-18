import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quiz = location.state?.quiz;

  const [mode, setMode] = useState("initial");
  const [answers, setAnswers] = useState({});

  if (!quiz) {
    return (
      <div className="text-center text-white">
        <p>No quiz data found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-black px-4 py-2 rounded-full mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    console.log("User Answers:", answers);
    alert("Quiz submitted! Check console for answers.");
  };

  return (
    <div className="text-white pl-20 sm:pl-0 p-4 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">{quiz.title || "Your Quiz"}</h1>
      <p className="mb-6 text-gray-300">
        {quiz.summary || "No summary provided."}
      </p>

      {mode === "initial" && (
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setMode("view")}
            className="bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
          >
            View
          </button>
          <button
            className="bg-green-300 text-black px-6 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-300 transition duration-300 hover:bg-green-400"
            disabled
          >
            Save
          </button>
          <button
            onClick={() => setMode("take")}
            className="bg-yellow-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-yellow-400"
          >
            Take
          </button>
        </div>
      )}

      {mode === "view" && (
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-4">Preview Quiz</h2>
          {quiz.questions.map((q, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">
                {index + 1}. {q.question}
              </h3>
            </div>
          ))}

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => setMode("initial")}
              className="bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
            >
              Back
            </button>
            <button
              className="bg-green-300 text-black px-6 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-300 transition duration-300 hover:bg-green-400"
              disabled
            >
              Save
            </button>
            <button
              onClick={() => setMode("take")}
              className="bg-yellow-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-yellow-400"
            >
              Take
            </button>
          </div>
        </div>
      )}

      {mode === "take" && (
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-4">Take Quiz</h2>
          {quiz.questions.map((q, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">
                {index + 1}. {q.question}
              </h3>
              <ul className="mt-2">
                {q.options.map((option, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(index, option)}
                    className={`border border-gray-300/30 rounded-3xl px-4 py-2 mb-2 cursor-pointer hover:border-yellow-300 transition duration-300 ${
                      answers[index] === option ? "bg-yellow-300/10 border-yellow-300" : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => setMode("initial")}
              className="bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
            >
              Back
            </button>
            <button
              className="bg-green-300 text-black px-6 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-300 transition duration-300 hover:bg-green-400"
              disabled
            >
              Save
            </button>
            <button
              onClick={handleSubmit}
              className="bg-yellow-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-yellow-400"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
