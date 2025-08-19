import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";

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
          className="w-full sm:w-36 bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
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
    <div className="text-white pl-20 sm:pl-0 p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/")}
          className="group p-2 rounded-full hover:bg-[#303030] transition duration-300 cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-3xl font-bold text-center flex-1">{quiz.title || "Your Quiz"}</h1>

        <button
          className="group p-2 rounded-full hover:bg-yellow-300 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="Save Quiz (Feature Coming Soon)"
          disabled
        >
          <Save className="w-5 h-5 text-yellow-300 enabled:group-hover:text-black disabled:group-hover:text-yellow-300 transition duration-300" />
        </button>
      </div>

      <p className="mb-6 text-gray-300 text-center">{quiz.summary || "No summary provided."}</p>

      {mode === "initial" && (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("view")}
            className="w-full sm:w-36 bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
          >
            View
          </button>
          <button
            onClick={() => setMode("take")}
            className="w-full sm:w-36 bg-yellow-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-yellow-400"
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

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={() => setMode("initial")}
              className="w-full sm:w-36 bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setMode("take")}
              className="w-full sm:w-36 bg-yellow-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-yellow-400"
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
              <ul className="mt-2 grid grid-cols-2 gap-4">
                {q.options.map((option, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(index, option)}
                    className={`border border-gray-300/30 rounded-3xl px-4 py-2 cursor-pointer flex items-center justify-center text-center hover:border-yellow-300 transition duration-300 ${
                      answers[index] === option ? "bg-yellow-300/10 border-yellow-300" : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={() => setMode("initial")}
              className="w-full sm:w-36 bg-gray-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-36 bg-yellow-300 text-black px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-yellow-400"
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
