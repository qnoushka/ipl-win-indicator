import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

// ── FAVORITES PAGE ────────────────────────────────────────────────────────────

export function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) api.getFavorites().then(setFavorites);
  }, [user]);

  const remove = async (id) => {
    await api.removeFavorite(id);
    setFavorites(f => f.filter(t => t.id !== id));
  };

  if (!user) return (
    <div className="page">
      <div className="empty-state large">
        <div className="empty-icon">⭐</div>
        <p>Login to save your favourite teams</p>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Favourites</h1>
        <p>Your saved IPL teams</p>
      </div>

      {favorites.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">☆</div>
          <p>No favourites yet — head to <strong>Teams</strong> to add some!</p>
        </div>
      )}

      <div className="teams-grid">
        {favorites.map(t => (
          <div className="team-card" key={t.id}>
            <div className="team-card-header" style={{ borderColor: t.color }}>
              <div className="team-card-short" style={{ color: t.color }}>{t.short}</div>
              <button className="fav-btn fav-active" onClick={() => remove(t.id)}>★</button>
            </div>
            <div className="team-card-name">{t.name}</div>
            <div className="team-card-city">{t.city}</div>
            <div className="stat-bars">
              <div className="stat-bar-row">
                <span className="stat-label">Batting</span>
                <div className="stat-bar-bg">
                  <div className="stat-bar-fill" style={{ width: t.batting + "%", background: t.color }} />
                </div>
                <span className="stat-value">{t.batting}</span>
              </div>
              <div className="stat-bar-row">
                <span className="stat-label">Bowling</span>
                <div className="stat-bar-bg">
                  <div className="stat-bar-fill" style={{ width: t.bowling + "%", background: t.color }} />
                </div>
                <span className="stat-value">{t.bowling}</span>
              </div>
            </div>
            <div className="detail-row" style={{ marginTop: 8 }}>
              <span>Win rate</span><strong>{t.win_rate}%</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🏏</div>
        <h1 className="auth-title">Welcome back</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <button type="submit" className="btn-predict" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

// ── REGISTER PAGE ─────────────────────────────────────────────────────────────

export function RegisterPage() {
  const { register } = useAuth();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await register(name, email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🏏</div>
        <h1 className="auth-title">Create account</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Min 6 characters"
              minLength={6}
            />
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          <button type="submit" className="btn-predict" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}