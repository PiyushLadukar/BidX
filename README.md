# BidX — AI-Powered Reverse Auction Procurement Platform

<p align="center">
  <strong>Smarter procurement through competitive reverse bidding, role-based workflows, and AI-assisted insights.</strong>
</p>

<p align="center">
  <a href="https://bid-x-gray.vercel.app/">Live Demo</a>
  ·
  <a href="https://bidx-e0wt.onrender.com/docs">API Documentation</a>
  ·
  <a href="YOUR_GITHUB_REPOSITORY_URL">GitHub Repository</a>
</p>

---

## Overview

**BidX** is a full-stack B2B reverse-auction procurement platform designed to make organizational purchasing more competitive, transparent, and efficient.

Unlike a traditional auction, where buyers compete by increasing prices, BidX uses a **reverse auction model**:

> A buyer creates a procurement requirement, and multiple vendors compete by offering progressively lower prices.

The platform provides separate experiences for **Tenants/Buyers** and **Vendors/Suppliers**, covering the complete procurement lifecycle from auction creation and competitive bidding to auction closure and winner determination.

BidX also integrates an **AI-assisted alert system** for procurement-side monitoring and risk/anomaly insights.

---

## Live Application

### Frontend

**BidX Web Application**

https://bid-x-gray.vercel.app/

Deployed using **Vercel**.

### Backend API

**FastAPI Backend**

https://bidx-e0wt.onrender.com/

Deployed using **Render**.

### Interactive API Documentation

**Swagger UI**

https://bidx-e0wt.onrender.com/docs

FastAPI automatically generates interactive OpenAPI documentation where the available API endpoints can be inspected and tested.

> **Note:** The backend is hosted on Render. Depending on the hosting plan, the first request after inactivity may take additional time while the service starts.

---

# Why BidX?

Procurement often involves collecting quotations from multiple suppliers, manually comparing prices, tracking responses, and selecting the most competitive offer.

BidX transforms this process into a structured reverse-auction workflow.

Instead of:

```text
Buyer → Contact Vendor A
      → Contact Vendor B
      → Contact Vendor C
      → Collect quotations
      → Compare manually
      → Select supplier
```

BidX enables:

```text
                    ┌──────────────┐
                    │    Tenant    │
                    │    Buyer     │
                    └──────┬───────┘
                           │
                           │ Creates Auction
                           ▼
                    ┌──────────────┐
                    │   Auction    │
                    │ Requirement  │
                    └──────┬───────┘
                           │
                 Vendors discover auction
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Vendor A     Vendor B     Vendor C
          ₹48,000      ₹46,500      ₹44,000
              │            │            │
              └────────────┼────────────┘
                           ▼
                    Lowest Valid Bid
                           │
                           ▼
                    Auction Closes
                           │
                           ▼
                    Winning Vendor
```

The result is a more competitive and measurable procurement process.

---

# Core Features

## Authentication & Authorization

BidX implements JWT-based authentication with role-aware application behavior.

Features include:

- User registration
- Secure login
- JWT authentication
- Authenticated `/auth/me` session restoration
- Protected frontend routes
- Role-based UI
- Tenant/Buyer accounts
- Vendor/Supplier accounts
- Persistent authentication across page refreshes
- Backend authorization for protected operations

---

## Tenant / Buyer Experience

Tenants represent organizations creating procurement opportunities.

The tenant experience acts as a **Procurement Control Center**.

### Tenant capabilities

- Create procurement auctions
- View created auctions
- Monitor active auctions
- Track incoming bids
- Monitor the current lowest bid
- Track vendor competition
- Close auctions
- View auction results
- Identify winning vendors
- View winning bid amounts
- Track procurement savings
- Access AI-assisted procurement alerts

### Tenant Dashboard

The dashboard focuses on procurement-oriented information such as:

- Active Auctions
- Total Bids
- Participating Vendors
- Procurement Savings
- Active Auction Activity
- Auction Results
- AI Procurement Alerts

---

## Vendor / Supplier Experience

Vendors represent suppliers competing for procurement contracts.

The vendor experience acts as a **Bidding Workspace**.

### Vendor capabilities

- Browse available auctions
- View auction requirements
- View current lowest prices
- Submit competitive bids
- Track submitted bids
- Determine whether a bid is currently leading
- Identify when another vendor has submitted a lower bid
- Track completed auction outcomes
- View auctions won

Vendor-specific bid states include:

