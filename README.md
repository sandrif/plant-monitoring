# Plant Monitoring System

IoT plant monitoring system — tracks temperature and humidity via sensor, Gateway on Raspberry Pi, cloud dashboard.

## Project Structure

```
plant-monitoring/
├── server/    # Express.js API
├── client/    # React frontend (Vite)
└── README.md
```

## Running locally

### Prerequisites

- Node.js (LTS)
- PostgreSQL connection string (get from team)

### Backend

```bash
cd server
npm install
npm run dev        # runs on http://localhost:3001
```

### Frontend

```bash
cd client
npm install
npm run dev        # runs on http://localhost:5173
```

### Run both at once (from root)

```bash
npm install
npm run dev
```

### Environment variables

Create `server/.env`:

```
DATABASE_URL=postgresql://plant_monitoring_db_user:puh4ahiPmSxzN5B64THtNONjswN5Qyky@dpg-d6ulj114tr6s73902nig-a.frankfurt-postgres.render.com/plant_monitoring_db
PORT=3001
```

## Deployment

- Backend + DB: Render
- Frontend: Render Static Site
