# 📊 Domain Ranking Comparison - Backend

This is the backend part of a full-stack application used to compare domain rankings and visualize it using chart.js. This backend handles incoming requests, makes request to another api if needed and sends a response back.

---

## 🛠️ Tech Stack

**NestJS** • **Axios** • **PostgreSQL** • **Prisma** • **Tranco API**

---

## ✨ Features

1. Input validation for domains
2. Fetch the rankings for domains and send response back with rankings
3. Data caching using database for fewer API requests to Tranco

---

## 🎯 How It Works

1. GET request controller gets the domains as an array extracted from the body
2. Input validation service is called first
3. Upon successful validation, rankings for the domains is fetched from the database IF AVAILABLE
4. If rankings are NOT available, a request is fired to fetch the rankings from Tranco. The data is saved and fetched from database
5. Data is then served with response

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- PostgreSQL database
- Tranco API access

### Installation

```bash
# Clone the project
git clone [your-repo-url]

# Install dependencies
npm install
```

### Configuration

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/domain_ranking"
TRANCO_API_URL="your-tranco-api-url"
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate deploy
# or for development
npx prisma migrate dev
```

### Run the Server

```bash
# Start development server
npm run start:dev
```

### Verify Installation

Go to `http://localhost:3000` in your browser. If you see **"Hello World"**, the server is running successfully! 🎉

---

## 🔗 Frontend Repository

This backend works with the frontend available here: [domain-ranking-fe](https://github.com/YuleshMahat/domain-ranking-fe)
