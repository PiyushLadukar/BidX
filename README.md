<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C5CE7,50:00B894,100:00CEC9&height=260&section=header&text=BidX&fontSize=80&fontColor=ffffff&fontAlignY=35&desc=AI-Powered%20Reverse%20Auction%20Procurement%20Platform&descAlignY=55&descSize=22&animation=fadeIn" alt="BidX banner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=6C5CE7&center=true&vCenter=true&width=650&lines=Buyers+post+requirements.;Vendors+compete+by+bidding+DOWN.;Lowest+valid+price+wins.+%F0%9F%8F%86" alt="Typing SVG" />
</p>

<p align="center">
  Live Demo: https://bid-x-gray.vercel.app/ &nbsp;|&nbsp;
  API Docs: https://bidx-e0wt.onrender.com/docs &nbsp;|&nbsp;
  GitHub: https://github.com/PiyushLadukar/BidX
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="status"/>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license"/>
  <img src="https://img.shields.io/badge/made%20with-%E2%9D%A4-red" alt="made with love"/>
</p>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 📖 Overview

**BidX** is a full-stack B2B **reverse-auction procurement platform** built to make organizational purchasing competitive, transparent, and fast.

In a normal auction, prices go up. In a reverse auction, they go **down**:

> A buyer (Tenant) posts a procurement requirement. Multiple vendors compete against each other by progressively lowering their price. When the auction closes, the **lowest valid bid wins** the contract.

BidX gives Tenants and Vendors two completely separate, purpose-built experiences, covers the full procurement lifecycle end-to-end, and layers in **AI-assisted alerts** so buyers can spot unusual bidding behavior without manually watching every auction.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🎯 Why It Exists

Manual procurement usually looks like this:

```
Buyer → emails Vendor A → emails Vendor B → emails Vendor C
      → waits for quotes → compares manually in Excel → picks one
```

BidX replaces that with a structured, competitive, auditable workflow:

```
                    ┌──────────────┐
                    │    Tenant    │
                    └──────┬───────┘
                           │ creates auction
                           ▼
                    ┌──────────────┐
                    │   Auction    │
                    └──────┬───────┘
                           │ vendors discover it
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Vendor A     Vendor B     Vendor C
          ₹48,000      ₹46,500      ₹44,000
              └────────────┼────────────┘
                           ▼
                   Lowest Valid Bid
                           │
                    Tenant closes auction
                           ▼
                     🏆 Winning Vendor
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🧩 Feature Breakdown

### 🔐 Authentication & Authorization
- Email/password registration for Tenants and Vendors
- Secure JWT login with `/auth/me` session restore on refresh
- Protected frontend routes + role-aware UI rendering
- Backend-enforced authorization on every protected operation (frontend hiding a button is never the real security boundary)

### 🏢 Tenant / Buyer — "Procurement Control Center"
- Create procurement auctions (title, description, category, quantity, starting price, start/end time)
- Live view of active auctions and how much bidding activity they're getting
- Real-time-style tracking of the current lowest bid and number of participating vendors
- Close auctions manually once satisfied with the competition
- Full results view: winner, winning bid, starting price, savings ₹ and %
- Dashboard summary: Active Auctions, Total Bids, Participating Vendors, Procurement Savings
- 🤖 AI Procurement Alerts panel for anomaly/risk monitoring

### 🏭 Vendor / Supplier — "Bidding Workspace"
- Browse all currently open auctions
- View requirement details and the current lowest competing price
- Submit a bid at any time before the auction closes
- Instant status per auction:
  - `LEADING` — you currently have the lowest bid
  - `OUTBID` — someone has undercut you
  - `WON` — auction closed and you had the lowest valid bid
  - `LOST` — auction closed and someone else won
- History of all past auctions won

### 🤖 AI-Assisted Procurement Alerts
A dedicated alert layer, visible only to Tenants, that surfaces backend-generated insights around:
- unusual or suspicious bidding behavior
- sudden/unexpected price movements
- auctions that may need buyer attention
- general procurement risk signals

Alerts are pulled from a real backend endpoint (`/ai-alerts/`) — nothing is faked on the frontend.

### 💰 Procurement Savings Engine
Every closed auction produces a measurable savings figure:

```
Savings   = Starting Price − Winning Bid
Savings % = (Savings / Starting Price) × 100

