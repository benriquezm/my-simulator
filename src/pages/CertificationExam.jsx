import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import modulo1 from "../data/modulo1.json";

function CertificationExam({
  onBack
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);
  const [questionStatus, setQuestionStatus] =
  useState({});
  const [userAnswers, setUserAnswers] =
  useState({});
  const [showResults, setShowResults] =
  useState(false);
  const [reviewMode, setReviewMode] =
  useState(false);

  const questions =
    modulo1.questions.slice(0, 46);

  const currentQuestion =
    questions[currentIndex];

  if (reviewMode) {

    return (
      <div>

        <h2>
          📖 Revisión del examen
        </h2>

        {questions.map((question) => (

          <div
            key={question.id}
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px"
            }}
          >

            <h3>
              {question.question}
            </h3>

            <p>
              <strong>
                Tu respuesta:
              </strong>{" "}
              {
                userAnswers[
                  question.id
                ] !== undefined
                ? question.options[
                    userAnswers[
                      question.id
                    ]
                  ]
                : "Sin responder"
              }
            </p>

            <p>
              <strong>
                Respuesta correcta:
              </strong>{" "}
              {
                question.options[
                  question.correctAnswer
                ]
              }
            </p>

            <p>
              <strong>
                Explicación:
              </strong>{" "}
              {question.explanation}
            </p>

          </div>

        ))}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center"
          }}
        >

          <button onClick={onBack}>
            Volver al inicio
          </button>

        </div>

      </div>
    );
  }

  if (showResults) {

    const correctAnswers =
      questions.filter(
        (question) =>
          userAnswers[question.id] ===
          question.correctAnswer
      ).length;

    const answered =
      Object.keys(userAnswers).length;

    const unanswered =
      questions.length - answered;

    const incorrect =
      answered - correctAnswers;

    const score = Math.round(
      (correctAnswers / questions.length) * 100
    );

    return (
      <div>

        <h2>
          🎯 Resultado
        </h2>

        <p>
          Correctas: {correctAnswers}
        </p>

        <p>
          Incorrectas: {incorrect}
        </p>

        <p>
          Sin responder: {unanswered}
        </p>

        <h3>
          Calificación: {score}%
        </h3>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "1rem"
          }}
        >

          <button
            onClick={() => setReviewMode(true)}
          >
            Revisar examen
          </button>

          <button onClick={onBack}>
            Volver al inicio
          </button>

        </div>

      </div>
    );
  }

  return (
    <div>

      <button
        onClick={() => {
          const confirmFinish = window.confirm(
            "¿Deseas finalizar el examen?"
          );

          if (confirmFinish) {
            setShowResults(true);
          }
        }}
      >
        ← Finalizar examen
      </button>

      <h2
        style={{
          color: "#0f172a",
          textAlign: "center"
        }}
      >
        🎯 Certificación
      </h2>

      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#64748b"
        }}
      >
        Banco C · Simulación de Certificación
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
              showFeedback={false}
              onAnswered={(isCorrect, answer) => {

                setQuestionStatus((prev) => ({
                  ...prev,
                  [currentQuestion.id]: true
                }));

                setUserAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: answer
                }));

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
                      : questionStatus[question.id]
                      ? "answered"
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

        {currentIndex === questions.length - 1 ? (

          <button
            onClick={() => {
              setShowResults(true);
            }}
          >
            Finalizar examen
          </button>

        ) : (

          <button
            onClick={() => {
              setCurrentIndex(
                currentIndex + 1
              );
            }}
          >
            Siguiente →
          </button>

        )}
      </div>

    </div>
  );
}

export default CertificationExam;
      