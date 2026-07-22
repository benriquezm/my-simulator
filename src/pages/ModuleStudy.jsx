import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import modulo1 from "../data/modulo1.json";
import modulo2 from "../data/modulo2.json";
import modulo3 from "../data/modulo3.json";
import modulo4 from "../data/modulo4.json";
import modulo5 from "../data/modulo5.json";
import modulo6 from "../data/modulo6.json";

function ModuleStudy({ moduleId, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] =  useState(false);
  const [questionStatus, setQuestionStatus] = useState({});
  const [difficultyFilter, setDifficultyFilter] =
  useState(
    localStorage.getItem(
      "difficultyFilter"
    ) || "all"
  );

  useEffect(() => {
    localStorage.setItem(
      "difficultyFilter",
      difficultyFilter
    );
  }, [difficultyFilter]);

  const modules = {
    1: modulo1,
    2: modulo2,
    3: modulo3,
    4: modulo4,
    5: modulo5,
    6: modulo6
  };

  const selectedModule = modules[moduleId];

  if (!selectedModule) {
    return (
      <>
        <button onClick={onBack}>
          ← Regresar
        </button>

        <p>Módulo no encontrado</p>
      </>
    );
  }

  const filteredQuestions =
  difficultyFilter === "all"
    ? selectedModule.questions
    : selectedModule.questions.filter(
        (question) =>
          question.difficulty ===
          difficultyFilter
      );

  if (filteredQuestions.length === 0) {
    return (
      <>
        <button onClick={onBack}>
          ← Regresar
        </button>

        <h2>{selectedModule.title}</h2>

        <p>
          No existen preguntas para esta
          dificultad.
        </p>
      </>
    );
  }

  const currentQuestion =
  filteredQuestions[currentQuestionIndex];

  const nextQuestion = () => {
    if (
        currentQuestionIndex <
        filteredQuestions.length - 1
    ) {
        setCurrentQuestionIndex(
        currentQuestionIndex + 1
        );

        setIsAnswered(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(
        currentQuestionIndex - 1
      );
    }
  };

  return (
    <div>
      <button onClick={onBack}>
        ← Regresar
      </button>

      <h2>{selectedModule.title}</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontWeight: "bold"
        }}
      >
        Dificultad actual:{" "}
        {difficultyFilter === "all"
          ? "Todas"
          : difficultyFilter === "easy"
          ? "Fácil"
          : difficultyFilter === "medium"
          ? "Media"
          : difficultyFilter === "hard"
          ? "Difícil"
          : "Experto"}
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "1rem",
          flexWrap: "wrap"
        }}
      >
        <button
          className={`filter-btn ${
            difficultyFilter === "all"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setDifficultyFilter("all");
            setCurrentQuestionIndex(0);
          }}
        >
          Todas
        </button>

        <button
          className={`filter-btn ${
            difficultyFilter === "easy"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setDifficultyFilter("easy");
            setCurrentQuestionIndex(0);
          }}
        >
          Fácil
        </button>

        <button
          className={`filter-btn ${
            difficultyFilter === "medium"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setDifficultyFilter("medium");
            setCurrentQuestionIndex(0);
          }}
        >
          Media
        </button>

        <button
          className={`filter-btn ${
            difficultyFilter === "hard"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setDifficultyFilter("hard");
            setCurrentQuestionIndex(0);
          }}
        >
          Difícil
        </button>

        <button
          className={`filter-btn ${
            difficultyFilter === "expert"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setDifficultyFilter("expert");
            setCurrentQuestionIndex(0);
          }}
        >
          Experto
        </button>
      </div>

      <h3>
        Pregunta {currentQuestionIndex + 1} de{" "}
        {filteredQuestions.length}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "2rem"
        }}
      >

        <div className="question-panel">

          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswered={(isCorrect) => {

              setQuestionStatus((prev) => ({
                ...prev,
                [currentQuestion.id]:
                  isCorrect
                    ? "correct"
                    : "incorrect"
              }));

              setIsAnswered(true);
            }}
          />

        </div>

        <div className="navigator-panel">

          <h4>Preguntas</h4>

          <div className="question-grid">
            {filteredQuestions.map(
              (question, index) => (
                <button
                  key={question.id}
                  className={`question-number ${
                    questionStatus[question.id] === "correct"
                      ? "correct"
                      : questionStatus[question.id] === "incorrect"
                      ? "incorrect"
                      : index === currentQuestionIndex
                      ? "active"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

          </div>

        </div>

      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center"
        }}
      >
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          ← Anterior
        </button>

        <button
            onClick={nextQuestion}
            disabled={
                !isAnswered ||
                currentQuestionIndex ===
                filteredQuestions.length - 1
            }
            >
            Siguiente →
        </button>
      </div>
    </div>
  );
}

export default ModuleStudy;
