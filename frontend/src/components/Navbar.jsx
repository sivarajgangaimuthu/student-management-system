import { GraduationCap, Plus, Users } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <span className="brand-mark">
            <GraduationCap size={22} aria-hidden="true" />
          </span>
          StudentMS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavigation">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-2" to="/students">
                <Users size={18} aria-hidden="true" />
                Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-primary d-flex align-items-center gap-2 ms-lg-2" to="/students/add">
                <Plus size={18} aria-hidden="true" />
                Add Student
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
