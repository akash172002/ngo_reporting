# NGO Impact Reporting System

A scalable full-stack web application that allows NGOs to submit monthly impact reports (individually or in bulk via CSV) and enables administrators to view aggregated impact metrics through a secure dashboard.

The system is designed to handle **large volumes of data**, **partial failures**, and **background processing**, while keeping the UI simple and functional.

---

## 🧱 Tech Stack

### Frontend

- React (Vite)
- Material UI (MUI)
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- BullMQ + Redis (background job processing)
- JWT Authentication
- Multer & csv-parser
- Winston (structured logging)

### Infrastructure / DevOps

- Redis (Docker)
- MongoDB (Local / Atlas)
- GitHub Actions (CI)

---

## 🏗️ System Architecture & Approach

- **Frontend** handles report submission, CSV uploads, and dashboard visualization.
- **Backend** exposes REST APIs, performs validation, authentication, aggregation, and job orchestration.
- **Redis + BullMQ** are used for asynchronous CSV processing to avoid blocking API requests.
- **MongoDB** stores reports, job metadata, and admin users.

### Key Design Decisions

- **Idempotency**: Reports are uniquely identified by `(ngoId + month)` to avoid duplicate counting.
- **Async Processing**: CSV uploads are processed in background jobs.
- **Partial Failure Handling**: Invalid CSV rows do not fail the entire job.
- **Separation of Concerns**: Clear separation between routes, controllers, middleware, and workers.

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js ≥ 18
- Docker
- MongoDB (local or Atlas)

### Admin credentials

- Email admin@admin.com
- Pass admin1

---

### Backend Setup

```bash
cd backend
npm install
```
