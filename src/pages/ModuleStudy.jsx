import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import modulo1 from "../data/modulo1.json";

function ModuleStudy({ moduleId, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] =  useState(false);
  const [questionStatus, setQuestionStatus] = useState({});

  const modules = {
    1: modulo1,
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

  const currentQuestion =
    selectedModule.questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (
        currentQuestionIndex <
        selectedModule.questions.length - 1
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

      <h3>
        Pregunta {currentQuestionIndex + 1} de{" "}
        {selectedModule.questions.length}
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
            {selectedModule.questions.map(
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
                selectedModule.questions.length - 1
            }
            >
            Siguiente →
        </button>
      </div>
    </div>
  );
}

export default ModuleStudy;
