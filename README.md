🚀 TaskFlow

TaskFlow is a full-stack task management web app that helps users stay productive by organizing tasks with authentication, due dates, and statuses. It is built with React (frontend), Node.js + Express (backend), and MongoDB (database).

🔗 Live Demo → https://taskflow-krnz.vercel.app/

✨ Features

🔐 Authentication (Signup, Login, Profile) with JWT

📌 Task CRUD — create, read, update, delete tasks

🗓 Task attributes — title, description, due date, status

🔒 Secure — passwords hashed with bcrypt, JWT auth middleware

⚡ Separation of concerns — cleanly separated frontend & backend codebase

🌍 Deployment ready — frontend on Vercel, backend on Node/Express

🛠 Tech Stack
Layer	Technology
Frontend	React, Fetch API, TailwindCSS (if styled with it)
Backend	Node.js, Express.js
Database	MongoDB (Atlas)
Authentication	JWT (jsonwebtoken), bcryptjs
Deployment	Vercel (frontend), Node server (backend)
Config	dotenv for environment variables

📂 Project Structure

🔹 Frontend (/frontend)
```
frontend/
├── .gitignore
├── image.png
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── AuthForm.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── ProgressBar.jsx
│   ├── index.css
│   ├── lib/
│   │   ├── auth.js
│   │   └── tasks.js
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js

```
🔹 Backend (/backend)
```
backend/
├── index.js              
├── .env                  
├── models/
│   ├── User.js            
│   └── Task.js            
├── middleware/
│   └── authMiddleware.js    
├── controllers/
│   ├── authController.js   
│   └── taskController.js   
├── routes/
│   ├── authRoutes.js       
│   └── taskRoutes.js       
└── package.json
```
⚙️ Setup & Installation
🔹 Prerequisites

Node.js (>= 16)

npm or yarn

MongoDB Atlas account or local MongoDB

🔹 Backend Setup

Navigate to backend folder:

cd backend
npm install


Create a .env file in backend/:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key


Run backend:

node index.js


✅ Should show:

✅ MongoDB Connected
🚀 Server running on http://localhost:5000

🔹 Frontend Setup

Navigate to frontend:

cd frontend
npm install


Make sure auth.js and tasks.js point to backend:

const API_URL = "http://localhost:5000";


Run frontend:

npm start   # or npm run dev


Open: http://localhost:3000

📌 API Endpoints
🔹 Auth Routes
```
Method	Endpoint	Description	Protected
POST	/signup	Register new user	No
POST	/login	Login user	No
GET	/profile	Get logged-in user data	Yes
```
🔹 Task Routes
```
Method	Endpoint	Description	Protected
GET	/tasks	Get all tasks (user only)	Yes
POST	/tasks	Create new task	Yes
PUT	/tasks/:id	Update task by ID	Yes
DELETE	/tasks/:id	Delete task by ID	Yes
```
🌍 Deployment

Frontend: Hosted on Vercel

Backend: Can be deployed on Render, Heroku, or a VPS. Make sure to set .env variables on the host.

🔮 Future Improvements

Task priorities and categories

Email/password reset flow

Real-time notifications (e.g., WebSockets)

👨‍💻 Contributing

Fork repo

Create feature branch git checkout -b feature-name

Commit changes git commit -m "Added feature"

Push branch and create PR

📄 License

MIT License © 2025 Harshit Gupta