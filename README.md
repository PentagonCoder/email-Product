# ExportFlow — Export Automation System

> Discover buyer contacts from a product keyword, then launch an email outreach campaign from one clean dashboard.

ExportFlow is a full-stack MERN application built to make early-stage export outreach less manual. Instead of jumping between search engines, websites, spreadsheets, and email, a user can search for a niche, collect verified buyer contacts, and send a presentation directly from the app.

## Why it exists

Finding international buyers is repetitive work. ExportFlow turns the first outreach cycle into a simple workflow:

```text
Search a product niche → Find buyer websites → Extract email contacts → Review results → Send campaign
```

## Highlights

- **Keyword-based buyer discovery** powered by SerpAPI Google results
- **Website email extraction** using Cheerio, followed by email validation
- **Buyer contact storage** in MongoDB for campaign use
- **Presentation attachments** supported through Multer uploads
- **Email campaign delivery** through Nodemailer and Gmail
- **Secure user accounts** with registration, email verification, login, JWT refresh tokens, and protected routes
- **Role-aware access** including an admin dashboard endpoint
- **Modern responsive UI** built with React, Tailwind CSS, Vite, and Zustand

## Dashboard experience

The dashboard is designed around the actual export-outreach workflow:

1. Search for a buyer keyword, such as `Singing Bowls`.
2. Review companies, contact emails, and their websites in a responsive table.
3. Write a campaign subject and message.
4. Attach a product presentation and send the campaign.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, React Router, React Hook Form, Zustand, Axios |
| Backend | Node.js, Express 5, Mongoose, JWT, Zod |
| Data & discovery | MongoDB, SerpAPI, Cheerio, Validator |
| Email & files | Nodemailer, Multer |

## Project structure

```text
emailProduct/
├── frontend/                 # React + Vite client
│   └── src/
│       ├── pages/            # Auth, dashboard, members, settings pages
│       ├── components/       # Shared layout and buyer search UI
│       ├── services/         # API service calls
│       └── store/            # Zustand auth store
└── backend/                  # Express API
    └── src/
        ├── controllers/      # Auth and buyer workflow handlers
        ├── services/         # Search, scraping, validation, persistence
        ├── model/            # MongoDB models
        ├── routes/           # User and buyer routes
        └── middlewares/      # Auth, roles, validation, uploads, errors
```

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- A [SerpAPI](https://serpapi.com/) key
- A Gmail account with an app password for outbound campaign email

### 1. Clone and install dependencies

```bash
git clone <your-repository-url>
cd emailProduct

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure the backend

Create `backend/.env` using the following values:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017
SERP_API_KEY=your_serpapi_key

EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-gmail-app-password

ACCESS_TOKEN_SECRET=replace_with_a_long_random_value
REFRESH_TOKEN_SECRET=replace_with_a_different_long_random_value
ACCEES_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
VERIFYLINK=http://localhost:5173/verify-email
NODE_ENV=development
```

> Never commit `.env` files or real API keys. Gmail requires an app password when two-factor authentication is enabled.

### 3. Start the application

Open two terminals:

```bash
# Terminal 1 — API
cd backend
npm run dev
```

```bash
# Terminal 2 — client
cd frontend
npm run dev
```

Visit the Vite URL shown in your terminal, normally `http://localhost:5173`.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/users/register` | Create a user account |
| `POST` | `/api/users/login` | Sign in |
| `GET` | `/api/users/profile` | Read the signed-in user profile |
| `POST` | `/api/users/logout` | Sign out |
| `POST` | `/api/buyers/search` | Search, scrape, validate, and save buyer contacts |
| `POST` | `/api/buyers/emails` | Send an email campaign with a `presentation` file upload |

## What I’d build next

- Campaign recipient selection instead of sending to every stored buyer
- Sending progress, retry handling, and delivery analytics
- Buyer filters, deduplication, and CSV export
- Email templates and personalization fields
- Environment-driven frontend API URL for deployment

## Demo checklist

For a smooth project demo, show these moments:

1. Create an account and sign in.
2. Search a product category.
3. Open a discovered buyer website from the results table.
4. Draft a tailored subject and email message.
5. Attach a catalogue or presentation and send the campaign.

---

Built for exporters who want to spend less time collecting contacts and more time starting conversations.
