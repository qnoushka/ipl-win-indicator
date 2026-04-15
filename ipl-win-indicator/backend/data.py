TEAMS = [
    {
        "id": "csk", "name": "Chennai Super Kings", "short": "CSK",
        "color": "#FDB913", "city": "Chennai",
        "titles": 5, "matches": 234, "wins": 135,
        "strength": 88, "batting": 90, "bowling": 85, "spin": 92, "fielding": 86,
        "home_ground": "MA Chidambaram Stadium",
        "captain": "MS Dhoni",
        "top_players": ["MS Dhoni", "Ruturaj Gaikwad", "Ravindra Jadeja", "Deepak Chahar"],
        "win_rate": 57.7
    },
    {
        "id": "mi", "name": "Mumbai Indians", "short": "MI",
        "color": "#004BA0", "city": "Mumbai",
        "titles": 5, "matches": 240, "wins": 138,
        "strength": 87, "batting": 88, "bowling": 86, "spin": 78, "fielding": 88,
        "home_ground": "Wankhede Stadium",
        "captain": "Hardik Pandya",
        "top_players": ["Rohit Sharma", "Suryakumar Yadav", "Jasprit Bumrah", "Hardik Pandya"],
        "win_rate": 57.5
    },
    {
        "id": "rcb", "name": "Royal Challengers Bengaluru", "short": "RCB",
        "color": "#EC1C24", "city": "Bengaluru",
        "titles": 1, "matches": 240, "wins": 116,
        "strength": 80, "batting": 92, "bowling": 68, "spin": 72, "fielding": 78,
        "home_ground": "M. Chinnaswamy Stadium",
        "captain": "Faf du Plessis",
        "top_players": ["Virat Kohli", "Faf du Plessis", "Glenn Maxwell", "Mohammed Siraj"],
        "win_rate": 48.3
    },
    {
        "id": "kkr", "name": "Kolkata Knight Riders", "short": "KKR",
        "color": "#3A225D", "city": "Kolkata",
        "titles": 3, "matches": 232, "wins": 121,
        "strength": 83, "batting": 82, "bowling": 82, "spin": 88, "fielding": 85,
        "home_ground": "Eden Gardens",
        "captain": "Shreyas Iyer",
        "top_players": ["Shreyas Iyer", "Sunil Narine", "Andre Russell", "Varun Chakravarthy"],
        "win_rate": 52.2
    },
    {
        "id": "dc", "name": "Delhi Capitals", "short": "DC",
        "color": "#0078BC", "city": "Delhi",
        "titles": 0, "matches": 224, "wins": 106,
        "strength": 78, "batting": 80, "bowling": 78, "spin": 76, "fielding": 80,
        "home_ground": "Arun Jaitley Stadium",
        "captain": "David Warner",
        "top_players": ["David Warner", "Rishabh Pant", "Axar Patel", "Anrich Nortje"],
        "win_rate": 47.3
    },
    {
        "id": "srh", "name": "Sunrisers Hyderabad", "short": "SRH",
        "color": "#F7A721", "city": "Hyderabad",
        "titles": 1, "matches": 178, "wins": 91,
        "strength": 79, "batting": 84, "bowling": 78, "spin": 75, "fielding": 82,
        "home_ground": "Rajiv Gandhi International Stadium",
        "captain": "Pat Cummins",
        "top_players": ["Travis Head", "Heinrich Klaasen", "Pat Cummins", "Bhuvneshwar Kumar"],
        "win_rate": 51.1
    },
    {
        "id": "pbks", "name": "Punjab Kings", "short": "PBKS",
        "color": "#ED1B24", "city": "Mohali",
        "titles": 0, "matches": 230, "wins": 107,
        "strength": 74, "batting": 82, "bowling": 70, "spin": 70, "fielding": 76,
        "home_ground": "PCA IS Bindra Stadium",
        "captain": "Shikhar Dhawan",
        "top_players": ["Shikhar Dhawan", "Liam Livingstone", "Arshdeep Singh", "Sam Curran"],
        "win_rate": 46.5
    },
    {
        "id": "rr", "name": "Rajasthan Royals", "short": "RR",
        "color": "#254AA5", "city": "Jaipur",
        "titles": 1, "matches": 196, "wins": 100,
        "strength": 81, "batting": 83, "bowling": 79, "spin": 83, "fielding": 83,
        "home_ground": "Sawai Mansingh Stadium",
        "captain": "Sanju Samson",
        "top_players": ["Sanju Samson", "Jos Buttler", "Yuzvendra Chahal", "Trent Boult"],
        "win_rate": 51.0
    },
    {
        "id": "gt", "name": "Gujarat Titans", "short": "GT",
        "color": "#1C1C1C", "city": "Ahmedabad",
        "titles": 2, "matches": 46, "wins": 28,
        "strength": 82, "batting": 80, "bowling": 84, "spin": 80, "fielding": 84,
        "home_ground": "Narendra Modi Stadium",
        "captain": "Shubman Gill",
        "top_players": ["Shubman Gill", "Mohammed Shami", "Rashid Khan", "Hardik Pandya"],
        "win_rate": 60.9
    },
    {
        "id": "lsg", "name": "Lucknow Super Giants", "short": "LSG",
        "color": "#A72056", "city": "Lucknow",
        "titles": 0, "matches": 46, "wins": 24,
        "strength": 76, "batting": 78, "bowling": 76, "spin": 77, "fielding": 79,
        "home_ground": "BRSABV Ekana Cricket Stadium",
        "captain": "KL Rahul",
        "top_players": ["KL Rahul", "Quinton de Kock", "Ravi Bishnoi", "Mark Wood"],
        "win_rate": 52.2
    },
]

