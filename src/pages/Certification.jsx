import { useState } from "react";
import CertificationExam from "./CertificationExam";

function Certification({ onBack }) {
    const [started, setStarted] =
  useState(false);

  if (started) {
    return (
        <CertificationExam
        onBack={() => setStarted(false)}
        />
    );
  }
  return (
    <div>

      <button onClick={onBack}>
        ← Regresar
      </button>

      <h2
        style={{
            color: "#0f172a",
            textAlign: "center"
        }}
        >
        🎯 Certificación
      </h2>

      <p>
        Simulación de certificación.
      </p>

      <p>
        46 preguntas
      </p>

      <p>
        Tiempo límite: 120 minutos
      </p>

      <button
        onClick={() => setStarted(true)}
        >
        Iniciar examen
      </button>

    </div>
  );
}

export default Certification;
