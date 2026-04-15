import { useState, useEffect } from "react";
import { api } from "../utils/api";

export default function MatchesPage() {
  const [matches, setMatches]       = useState([]);
  const [teams, setTeams]           = useState([]);
  const [season, setSeason]         = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  useEffect(() => {
    api.getTeams().then(setTeams);
    api.getMatches().then(setMatches);
  }, []);

  // Filter matches based on selected season and team
  const filtered = matches.filter(m => {
    if (season && m.season !== Number(season)) return false;
    if (teamFilter && m.team_a !== teamFilter && m.team_b !== teamFilter) return false;
    return true;
  });

  const getTeam = id => teams.find(t => t.id === id);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Match History</h1>
        <p>Past IPL results and scorecards</p>
      </div>

      {/* Filters */}
      <div className="filter-row">
        <select value={season} onChange={e => setSeason(e.target.value)}>
          <option value="">All seasons</option>
          <option value="2024">IPL 2024</option>
          <option value="2023">IPL 2023</option>
        </select>
        <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)}>
          <option value="">All teams</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Match list */}
      <div className="matches-list">
        {filtered.length === 0 && (
          <div className="empty-state">No matches found.</div>
        )}
        {filtered.map(m => {
          const tA = getTeam(m.team_a);
          const tB = getTeam(m.team_b);
          return (
            <div className="match-card" key={m.id}>
              <div className="match-meta">
                <span className="match-season">IPL {m.season}</span>
                <span className="match-date">{m.date}</span>
                <span className="match-venue">{m.venue}</span>
              </div>
              <div className="match-teams">
                <div className={`match-team ${m.winner === m.team_a ? "match-winner" : ""}`}>
                  <span className="match-short" style={{ color: tA?.color }}>{tA?.short}</span>
                  <span className="match-score">{m.score_a}</span>
                  {m.winner === m.team_a && <span className="win-badge">Won</span>}
                </div>
                <div className="match-vs">vs</div>
                <div className={`match-team ${m.winner === m.team_b ? "match-winner" : ""}`}>
                  <span className="match-short" style={{ color: tB?.color }}>{tB?.short}</span>
                  <span className="match-score">{m.score_b}</span>
                  {m.winner === m.team_b && <span className="win-badge">Won</span>}
                </div>
              </div>
              <div className="match-mom">
                Man of the Match: <strong>{m.mom}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}