MATCHES = [
    {"id":"m1","season":2024,"date":"2024-03-22","team_a":"csk","team_b":"rcb","winner":"rcb","venue":"MA Chidambaram Stadium","score_a":"173/6","score_b":"176/4","mom":"Virat Kohli"},
    {"id":"m2","season":2024,"date":"2024-03-23","team_a":"pbks","team_b":"dc","winner":"pbks","venue":"PCA IS Bindra Stadium","score_a":"191/5","score_b":"181/8","mom":"Liam Livingstone"},
    {"id":"m3","season":2024,"date":"2024-03-24","team_a":"kkr","team_b":"srh","winner":"srh","venue":"Eden Gardens","score_a":"208/7","score_b":"209/5","mom":"Travis Head"},
    {"id":"m4","season":2024,"date":"2024-03-25","team_a":"rr","team_b":"lsg","winner":"rr","venue":"Sawai Mansingh Stadium","score_a":"193/4","score_b":"165/9","mom":"Jos Buttler"},
    {"id":"m5","season":2024,"date":"2024-03-26","team_a":"gt","team_b":"mi","winner":"gt","venue":"Narendra Modi Stadium","score_a":"168/6","score_b":"161/8","mom":"Rashid Khan"},
    {"id":"m6","season":2024,"date":"2024-03-29","team_a":"mi","team_b":"csk","winner":"mi","venue":"Wankhede Stadium","score_a":"200/5","score_b":"181/9","mom":"Rohit Sharma"},
    {"id":"m7","season":2024,"date":"2024-04-01","team_a":"srh","team_b":"rcb","winner":"srh","venue":"Rajiv Gandhi International Stadium","score_a":"287/3","score_b":"262/8","mom":"Heinrich Klaasen"},
    {"id":"m8","season":2024,"date":"2024-04-04","team_a":"kkr","team_b":"dc","winner":"kkr","venue":"Eden Gardens","score_a":"272/7","score_b":"207/8","mom":"Sunil Narine"},
    {"id":"m9","season":2023,"date":"2023-04-01","team_a":"csk","team_b":"gt","winner":"gt","venue":"MA Chidambaram Stadium","score_a":"178/7","score_b":"182/3","mom":"Shubman Gill"},
    {"id":"m10","season":2023,"date":"2023-04-02","team_a":"mi","team_b":"rcb","winner":"rcb","venue":"Wankhede Stadium","score_a":"171/9","score_b":"172/5","mom":"Faf du Plessis"},
    {"id":"m11","season":2023,"date":"2023-04-03","team_a":"kkr","team_b":"pbks","winner":"kkr","venue":"Eden Gardens","score_a":"179/6","score_b":"137/10","mom":"Andre Russell"},
    {"id":"m12","season":2023,"date":"2023-04-04","team_a":"rr","team_b":"dc","winner":"rr","venue":"Sawai Mansingh Stadium","score_a":"199/4","score_b":"165/8","mom":"Sanju Samson"},
]


