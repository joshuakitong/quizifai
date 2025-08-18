import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import GenerateQuiz from "./pages/QuizGenerator";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <NavBar />
        <Routes>
          <Route path="/" element={<GenerateQuiz />} />
          <Route path="/quizzes" element={<div className="ml-16 p-8 text-white">My Quizzes Page (coming soon)</div>} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
