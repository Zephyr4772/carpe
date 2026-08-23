import { useEffect, useState } from "react"
import Tile from "./components/Tile"
import Dock from "./components/Dock"
import ProjectWindow from "./components/ProjectWindow"
import { projects, bgImage } from "./data/projects"
import "./App.css"

export default function App() {
  const [windows, setWindows] = useState([])

  const openProject = (project) => {
    setWindows((w) => [...w.filter((p) => p.id !== project.id), project])
  }

  const closeWindow = (id) => {
    setWindows((w) => w.filter((p) => p.id !== id))
  }

  const focusWindow = (id) => {
    setWindows((w) => {
      const target = w.find((p) => p.id === id)
      return [...w.filter((p) => p.id !== id), target].filter(Boolean)
    })
  }

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setWindows((w) => w.slice(0, -1))
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="desktop">
      <img className="bg-photo" src={bgImage} alt="" draggable="false" />
      <main className="canvas">
        {projects.map((p) => (
          <Tile key={p.id} project={p} onOpen={openProject} />
        ))}
      </main>
      <Dock />
      {windows.map((p) => (
        <ProjectWindow
          key={p.id}
          project={p}
          onClose={() => closeWindow(p.id)}
          onFocus={() => focusWindow(p.id)}
        />
      ))}
    </div>
  )
}