Example:
  Starting Price = ₹50,000
  Winning Bid    = ₹42,500
  Savings        = ₹7,500  →  15% saved
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🔑 Role Permission Matrix

| Capability | Tenant / Buyer | Vendor / Supplier |
|---|:---:|:---:|
| Create Auction | ✅ | ❌ |
| Browse Auctions | ✅ | ✅ |
| Manage Own Auctions | ✅ | ❌ |
| Place Bid | ❌ | ✅ |
| Monitor Incoming Bids | ✅ | ❌ |
| Track Own Bids | ❌ | ✅ |
| Close Auction | ✅ | ❌ |
| View Winner | ✅ | ✅ |
| View Won Auctions | ❌ | ✅ |
| Procurement Savings | ✅ | ❌ |
| AI Alerts | ✅ | ❌ |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🛠️ Tech Stack

**Frontend** — React · TypeScript · Vite · Tailwind CSS · Axios · React Router · JWT session handling · responsive component architecture

**Backend** — Python · FastAPI · SQLAlchemy · Pydantic · JWT Authentication · REST API · CORS Middleware · OpenAPI/Swagger auto-docs

**Database** — Relational DB via SQLAlchemy ORM, storing users, auctions, bids, alerts, and auction-result records

**Deployment**

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://bid-x-gray.vercel.app/ |
| Backend | Render | https://bidx-e0wt.onrender.com/ |
| API Docs | Swagger/OpenAPI | https://bidx-e0wt.onrender.com/docs |

> ⏳ The backend runs on Render's free tier — the first request after a period of inactivity may take a little longer while it spins up.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────┐
│                React Frontend               │
│  Tenant Dashboard        Vendor Dashboard    │
│  Auction Management      Auction Discovery   │
│  Procurement Results     Bidding Workspace   │
│  AI Alerts               Bid Tracking        │
└─────────────────────┬───────────────────────┘
                       │ HTTPS / REST + JWT
                       ▼
┌─────────────────────────────────────────────┐
│                 FastAPI API                  │
│  Authentication · Auction Management         │
│  Bid Processing · Winner Determination       │
│  AI Alert APIs                               │
└─────────────────────┬───────────────────────┘
                       │ SQLAlchemy ORM
                       ▼
┌─────────────────────────────────────────────┐
│             Relational Database              │
│  Users · Auctions · Bids · Alerts · Results  │
└─────────────────────────────────────────────┘
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 📡 API Reference

**Authentication**
```
POST  /auth/register     → create a Tenant or Vendor account
POST  /auth/login        → returns a JWT access token
GET   /auth/me           → restores the authenticated session
```

**Auctions**
```
GET    /auctions/              → list/discover auctions
GET    /auctions/{id}          → auction detail
POST   /auctions/               → create an auction (Tenant only)
PATCH  /auctions/{id}/close    → close an auction (Tenant only)
```

**Bids**
```
POST  /bids/                       → submit a bid (Vendor only)
GET   /bids/{auction_id}           → all bids for an auction
GET   /bids/{auction_id}/lowest    → current lowest bid
```

**AI Alerts**
```
GET  /ai-alerts/    → procurement risk/anomaly alerts (Tenant only)
```

Full interactive schema and request/response contracts: https://bidx-e0wt.onrender.com/docs

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🔄 Authentication Flow

```
Register / Login → FastAPI validates credentials → JWT issued
     → frontend stores session → Axios attaches "Authorization: Bearer <token>"
     → FastAPI validates token + role on every protected request
```

Frontend session restoration on page refresh goes through `GET /auth/me`.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🚀 Getting Started Locally

**Prerequisites:** Node.js, npm, Python 3.x, Git

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd BidX
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Runs at `http://127.0.0.1:8000` · Docs at `http://127.0.0.1:8000/docs` · Health at `http://127.0.0.1:8000/health`

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://127.0.0.1:8000" > .env
npm run dev
```
Runs at `http://localhost:5173`

### Production build

