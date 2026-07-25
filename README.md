<div align="center">

# ⚡ BidX
### AI-Powered Reverse Auction Procurement Platform

**Buyers post requirements. Vendors compete by bidding *down*. Lowest valid price wins.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-bid--x--gray.vercel.app-6C5CE7?style=for-the-badge)](https://bid-x-gray.vercel.app/)
[![API Docs](https://img.shields.io/badge/📘_API_Docs-Swagger-00B894?style=for-the-badge)](https://bidx-e0wt.onrender.com/docs)
[![GitHub](https://img.shields.io/badge/⭐_GitHub-Repo-181717?style=for-the-badge&logo=github)](YOUR_GITHUB_REPOSITORY_URL)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square&logo=jsonwebtokens)

</div>

---

## 💡 The Idea

Traditional procurement = emails, calls, spreadsheets, manual comparisons.
**BidX flips the auction model** — instead of prices going up, they go **down** as vendors compete for the contract.

```
₹50,000 → ₹47,500 → ₹45,000 → ₹42,500   🏆 Lowest valid bid wins
```

---

## ✨ Highlights

| 🏢 Tenant / Buyer | 🏭 Vendor / Supplier |
|---|---|
| Create & manage auctions | Discover live auctions |
| Watch bids roll in real-time | Submit competitive bids |
| See lowest bid instantly | Know if you're `LEADING` or `OUTBID` |
| Close auctions & pick winners | Track `WON` / `LOST` outcomes |
| Track procurement **savings %** | See exactly where you stand |
| 🤖 AI-powered anomaly alerts | Clean, focused bidding workspace |

**Plus:** JWT authentication · role-based access · protected routes · Swagger-documented REST API · CORS-secured cross-origin deployment.

---

## 🧠 How a Bid Wins

```
Tenant creates auction ──▶ Vendors discover it ──▶ Vendors underbid each other
        │                                                     │
        ▼                                                     ▼
  Auction stays OPEN                              Lowest bid = "Currently Leading"
        │                                                     │
        └───────────────── Tenant closes auction ─────────────┘
                                     │
                                     ▼
                    Lowest valid bid = WINNER 🏆
                    Savings = Starting Price − Winning Bid
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- React + TypeScript + Vite
- Tailwind CSS
- Axios · React Router
- JWT session handling

</td>
<td valign="top" width="50%">

**Backend**
- FastAPI (Python)
- SQLAlchemy + Pydantic
- JWT Auth · CORS Middleware
- OpenAPI / Swagger docs

</td>
</tr>
</table>

**Deployment:** Frontend → Vercel · Backend → Render · Docs → FastAPI Swagger

---

## 📡 Core API

```http
POST  /auth/register          # create Tenant or Vendor account
POST  /auth/login              # JWT login
GET   /auth/me                 # session restore

GET   /auctions/                POST /auctions/           PATCH /auctions/{id}/close
POST  /bids/                    GET  /bids/{auction_id}    GET   /bids/{auction_id}/lowest
GET   /ai-alerts/               # procurement risk & anomaly alerts
```

📖 Full interactive contract → **[bidx-e0wt.onrender.com/docs](https://bidx-e0wt.onrender.com/docs)**

> ⏳ Backend is hosted on Render's free tier — first request after inactivity may take a few extra seconds to spin up.

---

## 🚀 Run It Locally

```bash
git clone YOUR_GITHUB_REPOSITORY_URL && cd BidX
```

<details>
<summary><b>⚙️ Backend setup</b></summary>

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
# → http://127.0.0.1:8000/docs
```
</details>

<details>
<summary><b>🎨 Frontend setup</b></summary>

```bash
cd frontend
npm install
echo "VITE_API_URL=http://127.0.0.1:8000" > .env
npm run dev
# → http://localhost:5173
```
</details>

---

## 🔐 Security

`JWT auth` · `password hashing` · `role-based authorization` · `server-side validation` · `restricted CORS origins` · `env-based secrets` — frontend visibility is never a substitute for backend enforcement.

---

## 🗺️ Roadmap

- [ ] Real-time bidding via WebSockets
- [ ] Email/push notifications
- [ ] Vendor reputation scoring
- [ ] Advanced AI anomaly detection
- [ ] Admin dashboard & audit logs
- [ ] Exportable procurement reports

---

<div align="center">

## 👤 Author

**Piyush Ladukar** · Computer Science & Engineering

[![Portfolio](https://img.shields.io/badge/Portfolio-piyushladukar.vercel.app-6C5CE7?style=flat-square)](https://piyushladukar.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/piyush-ladukar)
[![GitHub](https://img.shields.io/badge/GitHub-PiyushLadukar-181717?style=flat-square&logo=github)](https://github.com/PiyushLadukar)

<sub>BidX is a full-stack engineering project. Production use would need additional compliance, auditing, and infra hardening.</sub>

**⭐ Star this repo if BidX impressed you!**

</div>