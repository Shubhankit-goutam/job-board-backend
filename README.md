#  Job Board API (Backend)

This is the **backend** of the Job Board Application built using **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for job listings — to create, read, and fetch job details.

---

##  Live API

- Base URL: [https://job-board-backend-u8hp.onrender.com](https://job-board-backend-u8hp.onrender.com)
- Test Endpoint: [`/test-cors`](https://job-board-backend-u8hp.onrender.com/test-cors)
- Main Jobs Endpoint: [`/api/jobs`](https://job-board-backend-u8hp.onrender.com/api/jobs)

---

## Setup & Run Locally
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start

##  API Endpoints
| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/api/jobs`     | Get all job listings |
| POST   | `/api/jobs`     | Add a new job        |
| GET    | `/api/jobs/:id` | Get a job by ID      |
| GET    | `/test-cors`    | Test CORS is working |

Author
Shubhankit Goutam
GitHub: @shubhankit-goutam

