import { useState } from "react";

function QuestionCard({ question, onAnswered }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    if (selected === null) return;

    setAnswered(true);

    if (onAnswered) {
      onAnswered(
        selected === question.correctAnswer
      );
    }
  };

  return (
    <div>
      <h3>{question.question}</h3>

      {question.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name={question.id}
              value={index}
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            {option}
          </label>
        </div>
      ))}

      {!answered && (
        <button onClick={handleAnswer}>
          Responder
        </button>
      )}

      {answered && (
        <>
          <h4>
            {selected === question.correctAnswer
              ? "✅ Correcta"
              : "❌ Incorrecta"}
          </h4>

          <p>
            <strong>Respuesta correcta:</strong>{" "}
            {question.options[question.correctAnswer]}
          </p>

          <p>
            <strong>Explicación:</strong>{" "}
            {question.explanation}
          </p>
        </>
      )}
    </div>
  );
}

export default QuestionCard;
