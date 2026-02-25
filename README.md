# ⚔️ AlgoFight

**Battle your way to algorithmic mastery!**

AlgoFight is a real-time competitive coding platform where developers challenge each other in live algorithm battles. Solve problems faster than your opponent, climb the Elo leaderboard, and track your progress.

![AlgoFight Banner](https://img.shields.io/badge/Status-In%20Development-cyan?style=for-the-badge)

---

## 🚀 Features

- **🎮 Live Battle Arena** — Real-time 1v1 coding duels via Socket.IO matchmaking
- **💻 In-Browser Code Execution** — JavaScript solutions evaluated server-side in a sandboxed `vm`
- **📈 Elo Rating System** — Skill-based rating (K-factor 32) updates after every match
- **👤 User Profiles** — Track rating, battles played, battles won, and win rate — all from MongoDB
- **🏆 Leaderboard** — Live rankings sorted by Elo rating with win-rate display
- **🔐 Firebase Auth** — Google & GitHub OAuth login, synced to MongoDB backend
- **🎨 Modern UI** — Dark theme with neon cyan/purple accents, Framer Motion animations

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + Vite 7 | UI framework & dev server |
| **Routing** | React Router DOM 7 | Client-side navigation |
| **Auth** | Firebase Auth | Google & GitHub OAuth |
| **Animations** | Framer Motion | Page transitions & effects |
| **Real-Time** | Socket.IO Client | Matchmaking & live battles |
| **Backend** | Node.js + Express 4 | REST API & WebSocket server |
| **Database** | MongoDB Atlas + Mongoose | User profiles, matches, problems |
| **Real-Time** | Socket.IO Server | Matchmaking, code submission, battle events |
| **Code Runner** | Node.js `vm` module | Sandboxed JavaScript execution |
| **Rating** | Custom Elo algorithm | Skill-based ranking system |

---

## 📁 Project Structure

```
AlgoFight/
├── frontend/                    # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── Home/            # Landing page with hero section
│       │   ├── Battle/          # BattleArena (stats + Find Match) & LiveBattle (real-time duel)
│       │   ├── Profile/         # User profile, stats, achievements
│       │   ├── Leaderboard/     # Elo rankings table from MongoDB
│       │   ├── Rewards/         # Points & redemption system
│       │   ├── About/           # Team & mission info
│       │   ├── NavBar/          # Navigation with auth-aware logout
│       │   ├── Login/           # Firebase Google/GitHub login
│       │   ├── Signup/          # User registration
│       │   ├── ChallengeQuote/  # Motivational quotes
│       │   ├── BackgroundPaths/ # Animated background effects
│       │   └── Squares/         # Visual grid component
│       ├── contexts/
│       │   └── AuthContext.jsx  # Firebase auth state + backend sync
│       ├── services/
│       │   ├── api.js           # REST API calls (user sync, leaderboard, profile)
│       │   └── socket.js        # Socket.IO client singleton
│       ├── firebaseConfig.js    # Firebase project credentials
│       ├── App.jsx              # Routes with ProtectedRoute guards
│       └── main.jsx             # Entry point with AuthProvider
│
├── backend/                     # Node.js + Express backend
│   ├── index.js                 # Main server — Express, Socket.IO, MongoDB, all logic
│   ├── .env                     # PORT, MONGO_URI, JWT_SECRET, ELO_K_FACTOR
│   ├── models/
│   │   └── User.js              # Mongoose User schema (firebaseUid, rating, stats)
│   ├── src/
│   │   └── models/
│   │       ├── Problem.js       # Coding problem schema with test cases
│   │       └── Match.js         # Match history schema
│   └── package.json
```

---

## 🔄 How It Works

### Authentication Flow
1. User signs in via Firebase (Google or GitHub OAuth)
2. Frontend calls `POST /api/users` to sync Firebase user → MongoDB
3. Auth state managed by `AuthContext`, protected routes redirect unauthenticated users

### Battle Flow
1. Player clicks **"Find Match"** → Socket.IO emits `find_match` with username & Firebase UID
2. Server queues the player; when two players are waiting, creates a room
3. Random problem fetched from MongoDB, sent to both players (without test cases)
4. Players write JavaScript `solution()` functions and submit
5. Server executes code in a `vm` sandbox against hidden test cases
6. First player to pass all tests wins → `battle_over` event emitted
7. Elo ratings updated in MongoDB, match record saved
8. If a player disconnects mid-battle, opponent is awarded the win

### Rating System
- **Starting rating**: 1200
- **Algorithm**: Elo with K-factor 32
- **Updates**: Winner gains points, loser loses points (proportional to rating gap)
- **Floor**: Rating cannot drop below 0

---

## ⚡ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/users` | Create or update user (Firebase sync) |
| `GET` | `/api/users/:uid` | Get user profile by Firebase UID |
| `GET` | `/api/leaderboard` | Top 50 players sorted by rating |

### Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `find_match` | Client → Server | Join matchmaking queue |
| `waiting_for_opponent` | Server → Client | Queued, waiting for match |
| `match_found` | Server → Client | Match created, includes problem & opponent |
| `submit_code` | Client → Server | Submit solution for evaluation |
| `code_result` | Server → Client | Test case results |
| `battle_over` | Server → Client | Winner announced |
| `opponent_disconnected` | Server → Client | Opponent left, you win |

---

## 🏃 Getting Started

### Prerequisites
- **Node.js 18+**
- **npm**
- **MongoDB Atlas** account (or local MongoDB)
- **Firebase** project with Auth enabled (Google & GitHub providers)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/algofight.git
cd algofight
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3001
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/algofight?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
ELO_K_FACTOR=32
MATCH_DURATION=1800000
```

Start the backend:

```bash
node index.js
# → Server running on port 3001
# → MongoDB Connected
# → Seeded 5 problems to database (first run)
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Update `src/firebaseConfig.js` with your Firebase project credentials.

Start the frontend:

```bash
npm run dev
# → http://localhost:5173
```

---

## 📜 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---------|-------------|
| `node index.js` | Start Express + Socket.IO server (port 3001) |

---

## 🎨 Design System

```css
/* Core Colors */
--primary-cyan:   #00ffff
--primary-purple: #8a2be2
--bg-dark:        #0d1117

/* Typography Scale */
--font-xs to --font-3xl (0.75rem – 2.5rem)

/* Spacing */
--spacing-xs to --spacing-2xl (8px – 64px)
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by the AlgoFight Team
</p>
