# 🏏 IPL Win Indicator

A full-stack web app to predict IPL match win probabilities with live match tracking, team stats, match history, and user accounts.

**Stack:** React + Vite (frontend) · FastAPI + SQLite (backend)  
**Deploy:** Vercel (frontend) · Render (backend)

---

## Project Structure

```
ipl-win-indicator/
├── frontend/          # React + Vite app → deploy to Vercel
│   ├── src/
│   │   ├── pages/     # PredictPage, TeamsPage, MatchesPage, OtherPages
│   │   ├── components/# Navbar
│   │   ├── context/   # AuthContext (JWT auth)
│   │   └── utils/     # api.js (all API calls)
│   ├── vercel.json
│   └── package.json
│
└── backend/           # FastAPI app → deploy to Render
    ├── main.py        # All routes (auth, teams, matches, predict, favorites)
    ├── data.py        # Team data, match history, win probability logic
    ├── requirements.txt
    └── render.yaml
```

---

## Features

| Feature | Details |
|---|---|
| Win Probability | Select 2 teams, set pitch/weather/toss/venue, get predicted winner |
| Live Match Mode | Enter current score → probability updates in real-time |
| Team Stats | All 10 IPL teams with batting/bowling/spin/fielding ratings |
| Match History | Past results filterable by season and team |
| User Auth | Register/login with JWT tokens |
| Favorites | Save favourite teams (requires login) |

---

## Local Development

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# API runs at http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

The frontend proxies `/api/*` to `localhost:8000` via vite.config.js.

---

## Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo, set **Root Directory** to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `SECRET_KEY` = any long random string
7. Deploy → copy your Render URL (e.g. `https://ipl-api.onrender.com`)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your repo, set **Root Directory** to `frontend`
3. Add environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g. `https://ipl-api.onrender.com`)
4. Deploy

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Login, get JWT |
| GET | `/auth/me` | Yes | Get current user |
| GET | `/teams` | No | All 10 IPL teams |
| GET | `/teams/:id` | No | Single team details |
| GET | `/matches` | No | Match history (filterable) |
| POST | `/predict` | No | Get win probability |
| GET | `/favorites` | Yes | User's favourite teams |
| POST | `/favorites/:id` | Yes | Add favourite |
| DELETE | `/favorites/:id` | Yes | Remove favourite |

### Predict request body

```json
{
  "team_a": "csk",
  "team_b": "mi",
  "venue": "home_a",
  "pitch": "spin",
  "weather": "clear",
  "toss": "a_bat",
  "innings": "2nd",
  "runs": 120,
  "wickets": 3,
  "overs": 14.0
}
```

### Predict response

```json
{
  "team_a": { "id": "csk", "short": "CSK", "probability": 68 },
  "team_b": { "id": "mi",  "short": "MI",  "probability": 32 },
  "predicted_winner": { "id": "csk", "name": "Chennai Super Kings" },
  "win_probability": 68,
  "confidence": "High",
  "factors": [
    { "factor": "Home advantage", "team": "CSK", "impact": "+5%" },
    { "factor": "Spin-friendly pitch", "team": "Both", "impact": "Spinners favoured" }
  ]
}
```

---

## Team IDs

| ID | Team |
|---|---|
| `csk` | Chennai Super Kings |
| `mi` | Mumbai Indians |
| `rcb` | Royal Challengers Bengaluru |
| `kkr` | Kolkata Knight Riders |
| `dc` | Delhi Capitals |
| `srh` | Sunrisers Hyderabad |
| `pbks` | Punjab Kings |
| `rr` | Rajasthan Royals |
| `gt` | Gujarat Titans |
| `lsg` | Lucknow Super Giants |

---

## Extending the App

- **Real data**: Swap `data.py` with calls to the [Cricbuzz API](https://rapidapi.com/cricketapilive/api/cricbuzz-cricket) or [CricAPI](https://www.cricapi.com/)
- **ML model**: Replace `calculate_win_probability()` in `data.py` with a scikit-learn model trained on historical IPL data
- **More seasons**: Add more entries to `MATCHES` in `data.py`
- **PostgreSQL**: Replace SQLite with PostgreSQL for production (add `asyncpg` + `databases` packages)