def calculate_win_probability(team_a, team_b, venue, pitch, weather, toss, innings, runs, wickets, overs):
    score_a = float(team_a["strength"])
    score_b = float(team_b["strength"])
    factors = []

    # Home advantage
    if venue == "home_a":
        score_a += 5
        factors.append({"factor": "Home advantage", "team": team_a["short"], "impact": "+5%"})
    elif venue == "home_b":
        score_b += 5
        factors.append({"factor": "Home advantage", "team": team_b["short"], "impact": "+5%"})

    # Pitch type affects team strengths differently
    if pitch == "batting":
        score_a += (team_a["batting"] - 80) * 0.08
        score_b += (team_b["batting"] - 80) * 0.08
        factors.append({"factor": "Batting pitch", "team": "Both", "impact": "Batters favoured"})
    elif pitch == "bowling":
        score_a += (team_a["bowling"] - 78) * 0.08
        score_b += (team_b["bowling"] - 78) * 0.08
        factors.append({"factor": "Bowling pitch", "team": "Both", "impact": "Pacers favoured"})
    elif pitch == "spin":
        score_a += (team_a["spin"] - 78) * 0.10
        score_b += (team_b["spin"] - 78) * 0.10
        factors.append({"factor": "Spin-friendly pitch", "team": "Both", "impact": "Spinners favoured"})

    # Weather
    if weather == "overcast":
        score_a += (team_a["bowling"] - 78) * 0.05
        score_b += (team_b["bowling"] - 78) * 0.05
        factors.append({"factor": "Overcast conditions", "team": "Both", "impact": "Pace bowlers benefit"})

    # Toss advantage
    if toss == "a_bat" and pitch in ("batting", "balanced"):
        score_a += 3
        factors.append({"factor": "Toss won, batting first", "team": team_a["short"], "impact": "+3%"})
    elif toss == "b_bat" and pitch in ("batting", "balanced"):
        score_b += 3
        factors.append({"factor": "Toss won, batting first", "team": team_b["short"], "impact": "+3%"})
    elif toss == "a_bat" and pitch == "bowling":
        score_b += 2
    elif toss == "b_bat" and pitch == "bowling":
        score_a += 2

    # Live match situation
    if innings == "2nd" and overs > 0:
        crr = runs / overs
        wickets_left = 10 - wickets
        if crr < 8 and wickets_left > 6:
            score_a += 10
            factors.append({"factor": "Chase on track", "team": team_a["short"], "impact": "+10%"})
        elif crr > 13 or wickets_left < 3:
            score_b += 12
            factors.append({"factor": "Pressure on batting side", "team": team_b["short"], "impact": "+12%"})
        elif crr < 10 and wickets_left > 4:
            score_a += 5
            factors.append({"factor": "Manageable chase", "team": team_a["short"], "impact": "+5%"})
        else:
            score_b += 5
            factors.append({"factor": "Tricky chase", "team": team_b["short"], "impact": "+5%"})
    elif innings == "1st" and overs > 0:
        crr = runs / overs
        if crr > 10:
            score_a += 6
            factors.append({"factor": "Excellent run rate", "team": team_a["short"], "impact": "+6%"})
        elif crr < 7:
            score_b += 5
            factors.append({"factor": "Below-par scoring", "team": team_b["short"], "impact": "+5%"})
        if wickets > 5 and overs < 15:
            score_b += 7
            factors.append({"factor": "Too many early wickets", "team": team_b["short"], "impact": "+7%"})

    # Final probability calculation
    total = score_a + score_b
    prob_a = round((score_a / total) * 100)
    prob_b = 100 - prob_a
    prob_a = max(5, min(95, prob_a))
    prob_b = 100 - prob_a

    winner = team_a if prob_a >= prob_b else team_b
    win_prob = prob_a if prob_a >= prob_b else prob_b

    return {
        "team_a": {"id": team_a["id"], "short": team_a["short"], "name": team_a["name"], "probability": prob_a},
        "team_b": {"id": team_b["id"], "short": team_b["short"], "name": team_b["name"], "probability": prob_b},
        "predicted_winner": {"id": winner["id"], "short": winner["short"], "name": winner["name"]},
        "win_probability": win_prob,
        "confidence": "High" if abs(prob_a - prob_b) > 20 else "Medium" if abs(prob_a - prob_b) > 10 else "Low",
        "factors": factors
    }