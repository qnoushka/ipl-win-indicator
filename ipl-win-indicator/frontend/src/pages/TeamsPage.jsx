import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

export default function TeamsPage() {
  const { user } = useAuth();
  const [teams, setTeams]         = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected]   = useState(null);

  useEffect(() => {
    api.getTeams().then(setTeams);
    if (user) api.getFavorites().then(favs => setFavorites(favs.map(f => f.id)));
  }, [user]);

  const toggleFav = async (id) => {
    if (!user) return;
    if (favorites.includes(id)) {
      await api.removeFavorite(id);
      setFavorites(f => f.filter(x => x !== id));
    } else {
      await api.addFavorite(id);
      setFavorites(f => [...f, id]);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>IPL Teams</h1>
        <p>Stats and player info for all 10 teams</p>
      </div>

      <div className="teams-grid">
        {teams.map(t => (
          <div
            key={t.id}
            className={`team-card ${selected?.id === t.id ? "team-card-selected" : ""}`}
            onClick={() => setSelected(selected?.id === t.id ? null : t)}
          >
            {/* Card Header */}
            <div className="team-card-header" style={{ borderColor: t.color }}>
              <div className="team-card-short" style={{ color: t.color }}>{t.short}</div>
              <div className="team-card-titles">{t.titles} 🏆</div>
              {user && (
                <button
                  className={`fav-btn ${favorites.includes(t.id) ? "fav-active" : ""}`}
                  onClick={e => { e.stopPropagation(); toggleFav(t.id); }}
                >
                  {favorites.includes(t.id) ? "★" : "☆"}
                </button>
              )}
            </div>

            {/* Team name and city */}
            <div className="team-card-name">{t.name}</div>
            <div className="team-card-city">{t.city}</div>

            {/* Stat bars */}
            <div className="stat-bars">
              {["batting", "bowling", "spin", "fielding"].map(stat => (
                <div className="stat-bar-row" key={stat}>
                  <span className="stat-label">
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </span>
                  <div className="stat-bar-bg">
                    <div
                      className="stat-bar-fill"
                      style={{ width: t[stat] + "%", background: t.color }}
                    />
                  </div>
                  <span className="stat-value">{t[stat]}</span>
                </div>
              ))}
            </div>

            {/* Expanded details on click */}
            {selected?.id === t.id && (
              <div className="team-detail">
                <div className="detail-row">
                  <span>Captain</span><strong>{t.captain}</strong>
                </div>
                <div className="detail-row">
                  <span>Win rate</span><strong>{t.win_rate}%</strong>
                </div>
                <div className="detail-row">
                  <span>Matches</span><strong>{t.matches}</strong>
                </div>
                <div className="detail-row">
                  <span>Wins</span><strong>{t.wins}</strong>
                </div>
                <div className="detail-players">
                  <span>Key players:</span>
                  <div className="player-tags">
                    {t.top_players.map(p => (
                      <span className="player-tag" key={p}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}