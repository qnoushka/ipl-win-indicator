import { useState, useEffect } from "react";
import { api } from "../utils/api";

export default function PredictPage() {
  const [teams, setTeams]     = useState([]);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({
    team_a: "", team_b: "",
    venue: "neutral", pitch: "balanced",
    weather: "clear", toss: "none",
    innings: "pre", runs: "", wickets: "", overs: "",
  });

  useEffect(() => { api.getTeams().then(setTeams); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const teamA = teams.find(t => t.id === form.team_a);
  const teamB = teams.find(t => t.id === form.team_b);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.team_a || !form.team_b || form.team_a === form.team_b) {
      setError("Please select two different teams.");
      return;
    }
    setError(""); setLoading(true);
    try {
      const res = await api.predict({
        ...form,
        runs: Number(form.runs) || 0,
        wickets: Number(form.wickets) || 0,
        overs: Number(form.overs) || 0,
      });
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Win Probability Predictor</h1>
        <p>Select teams, set conditions, get predicted win odds</p>
      </div>

      <form className="predict-form" onSubmit={handleSubmit}>

        {/* Team Selection */}
        <div className="card">
          <h2 className="card-title">Select Teams</h2>
          <div className="team-row">
            <div className="team-pick">
              <label>Team 1</label>
              <select value={form.team_a} onChange={e => set("team_a", e.target.value)}>
                <option value="">-- Pick team --</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              {teamA && (
                <div className="team-badge" style={{ borderColor: teamA.color }}>
                  <span className="team-short" style={{ color: teamA.color }}>{teamA.short}</span>
                  <span className="team-meta">{teamA.titles} titles · {teamA.win_rate}% win rate</span>
                </div>
              )}
            </div>

            <div className="vs-circle">VS</div>

            <div className="team-pick">
              <label>Team 2</label>
              <select value={form.team_b} onChange={e => set("team_b", e.target.value)}>
                <option value="">-- Pick team --</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              {teamB && (
                <div className="team-badge" style={{ borderColor: teamB.color }}>
                  <span className="team-short" style={{ color: teamB.color }}>{teamB.short}</span>
                  <span className="team-meta">{teamB.titles} titles · {teamB.win_rate}% win rate</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Match Conditions */}
        <div className="card">
          <h2 className="card-title">Match Conditions</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Venue</label>
              <select value={form.venue} onChange={e => set("venue", e.target.value)}>
                <option value="neutral">Neutral ground</option>
                {teamA && <option value="home_a">{teamA.short} home</option>}
                {teamB && <option value="home_b">{teamB.short} home</option>}
              </select>
            </div>
            <div className="form-group">
              <label>Pitch type</label>
              <select value={form.pitch} onChange={e => set("pitch", e.target.value)}>
                <option value="balanced">Balanced</option>
                <option value="batting">Batting friendly</option>
                <option value="bowling">Bowling friendly</option>
                <option value="spin">Spin friendly</option>
              </select>
            </div>
            <div className="form-group">
              <label>Weather</label>
              <select value={form.weather} onChange={e => set("weather", e.target.value)}>
                <option value="clear">Clear</option>
                <option value="overcast">Overcast</option>
                <option value="humid">Hot & humid</option>
              </select>
            </div>
            <div className="form-group">
              <label>Toss result</label>
              <select value={form.toss} onChange={e => set("toss", e.target.value)}>
                <option value="none">Not decided</option>
                {teamA && <option value="a_bat">{teamA.short} bats first</option>}
                {teamB && <option value="b_bat">{teamB.short} bats first</option>}
              </select>
            </div>
          </div>
        </div>

        {/* Live Situation */}
        <div className="card">
          <h2 className="card-title">
            Live Match Situation
            <span className="optional-tag">optional</span>
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Innings</label>
              <select value={form.innings} onChange={e => set("innings", e.target.value)}>
                <option value="pre">Pre-match</option>
                <option value="1st">1st innings in progress</option>
                <option value="2nd">2nd innings in progress</option>
              </select>
            </div>
            <div className="form-group">
              <label>Runs scored</label>
              <input type="number" min="0" max="350" placeholder="e.g. 120"
                value={form.runs} onChange={e => set("runs", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Wickets fallen</label>
              <input type="number" min="0" max="10" placeholder="0–10"
                value={form.wickets} onChange={e => set("wickets", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Overs bowled</label>
              <input type="number" min="0" max="20" step="0.1" placeholder="0–20"
                value={form.overs} onChange={e => set("overs", e.target.value)} />
            </div>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        <button type="submit" className="btn-predict" disabled={loading}>
          {loading ? "Calculating..." : "Calculate Win Probability"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="result-card">
          <div className="result-winner">
            <span className="winner-label">Predicted winner</span>
            <span className="winner-name">{result.predicted_winner.name}</span>
            <span className={`confidence confidence-${result.confidence.toLowerCase()}`}>
              {result.confidence} confidence · {result.win_probability}%
            </span>
          </div>

          <div className="prob-bar-wrap">
            <div className="prob-label-row">
              <span style={{ color: teamA?.color }}>{result.team_a.short}</span>
              <span style={{ color: teamB?.color }}>{result.team_b.short}</span>
            </div>
            <div className="prob-bar">
              <div className="prob-fill-a"
                style={{ width: result.team_a.probability + "%", background: teamA?.color }}>
                {result.team_a.probability >= 15 && <span>{result.team_a.probability}%</span>}
              </div>
              <div className="prob-fill-b"
                style={{ width: result.team_b.probability + "%", background: teamB?.color }}>
                {result.team_b.probability >= 15 && <span>{result.team_b.probability}%</span>}
              </div>
            </div>
          </div>

          {result.factors.length > 0 && (
            <div className="factors-section">
              <h3>Key factors</h3>
              {result.factors.map((f, i) => (
                <div className="factor-item" key={i}>
                  <span className="factor-name">{f.factor}</span>
                  <span className="factor-team">{f.team}</span>
                  <span className="factor-impact">{f.impact}</span>
                </div>
              ))}
            </div>
          )}
          <p className="result-disclaimer">
            Based on historical IPL data. Not a guaranteed prediction.
          </p>
        </div>
      )}
    </div>
  );
}