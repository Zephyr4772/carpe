import { useRef } from "react"

export default function Tile({ project, onOpen }) {
  const ref = useRef(null)
  const drag = useRef(null)
  const moved = useRef(false)

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    drag.current = { sx: e.clientX, sy: e.clientY, dx: 0, dy: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    d.dx = e.clientX - d.sx
    d.dy = e.clientY - d.sy
    if (Math.abs(d.dx) > 3 || Math.abs(d.dy) > 3) {
      moved.current = true
      ref.current.style.transform = `translate(calc(-50% + ${d.dx}px), calc(-50% + ${d.dy}px))`
    }
  }

  const onPointerUp = () => {
    drag.current = null
  }

  const onClick = () => {
    if (!moved.current) onOpen(project)
    moved.current = false
  }

  return (
    <div
      className="tile"
      style={{
        "--x": `${project.pos.x}%`,
        "--y": `${project.pos.y}%`,
        "--mx": `${project.mobilePos.x}%`,
        "--my": `${project.mobilePos.y}%`,
        "--cw": `${project.cover[0]}px`,
        "--ch": `${project.cover[1]}px`,
        "--hw": `${project.hover[0]}px`,
        "--hh": `${project.hover[1]}px`,
        "--mw": `${project.mobileCover[0]}px`,
        "--mh": `${project.mobileCover[1]}px`,
      }}
      ref={ref}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      <div className="tile-inner">
        <div className="tile-cover-wrap">
          <div className="tile-cover">
            <img src={project.img} alt={project.title} draggable="false" />
          </div>
        </div>
        <div className="tile-title-pill">
          <h1 className="tile-title">{project.title}</h1>
        </div>
      </div>
    </div>
  )
}
