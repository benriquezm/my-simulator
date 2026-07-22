import { useState } from "react";
import QuestionCard from "../components/QuestionCard";

function PreCertificationExam({
  questions,
  onBack
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);
  const [questionStatus, setQuestionStatus] =
  useState({});
  const [isAnswered, setIsAnswered] =
  useState(false);

  const currentQuestion =
    questions[currentIndex];

  return (
    <div>

      <button onClick={onBack}>
        ← Regresar
      </button>

      <h2
        style={{
            color: "red",
            textAlign: "center"
        }}
        >
        📝 Precertificación
      </h2>

      <p
        style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#64748b"
        }}
        >
        Banco B · Modo Estudio
      </p>

      <h3>
        Pregunta {currentIndex + 1} de{" "}
        {questions.length}
      </h3>

      <div className="study-layout">

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

            {questions.map(
                (question, index) => (
                <button
                    key={question.id}
                    className={`question-number ${
                    index === currentIndex
                        ? "active"
                        : questionStatus[question.id] ===
                        "correct"
                        ? "correct"
                        : questionStatus[question.id] ===
                        "incorrect"
                        ? "incorrect"
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
          marginTop: "2rem"
        }}
      >
        <button
          disabled={currentIndex === 0}
          onClick={() =>
            setCurrentIndex(
              currentIndex - 1
            )
          }
        >
          ← Anterior
        </button>

        <button
            disabled={
                !isAnswered ||
                currentIndex === questions.length - 1
            }
            onClick={() => {
                setCurrentIndex(currentIndex + 1);
                setIsAnswered(false);
            }}
            >
            Siguiente →
        </button>
      </div>

    </div>
  );
}

export default PreCertificationExam;
