import { useState, useEffect } from 'react'
import ModuleStudy from './pages/ModuleStudy'
import PreCertification from "./pages/PreCertification";
import './App.css'

function App() {
  const [view, setView] = useState(
    localStorage.getItem("view") || "home"
  )

  const [selectedModule, setSelectedModule] =
    useState(
      Number(
        localStorage.getItem(
          "selectedModule"
        )
      ) || null
    )
  
  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  useEffect(() => {
    if (selectedModule) {
      localStorage.setItem(
        "selectedModule",
        selectedModule
      );
    }
  }, [selectedModule]);

  const modules = [
    { id: 1, name: 'Módulo 1' },
    { id: 2, name: 'Módulo 2' },
    { id: 3, name: 'Módulo 3' },
    { id: 4, name: 'Módulo 4' },
    { id: 5, name: 'Módulo 5' },
    { id: 6, name: 'Módulo 6' }
  ]

  return (
    <div className="app">
      <h1>Desarrollo Seguro</h1>

      {view === 'home' && !selectedModule && (
        <>
          <div className="menu">
            <button onClick={() => setView('modules')}>
              📚 Estudiar por módulo
            </button>

            <button
              onClick={() =>
                setView("precertification")
              }
            >
              📝 Precertificación
            </button>

            <button>
              🎯 Certificación
            </button>

            <button>
              🔥 Arquitecto Senior
            </button>

            <button>
              📊 Estadísticas
            </button>
          </div>
        </>
      )}

      {view === "modules" && !selectedModule && (
        <>
          <button onClick={() => setView("home")}>
            ← Regresar
          </button>

          <h2>Selecciona un módulo</h2>

          <div className="modules">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() =>
                  setSelectedModule(module.id)
                }
              >
                {module.name}
              </button>
            ))}
          </div>
        </>
      )}
      {view === "precertification" && (
        <PreCertification
          onBack={() =>
            setView("home")
          }
        />
      )}
      {selectedModule && (
        <ModuleStudy
          moduleId={selectedModule}
          onBack={() => setSelectedModule(null)}
        />
      )}
    </div>
  )
}

export default App
