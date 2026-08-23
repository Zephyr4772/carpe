import { dock } from "../data/projects"

export default function Dock() {
  return (
    <nav className="dock">
      <div className="dock-bg" />
      <div className="dock-icons">
        {dock.map((item, i) =>
          item.divider ? (
            <span className="dock-divider" key={i} />
          ) : (
            <div className="dock-group" key={i}>
              {item.group.map((icon) =>
                icon.href ? (
                  <a className="dock-icon" key={icon.name} href={icon.href} target="_blank" rel="noreferrer" title={icon.name}>
                    <img src={icon.img} alt={icon.name} draggable="false" />
                  </a>
                ) : (
                  <button className="dock-icon" key={icon.name} title={icon.name}>
                    <img src={icon.img} alt={icon.name} draggable="false" />
                  </button>
                )
              )}
            </div>
          )
        )}
      </div>
    </nav>
  )
}
