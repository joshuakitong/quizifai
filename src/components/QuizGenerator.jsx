import { useState, useRef, useEffect } from "react";
import { Plus, Minus, Sparkle, X } from "lucide-react";

function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(20);
  const [difficulty, setDifficulty] = useState("medium");
  const [showOptions, setShowOptions] = useState(false);

  const textareaRef = useRef(null);
  const optionsRef = useRef(null);
  const optionsButtonRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type.includes("msword") ||
        selectedFile.type.includes("officedocument"))
    ) {
      setFile(selectedFile);
      setShowOptions(false);
    } else {
      alert("Only PDF or DOC/DOCX files are allowed.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic && !file) {
      alert("Please provide a topic or upload a file.");
      return;
    }
    console.log({ topic, file, numQuestions, difficulty });
    alert("Quiz generation will be implemented soon!");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        optionsButtonRef.current &&
        !optionsButtonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const screenWidth = window.innerWidth;
      const baseHeight = screenWidth < 640 ? 22 : 42;

      textarea.style.height = `${baseHeight}px`;

      const style = window.getComputedStyle(textarea);
      const padding = parseInt(style.paddingTop) + parseInt(style.paddingBottom);

      const newHeight = textarea.scrollHeight - padding;

      const finalHeight = Math.min(newHeight, 200);
      textarea.style.height = `${Math.max(finalHeight, baseHeight)}px`;

      if (newHeight >= 200) {
        textarea.style.overflowY = "auto";
      } else {
        textarea.style.overflowY = "hidden";
      }
    }
  }, [topic]);

  return (
    <div className="ml-16 w-full h-screen flex flex-col justify-between items-center text-white px-2 py-8">
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-5xl font-bold text-yellow-300 mb-4">QuizifAI</h1>
        <p className="text-white text-lg max-w-lg text-center">
          Create AI-generated multiple-choice quizzes from any topic or your notes to review and prepare for exams.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-4"
      >
        <div className="relative flex flex-row items-end gap-2 bg-[#303030] rounded-4xl p-3 transition-all duration-300">
          {/* Plus button */}
          <button
            ref={optionsButtonRef}
            title="More Options"
            type="button"
            onClick={() => setShowOptions((prev) => !prev)}
            className="p-2 sm:p-3 bg-[#303030] rounded-full hover:bg-[#5a5a5a] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Textarea / file preview */}
          <div className="relative flex-1 w-full flex flex-col justify-end">
            {file ? (
              <div className="flex items-center justify-between bg-[#5a5a5a] rounded-full px-3 py-1 sm:py-2 max-h-[42px] max-w-[160px] sm:max-w-[540px]">
                <span className="truncate max-w-full text-sm leading-none flex items-center py-1 sm:py-2">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-white cursor-pointer flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={topic}
                onChange={handleTopicChange}
                placeholder="Enter topic or notes..."
                className="w-full resize-none bg-transparent outline-none text-xs sm:text-base text-white px-2 pt-0 sm:pt-3 leading-[12px] sm:leading-[16px] h-[22px] sm:h-[42px] max-h-[200px] scrollbar-custom"
              />
            )}
          </div>

          {/* Generate Quiz button */}
          <button
            title="Generate Quiz"
            type="submit"
            disabled={!topic && !file}
            className={`p-2 sm:p-3 rounded-full text-black transition-all bg-yellow-300 hover:bg-yellow-300 ${
              !topic && !file
                ? "opacity-50 cursor-default"
                : "cursor-pointer"
            }`}
          >
            <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 transition" />
          </button>

          {/* Options menu */}
          {showOptions && (
            <div
              ref={optionsRef}
              className={`absolute bottom-full mb-2 left-0 w-72 bg-[#303030] rounded-4xl shadow-2xl p-4 flex flex-col gap-4 z-50 origin-bottom-left transition-all duration-300
                ${showOptions ? "scale-80 sm:scale-100 pointer-events-auto" : "scale-0 pointer-events-none"}
              `}
            >
              {/* File upload */}
              <div>
                <label
                  htmlFor="file-upload"
                  className="inline-block w-full px-4 py-2 bg-[#242424] text-white rounded-full hover:bg-yellow-400 hover:text-black cursor-pointer transition-colors"
                >
                  Add .pdf, .doc, .docx file
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Number of questions */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Questions:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={numQuestions <= 10}
                    onClick={() => setNumQuestions((prev) => prev - 10)}
                    className={`p-1 rounded-full bg-[#242424] hover:bg-yellow-400 hover:text-black disabled:hover:bg-[#242424] disabled:hover:text-white disabled:hover:cursor-default transition-colors cursor-pointer ${
                      numQuestions <= 10 ? "opacity-50" : ""
                    }`}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{numQuestions}</span>
                  <button
                    type="button"
                    disabled={numQuestions >= 50}
                    onClick={() => setNumQuestions((prev) => prev + 10)}
                    className={`p-1 rounded-full bg-[#242424] hover:bg-yellow-400 hover:text-black disabled:hover:bg-[#242424] disabled:hover:text-white disabled:hover:cursor-default transition-colors cursor-pointer ${
                      numQuestions >= 50 ? "opacity-50" : ""
                    }`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Difficulty buttons */}
              <div className="flex items-center gap-3">
                <label className="text-sm">Difficulty:</label>
                <div className="flex gap-2">
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`px-3 py-1 rounded-full ${
                        difficulty === level
                          ? "bg-yellow-400 text-black"
                          : "bg-[#242424] text-white hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer"
                      }`}
                    >
                      {level === "easy" ? "Easy" : level === "medium" ? "Med" : "Hard"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>

    </div>
  );
}

export default QuizGenerator;