```text
LEADING
OUTBID
WON
LOST
```

This provides immediate context around the vendor's position in an auction.

---

# Reverse Auction Workflow

The primary BidX workflow is:

### 1. Tenant creates an auction

A buyer defines a procurement requirement including information such as:

- Title
- Description
- Category
- Quantity
- Starting price
- Start time
- End time

### 2. Vendors discover the auction

Authenticated vendors can browse active procurement opportunities.

### 3. Vendor submits a bid

A vendor submits an offer against the auction.

```json
{
  "auction_id": 12,
  "bid_amount": 42500
}
```

### 4. Vendors compete by lowering prices

Unlike traditional auctions:

```text
₹50,000
   ↓
₹47,500
   ↓
₹45,000
   ↓
₹42,500
```

Lower competitive bids drive the procurement price downward.

### 5. Lowest bid is tracked

The platform tracks the current lowest valid bid for the auction.

During an active auction, the lowest bidder is considered:

```text
CURRENTLY LEADING
```

They are not considered the winner until the auction closes.

### 6. Tenant closes the auction

When the procurement process ends, the tenant closes the auction.

### 7. Winner is determined

The lowest valid bidder becomes the winning vendor.

```text
Auction Status: CLOSED

Starting Price: ₹50,000
Winning Bid:    ₹42,500

Winner:
Vendor with the lowest valid bid
```

### 8. Results are displayed

Tenant sees:

```text
WINNER
Winning Vendor
Winning Bid
Starting Price
Savings
Savings %
```

Winning vendor sees:

```text
🏆 WON
You won this auction
```

Other participating vendors see:

```text
LOST
Auction completed
```

---

# Winner Determination

Winner selection happens when an auction is closed.

Conceptually:

```text
Active Auction
      │
      ▼
Collect Valid Bids
      │
      ▼
Find Lowest Bid
      │
      ▼
Auction Closed
      │
      ▼
Lowest Bidder = Winner
```

The winner and winning bid are recorded by the backend rather than relying only on temporary frontend state.

Auctions without bids are handled safely and do not require a winner.

---

# Procurement Savings

BidX can represent the savings achieved through competitive bidding.

For example:

```text
Starting Price = ₹50,000
Winning Bid    = ₹42,500

Savings        = ₹7,500
Savings %      = 15%
```

Formula:

```text
Savings = Starting Price - Winning Bid

Savings % =
(Savings / Starting Price) × 100
```

This gives buyers a measurable indicator of the financial impact of reverse bidding.

---

# AI-Assisted Procurement Alerts

BidX includes an AI alert layer intended for procurement-side monitoring.

AI alerts are available to **Tenant/Buyer users** and are separated from the Vendor bidding experience.

The alert system can support procurement insights around areas such as:

- unusual bidding behavior
- bidding anomalies
- unexpected price movements
- procurement risks
- auction activity requiring attention

The UI displays alert information produced by the backend rather than generating fake frontend alerts.

---

# Role-Based Experience

BidX intentionally separates the buyer and supplier experiences.

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

Frontend visibility does not replace backend authorization. Protected operations remain enforced through the backend authentication/authorization layer.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- JWT-based authentication
- Responsive component architecture

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- REST API
- CORS Middleware
- OpenAPI / Swagger

## Database

- Relational database through SQLAlchemy
- Persistent users, auctions, bids, alerts, and auction-result data

## Deployment

| Layer | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| API Documentation | FastAPI Swagger / OpenAPI |

---

# System Architecture

```text
┌─────────────────────────────────────────────┐
│                React Frontend               │
│                                             │
│ Tenant Dashboard        Vendor Dashboard    │
│ Auction Management      Auction Discovery   │
│ Procurement Results     Bidding Workspace   │
│ AI Alerts               Bid Tracking        │
└─────────────────────┬───────────────────────┘
                      │
                      │ HTTPS / REST
                      │ JWT Authorization
                      ▼
┌─────────────────────────────────────────────┐
│                 FastAPI API                 │
│                                             │
│ Authentication                             │
│ Auction Management                         │
│ Bid Processing                             │
│ Winner Determination                       │
│ AI Alert APIs                              │
└─────────────────────┬───────────────────────┘
                      │
                      │ SQLAlchemy ORM
                      ▼
┌─────────────────────────────────────────────┐
│              Relational Database            │
│                                             │
│ Users                                       │
│ Auctions                                    │
│ Bids                                        │
│ AI Alerts                                   │
│ Auction Results                             │
└─────────────────────────────────────────────┘
```

