import { useState } from "react";
import modulo1 from "../data/modulo1.json";
import PreCertificationExam from "./PreCertificationExam";

function PreCertification({ onBack }) {
  const [examQuestions, setExamQuestions] =
  useState(null);

  const startExam = (size) => {

    const questions =
      [...modulo1.questions];

    const shuffled =
      questions.sort(
        () => Math.random() - 0.5
      );

    const selected =
      size === "all"
        ? shuffled
        : shuffled.slice(0, size);

    setExamQuestions(selected);
  };

  if (examQuestions) {
    return (
      <PreCertificationExam
        questions={examQuestions}
        onBack={() =>
          setExamQuestions(null)
        }
      />
    );
  }

  return (
    <div>
      <button onClick={onBack}>
        ← Regresar
      </button>

      <h2>Precertificación</h2>

      <p>
        Selecciona la cantidad de preguntas
      </p>

      <div className="menu">

        <button
          onClick={() =>
            startExam(25)
          }
        >
          25 Preguntas
        </button>

        <button
          onClick={() =>
            startExam(50)
          }
        >
          50 Preguntas
        </button>

        <button
          onClick={() =>
            startExam(80)
          }
        >
          80 Preguntas
        </button>

        <button
          onClick={() =>
            startExam("all")
          }
        >
          Todas
        </button>

      </div>
    </div>
  );
}

export default PreCertification;