```bash
npm run build   # outputs to frontend/dist
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## ⚙️ Environment Variables

Never commit real secrets — use `.env.example` with empty values.

**Frontend**
```env
VITE_API_URL=https://your-api.example.com
```

**Backend**
```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=
```

## 🌐 CORS Configuration

Development origins:
```
http://localhost:5173
http://127.0.0.1:5173
```
Production origin:
```
https://bid-x-gray.vercel.app
```
Production deployments use explicit trusted origins rather than a wildcard.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## ✅ Testing & Validation

The core workflow has been manually validated end-to-end:

```
Tenant Registration → Tenant Login → Create Auction → Vendor Login
   → Browse Auction → Place Bid → Lower Bid Recorded
   → Auction Close → Winner Determination
```

Backend regression coverage also verifies auction-closing/winner-selection logic. Frontend production build is verified with `npm run build`.

## 🛡️ Security Considerations

JWT authentication · protected API endpoints · role-based authorization · restricted CORS origins · password hashing · server-side validation · strict Tenant/Vendor capability separation · environment-based secret management · authenticated auction/bid operations. Vendor interfaces expose only what's needed to compete — never sensitive competing-vendor details.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🧠 Key Engineering Challenges

**Frontend–backend contract alignment** — the UI and API originally used mismatched field names (`name` → `full_name`, `organization` → `company_name`, `closing_time` → `end_time`, `amount` → `bid_amount`, `/alerts` → `/ai-alerts`). These were reconciled without reworking the existing UI.

**Cross-origin deployment** — frontend (Vercel) and backend (Render) are deployed independently; CORS preflight behavior was configured and validated for secure cross-origin communication.

**Role-specific product design** — Tenant flows (create → monitor → close → savings → alerts) and Vendor flows (discover → bid → track → win/lose) are intentionally built as separate experiences rather than one generic UI.

**Reverse-auction state correctness** — the lowest bidder *during* an active auction is only `LEADING`, never the `WINNER`, until the auction is explicitly closed. This distinction prevents vendors from being shown a false win state mid-auction.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 🗺️ Roadmap

- [ ] Real-time bidding updates via WebSockets
- [ ] Bid activity + email notifications
- [ ] Advanced procurement analytics
- [ ] Vendor reputation & performance scoring
- [ ] Auction extension rules & automated expiration
- [ ] Deeper AI anomaly detection
- [ ] Procurement recommendation engine
- [ ] Audit logs & multi-user org accounts
- [ ] Admin dashboard
- [ ] Exportable procurement reports
- [ ] Vendor verification
- [ ] Advanced search & filtering
- [ ] Mobile / PWA support

## 📌 Development Status

**Implemented:** full-stack architecture · authentication · JWT sessions · role-based users · auction creation & discovery · reverse bidding · lowest-bid tracking · auction closure · winner determination · Tenant/Vendor workflows · AI alert integration · responsive frontend · frontend + backend deployment · production API integration

**In progress:** deeper analytics, real-time features, AI-assisted procurement intelligence, production-grade operational tooling

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%" />

## 💼 What This Project Demonstrates

**Frontend Engineering** — React, TypeScript, responsive interfaces, role-based UX, REST API integration, authentication state management

**Backend Engineering** — Python, FastAPI, SQLAlchemy, REST API design, JWT authentication, authorization, business-rule implementation

**System Design** — buyer/supplier role separation, reverse-auction workflow, winner determination logic, API-driven frontend architecture, decoupled deployment

**Production Engineering** — environment configuration, CORS, Vercel + Render deployment, production API integration, debugging real browser/server integration issues

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00CEC9,50:00B894,100:6C5CE7&height=180&section=footer" width="100%" />

<p align="center">
  <b>Piyush Ladukar</b> — Computer Science & Engineering<br/>
  Portfolio: https://piyushladukar.vercel.app/ &nbsp;|&nbsp;
  LinkedIn: https://www.linkedin.com/in/piyush-ladukar &nbsp;|&nbsp;
  GitHub: https://github.com/PiyushLadukar
</p>

<p align="center"><sub>BidX is a software engineering project demonstrating reverse-auction procurement workflows. Real-world procurement deployment would require additional compliance, auditing, security hardening, regulatory review, monitoring, and infrastructure reliability work.</sub></p>