---

# Project Structure

A simplified representation of the repository:

```text
BidX/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── auction.py
│   │   │   ├── bid.py
│   │   │   ├── ai_alert.py
│   │   │   └── websocket.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

The exact structure may evolve as the project is extended.

---

# API Overview

The backend exposes REST APIs for authentication, auctions, bidding, and alerts.

## Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Register

Creates a Tenant or Vendor account.

The registration flow supports fields including:

```text
full_name
email
password
role
company_name
tenant_name
```

depending on the selected account type.

---

## Auctions

```http
GET   /auctions/
GET   /auctions/{id}
POST  /auctions/
PATCH /auctions/{id}/close
```

These endpoints support auction discovery, creation, retrieval, and closure.

---

## Bids

```http
POST /bids/
GET  /bids/{auction_id}
GET  /bids/{auction_id}/lowest
```

Bid operations include:

- placing bids
- retrieving auction bids
- retrieving the current lowest bid

---

## AI Alerts

```http
GET /ai-alerts/
```

Provides procurement-side alert information.

For the latest API contract and schemas, use the interactive Swagger documentation:

https://bidx-e0wt.onrender.com/docs

---

# Authentication Flow

BidX uses JWT authentication.

```text
Register / Login
       │
       ▼
FastAPI validates credentials
       │
       ▼
JWT Access Token
       │
       ▼
Frontend stores authenticated session
       │
       ▼
Axios attaches token to protected requests
       │
       ▼
Authorization: Bearer <token>
       │
       ▼
FastAPI validates user + role
```

The frontend restores the authenticated user through:

```http
GET /auth/me
```

---

# Currency

BidX uses **Indian Rupees (₹)** for user-facing procurement amounts.

The frontend uses Indian number formatting:

```text
₹50,000
₹1,25,000
₹12,50,000
```

Currency formatting is handled at the presentation layer while monetary values remain numeric in backend API contracts.

---

# Getting Started Locally

## Prerequisites

Install:

- Node.js
- npm
- Python 3.x
- Git

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd BidX
```

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required backend environment variables in your local environment or `.env` file.

Then start FastAPI:

```bash
uvicorn app.main:app --reload
```

The backend should be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

Health endpoint:

```text
http://127.0.0.1:8000/health
```

---

# Frontend Setup

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create/configure the frontend environment file.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Use the exact environment variable expected by the current frontend API configuration.

Start Vite:

```bash
npm run dev
```

The frontend will typically run at:

```text
http://localhost:5173
```

---

# Production Build

Build the frontend using:

```bash
npm run build
```

Vite generates the production application inside:

```text
dist/
```

The production frontend build has been validated as part of the integration workflow.

---

# Environment Variables

Environment variables and secrets should **never be committed to Git**.

A typical frontend configuration looks like:

```env
VITE_API_URL=https://your-api.example.com
```

Backend configuration may include values such as:

```env
DATABASE_URL=...
SECRET_KEY=...
ALGORITHM=...
ACCESS_TOKEN_EXPIRE_MINUTES=...
```

Use the actual variable names defined by the backend configuration.

Create an `.env.example` file containing variable names without real credentials.

Example:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=
```

---

# CORS Configuration

The FastAPI backend uses `CORSMiddleware` to permit requests from approved frontend origins.

For development:

```text
http://localhost:5173
http://127.0.0.1:5173
```

For production:

```text
https://bid-x-gray.vercel.app
```

Production deployments should use explicit trusted origins rather than unrestricted wildcard CORS.

---

# Testing

The core workflow has been manually validated end-to-end:

```text
Tenant Registration
        ↓
Tenant Login
        ↓
Create Auction
        ↓
Vendor Login
        ↓
Browse Auction
        ↓
Place Bid
        ↓
Lower Bid Recorded
        ↓
Auction Close
        ↓
