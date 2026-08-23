import { useRef, useState } from "react"
import { windowContent } from "../data/windowContent"

const Chevron = () => (
  <svg width="9" height="5" viewBox="0 0 10 6" fill="none">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function MediaItem({ item }) {
  if (item.type === "video") {
    return (
      <div className="wp-media" style={{ width: `${item.wPct}%`, aspectRatio: `${item.ar}` }}>
        <video src={item.src} autoPlay muted loop playsInline controls={false} />
      </div>
    )
  }
  return (
    <div className="wp-media" style={{ width: `${item.wPct}%`, aspectRatio: `${item.ar}` }}>
      <img src={item.file} alt="" loading="lazy" draggable="false" />
    </div>
  )
}

export default function ProjectWindow({ project, onClose, onFocus }) {
  const content = windowContent[project.id]
  const drag = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onBarDown = (e) => {
    if (e.button !== 0) return
    if (e.target.closest(".tl")) return
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
    onFocus()
  }

  const onBarMove = (e) => {
    const d = drag.current
    if (!d) return
    setPos({ x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) })
  }

  return (
    <div
      className="window"
      style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
    >
      <div className="window-topbar" onPointerDown={onBarDown} onPointerMove={onBarMove} onPointerUp={() => (drag.current = null)}>
        <div className="window-dots">
          <button className="dot tl-close" aria-label="Close" onClick={onClose} onPointerDown={(e) => e.stopPropagation()} />
          <span className="dot tl-min" />
          <span className="dot tl-max" />
        </div>
        <h1 className="window-heading">{content?.headerTitle || `Information about: ${project.title}`}</h1>
      </div>

      <div className="window-scroll">
        <header className="wp-overview">
          <img className="wp-thumb" src={project.img} alt="" draggable="false" />
          <div>
            <div className="wp-name">{project.title}</div>
            {content?.client && <div className="wp-client">{content.client}</div>}
          </div>
        </header>

        {content?.descHtml && (
          <section className="wp-desc" dangerouslySetInnerHTML={{ __html: content.descHtml }} />
        )}

        {content?.details?.length > 0 && (
          <>
            <div className="wp-label">
              <Chevron /> Details:
            </div>
            <div className="wp-details">
              {content.details.map((line, i) =>
                i === 0 ? (
                  <span key={i} className="wp-details-key">
                    {line}
                  </span>
                ) : (
                  <span key={i} className="wp-details-val">
                    {line}
                  </span>
                )
              )}
            </div>
          </>
        )}

        {content?.rows?.length > 0 && (
          <>
            <div className="wp-label">
              <Chevron /> Preview:
            </div>
            <div className="wp-photos">
              {content.rows.map((row, ri) => (
                <div className="wp-row" key={ri} style={{ marginTop: ri === 0 ? 0 : `${row.gapTop}px` }}>
                  {row.items.map((item, ii) => (
                    <div key={ii} style={{ marginLeft: ii === 0 ? `${row.items[0].leftGapPct}%` : `${item.leftGapPct}%` }}>
                      <MediaItem item={item} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {content?.credits?.length > 0 && (
          <>
            <div className="wp-label">
              <Chevron /> Credits:
            </div>
            <div className="wp-credits">
              {content.credits.map((c, i) => (
                <div key={i} className="wp-credits-col" dangerouslySetInnerHTML={{ __html: c }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
