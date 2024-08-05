import { NavLink } from "react-router-dom"
import PermissionChecker from "../PermissionChecker";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userState.mjs";

export const Navbar = () => {

  const user = useRecoilValue(userState);

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand text-white fw-semibold">SCPA Event</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav me-auto">
            <PermissionChecker permission="editMessages"><NavLink to="/messages" className="nav-link">Messages</NavLink></PermissionChecker>
            <PermissionChecker permission="editEvents"><NavLink to="/events" className="nav-link">Events</NavLink></PermissionChecker>
            <PermissionChecker permission="editUsers"><NavLink to="/users" className="nav-link">Users</NavLink></PermissionChecker>
            <PermissionChecker permission="points"><NavLink to="/points" className="nav-link">Points</NavLink></PermissionChecker>
            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">User: <code>{user.username}</code></a>
              <ul className="dropdown-menu">
                <li><NavLink to="/account" className="dropdown-item">Account</NavLink></li>
                <hr className="dropdown-divider" />
                <li><a href="/auth/logout" className="dropdown-item">Sign Out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}