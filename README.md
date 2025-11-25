# 🚀 Code Review Assistant

A **smart AI-powered code review tool** built with **MERN Stack** and **local LLM integration** using **Ollama (Phi-3 model)**.

🧠 It analyzes code, detects errors, suggests fixes, and provides corrected code — similar to ChatGPT and VSCode AI assistants, but *fully locally powered*.

---


## 🚀 Features

✔ Paste or upload code file for review  
✔ Auto-detect programming language  
✔ Local LLM (Phi-3 on Ollama) integration  
✔ JWT-based user authentication  
✔ Code review with:
- 🛑 Errors
- 🔧 Fixes
- 💡 Suggestions
- 📦 Corrected Code (no comments)
  
✔ Stores review history in MongoDB  
✔ Syntax-like formatting  
✔ Optional file upload  

---

## 📂 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React (Vite), Custom CSS |
| Backend     | Node.js + Express |
| Database    | MongoDB (Atlas or Local) |
| AI Model    | **Ollama – Phi-3** (Local) |
| Authentication | JWT |
| Hosting     | Runs locally |

---
## 📡 API Endpoints

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/reviews`       | Submit code for review |
| GET    | `/api/reviews`       | Get all past reviews   |
| GET    | `/api/reviews/:id`   | Get specific review    |
| POST   | `/api/auth/login`    | Login                  |
| POST   | `/api/auth/register` | Register               |

---
## 🛠️ Installation & Setup

1️⃣ Clone the repository

```bash
git clone https://github.com/RishabhMaurya3/Code-Review-Assistant.git
cd Code-Review-Assistant
```
2️⃣ Install Ollama & Pull LLM Model

📌 Download Ollama → https://ollama.ai/download

Then open PowerShell / Terminal and run:
```bash
ollama pull phi3
ollama run phi3
```
3️⃣ Configure Backend
```bash
cd backend
npm install
```

Create .env file inside backend/:
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret_key
OLLAMA_BASE_URL=http://localhost:11434
LLM_MODEL=phi3
```

Start the backend:
```bash
npm run dev
```

4️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Default Frontend URL → http://localhost:5173

Backend API → http://localhost:5000

🚦 Run the Full Application

Terminal 1
```bash
cd backend
npm run dev
```

Terminal 2
```bash
cd frontend
npm run dev
```
Terminal 3 (Optional, only if Ollama isn't auto-running)
```bash
ollama run phi3
```


💡 Now visit → http://localhost:5173
