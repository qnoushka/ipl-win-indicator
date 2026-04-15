import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onToggleDark, dark }) {
  const { user, logout } = useAuth();
  const loc = useLocation();

  const active = (path) =>
    loc.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span>🏏</span>
        <span>IPL Win Indicator</span>
      </Link>

      <div className="nav-links">
        <Link to="/"        className={active("/")}>Predict</Link>
        <Link to="/teams"   className={active("/teams")}>Teams</Link>
        <Link to="/matches" className={active("/matches")}>Matches</Link>
        {user && <Link to="/favorites" className={active("/favorites")}>Favorites</Link>}
      </div>

      <div className="nav-auth">
        <button className="dark-toggle" onClick={onToggleDark}>
          {dark ? "☀️" : "🌙"}
        </button>
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    className="btn-ghost">Login</Link>
            <Link to="/register" className="btn-primary-sm">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}