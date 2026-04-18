# 🏏 IPL Win Indicator

A full-stack web app to predict IPL match win probabilities with live match tracking, team stats, match history, and user accounts.

**Stack:** React + Vite (frontend) · FastAPI + SQLite (backend)
**Deploy:** Netlify (frontend) · Render (backend)

---

## 🔗 Live Links

- **App:** https://ipl-win-indicator.netlify.app
- **API:** https://ipl-win-indicator-api.onrender.com
- **API Docs:** https://ipl-win-indicator-api.onrender.com/docs

---

## Features

| Feature | Details |
|---|---|
| Win Probability | Select 2 teams, set pitch/weather/toss/venue, get predicted winner |
| Live Match Mode | Enter current score and probability updates |
| Team Stats | All 10 IPL teams with batting/bowling/spin/fielding ratings |
| Match History | Past results filterable by season and team |
| User Auth | Register/login with JWT tokens |
| Favorites | Save favourite teams (requires login) |
| Dark Mode | Toggle between light and dark theme |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS with CSS variables + dark mode |
| Routing | React Router v6 |
| Backend | FastAPI (Python) |
| Database | SQLite |
| Auth | JWT tokens |
| Frontend Deploy | Netlify |
| Backend Deploy | Render |

---

## Local Development

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at http://localhost:8000
Swagger docs at http://localhost:8000/docs

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
App runs at http://localhost:5173

---

## Deployment

### Backend → Render
1. Push code to GitHub
2. Go to render.com → New → Web Service
3. Connect repo → set Root Directory to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `SECRET_KEY` = any random string

### Frontend → Netlify
1. Go to netlify.com → Add new site → Import from GitHub
2. Connect repo → set Base directory to `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `frontend/dist`
5. Add environment variable: `VITE_API_URL` = your Render URL

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Login, get JWT |
| GET | `/auth/me` | Yes | Get current user |
| GET | `/teams` | No | All 10 IPL teams |
| GET | `/matches` | No | Match history |
| POST | `/predict` | No | Get win probability |
| GET | `/favorites` | Yes | User's favourite teams |
| POST | `/favorites/:id` | Yes | Add favourite |
| DELETE | `/favorites/:id` | Yes | Remove favourite |
