from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
import jwt, bcrypt, sqlite3
from datetime import datetime, timedelta
from data import TEAMS, MATCHES, calculate_win_probability

app = FastAPI(title="IPL Win Indicator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "change-this-in-production"
ALGORITHM = "HS256"
security = HTTPBearer(auto_error=False)

def get_db():
    conn = sqlite3.connect("ipl.db")
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    conn = sqlite3.connect("ipl.db")
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )""")
    c.execute("""CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        team_id TEXT NOT NULL,
        UNIQUE(user_id, team_id),
        FOREIGN KEY(user_id) REFERENCES users(id)
    )""")
    conn.commit()
    conn.close()

init_db()

def make_token(user_id: int, email: str):
    payload = {
        "sub": str(user_id),
        "email": email,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return {"id": int(payload["sub"]), "email": payload["email"]}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

class RegisterIn(BaseModel):
    full_name: str
    email: str
    password: str

class LoginIn(BaseModel):
    email: str
    password: str

class PredictIn(BaseModel):
    team_a: str
    team_b: str
    venue: str = "neutral"
    pitch: str = "balanced"
    weather: str = "clear"
    toss: str = "none"
    innings: str = "pre"
    runs: Optional[int] = 0
    wickets: Optional[int] = 0
    overs: Optional[float] = 0.0

@app.post("/auth/register")
def register(body: RegisterIn, db: sqlite3.Connection = Depends(get_db)):
    pw_hash = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    try:
        db.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (?,?,?)",
            (body.full_name, body.email, pw_hash)
        )
        db.commit()
        row = db.execute(
            "SELECT id, name, email FROM users WHERE email=?", (body.email,)
        ).fetchone()
        return {"token": make_token(row["id"], row["email"]), "user": dict(row)}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")

@app.post("/auth/login")
def login(body: LoginIn, db: sqlite3.Connection = Depends(get_db)):
    row = db.execute("SELECT * FROM users WHERE email=?", (body.email,)).fetchone()
    if not row or not bcrypt.checkpw(body.password.encode(), row["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "token": make_token(row["id"], row["email"]),
        "user": {"id": row["id"], "name": row["name"], "email": row["email"]}
    }

@app.get("/auth/me")
def me(user=Depends(get_current_user), db: sqlite3.Connection = Depends(get_db)):
    row = db.execute(
        "SELECT id, name, email FROM users WHERE id=?", (user["id"],)
    ).fetchone()
    return dict(row)

@app.get("/teams")
def get_teams():
    return TEAMS

@app.get("/teams/{team_id}")
def get_team(team_id: str):
    team = next((t for t in TEAMS if t["id"] == team_id), None)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@app.get("/matches")
def get_matches(season: Optional[int] = None, team: Optional[str] = None):
    result = MATCHES
    if season:
        result = [m for m in result if m["season"] == season]
    if team:
        result = [m for m in result if team in (m["team_a"], m["team_b"])]
    return result

@app.post("/predict")
def predict(body: PredictIn):
    team_a = next((t for t in TEAMS if t["id"] == body.team_a), None)
    team_b = next((t for t in TEAMS if t["id"] == body.team_b), None)
    if not team_a or not team_b:
        raise HTTPException(status_code=400, detail="Invalid team IDs")
    if team_a["id"] == team_b["id"]:
        raise HTTPException(status_code=400, detail="Select two different teams")
    return calculate_win_probability(
        team_a, team_b,
        venue=body.venue, pitch=body.pitch, weather=body.weather,
        toss=body.toss, innings=body.innings,
        runs=body.runs, wickets=body.wickets, overs=body.overs
    )

@app.get("/favorites")
def get_favorites(user=Depends(get_current_user), db: sqlite3.Connection = Depends(get_db)):
    rows = db.execute(
        "SELECT team_id FROM favorites WHERE user_id=?", (user["id"],)
    ).fetchall()
    fav_ids = [r["team_id"] for r in rows]
    return [t for t in TEAMS if t["id"] in fav_ids]

@app.post("/favorites/{team_id}")
def add_favorite(team_id: str, user=Depends(get_current_user), db: sqlite3.Connection = Depends(get_db)):
    try:
        db.execute(
            "INSERT INTO favorites (user_id, team_id) VALUES (?,?)",
            (user["id"], team_id)
        )
        db.commit()
    except sqlite3.IntegrityError:
        pass
    return {"status": "added"}

@app.delete("/favorites/{team_id}")
def remove_favorite(team_id: str, user=Depends(get_current_user), db: sqlite3.Connection = Depends(get_db)):
    db.execute(
        "DELETE FROM favorites WHERE user_id=? AND team_id=?",
        (user["id"], team_id)
    )
    db.commit()
    return {"status": "removed"}

@app.get("/")
def root():
    return {"message": "IPL Win Indicator API is running!"}