Winner Determination
```

Backend regression coverage also verifies auction-closing/winner behavior.

Frontend production compilation can be verified using:

```bash
npm run build
```

---

# Error Handling

The application handles API errors through the frontend service layer and presents relevant feedback to users.

Important cases include:

- invalid authentication
- unauthorized actions
- invalid auction operations
- bid validation failures
- auctions without bids
- expired/invalid sessions
- API connectivity errors

Backend validation remains the source of truth for protected business operations.

---

# Security Considerations

BidX implements several security-oriented design decisions:

- JWT authentication
- Protected API endpoints
- Role-based authorization
- CORS restrictions
- Password hashing
- Server-side validation
- Separation of Tenant and Vendor capabilities
- Environment-based secret management
- Authenticated auction/bid operations

Vendor interfaces should expose only the bidding information necessary for competition and should avoid exposing sensitive competing-vendor information.

---

# Deployment Architecture

```text
                    USER
                      │
                      ▼
             ┌─────────────────┐
             │     Vercel      │
             │ React + Vite UI │
             └────────┬────────┘
                      │
                      │ HTTPS REST API
                      ▼
             ┌─────────────────┐
             │     Render      │
             │     FastAPI     │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │    Database     │
             └─────────────────┘
```

---


# Key Engineering Challenges

Building BidX required solving several full-stack engineering problems.

### Frontend–Backend Contract Alignment

The initial frontend and backend used different field names and API assumptions.

Examples included differences such as:

```text
name                → full_name
organization        → company_name
closing_time        → end_time
amount              → bid_amount
lowest_bid          → current_lowest_bid
/alerts             → /ai-alerts
```

The integration layer was aligned with the actual FastAPI contract while preserving the existing UI.

### Cross-Origin Deployment

The frontend and backend are deployed independently.

CORS preflight behavior was configured and validated so the Vite frontend can securely communicate with the FastAPI deployment.

### Role-Specific Product Design

Tenant and Vendor users require fundamentally different workflows.

BidX separates:

```text
Tenant
Procurement Management
Auction Creation
Bid Monitoring
Winner Selection
Savings
AI Alerts
```

from:

```text
Vendor
Opportunity Discovery
Competitive Bidding
Bid Tracking
Leading / Outbid
Won / Lost
```

### Reverse Auction State

BidX distinguishes between:

```text
LOWEST BIDDER DURING ACTIVE AUCTION
                =
             LEADING
```

and:

```text
LOWEST VALID BIDDER AFTER CLOSURE
                =
              WINNER
```

This prevents an active bidder from being incorrectly presented as the final winner.

---

# Future Improvements

BidX can be extended with:

- Real-time bidding updates through WebSockets
- Bid activity notifications
- Email notifications
- Advanced procurement analytics
- Vendor reputation and performance scoring
- Auction extension rules
- Automated auction expiration
- Advanced AI anomaly detection
- Procurement recommendation engine
- Audit logs
- Multi-user organization accounts
- Admin dashboard
- Exportable procurement reports
- Vendor verification
- Advanced search and filtering
- Mobile/PWA support

---

# Development Status

### Implemented

- Full-stack architecture
- Authentication
- JWT sessions
- Role-based users
- Tenant auction creation
- Auction discovery
- Reverse bidding
- Lowest-bid tracking
- Auction closure
- Winner determination
- Tenant/Vendor workflows
- AI alert integration
- Responsive frontend
- Backend deployment
- Frontend deployment
- Production API integration

### Continuing Improvements

BidX remains actively extensible, with additional work focused on deeper analytics, real-time features, AI-assisted procurement intelligence, and production-grade operational tooling.

---

# What This Project Demonstrates

BidX demonstrates practical experience across:

**Frontend Engineering**
- React
- TypeScript
- responsive interfaces
- role-based UX
- REST API integration
- authentication state management

**Backend Engineering**
- Python
- FastAPI
- SQLAlchemy
- REST API design
- JWT authentication
- authorization
- business-rule implementation

**System Design**
- Buyer/supplier role separation
- reverse-auction workflow
- winner determination
- API-driven frontend architecture
- frontend/backend deployment separation

**Production Engineering**
- Environment configuration
- CORS
- Vercel deployment
- Render deployment
- production API integration
- debugging browser/server integration issues

---

# Author

**Piyush Ladukar**

Computer Science & Engineering

Portfolio: https://piyushladukar.vercel.app/
LinkedIn:  https://www.linkedin.com/in/piyush-ladukar
GitHub:    https://github.com/PiyushLadukar

---

# Disclaimer

BidX is a software engineering project demonstrating reverse-auction procurement workflows.

Before use in real-world procurement environments, additional production requirements should be considered, including compliance, auditing, security hardening, organizational access controls, procurement regulations, monitoring, backups, and infrastructure reliability.

---

<p align="center">
  <strong>BidX</strong><br>
  Better procurement through competitive bidding.
</p>