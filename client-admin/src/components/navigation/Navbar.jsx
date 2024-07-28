import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand text-white fw-semibold">SCPA Event</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav me-auto">
            <NavLink to="/messages" className="nav-link">Messages</NavLink>
            <NavLink to="/events" className="nav-link">Events</NavLink>
            <NavLink to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/points" className="nav-link">Points</NavLink>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Account</a>
              <ul className="dropdown-menu">
                <li><NavLink to="/account" className="dropdown-item">Account</NavLink></li>
                <hr className="dropdown-divider" />
                <li><NavLink to="/logout" className="dropdown-item">Sign Out</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}