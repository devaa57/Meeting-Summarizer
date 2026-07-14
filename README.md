# 🎙 AI Meeting Summarizer

An AI-powered meeting summarizer that converts audio into structured meeting notes using Faster Whisper and Hugging Face LLMs.

---

## 🚀 Features

- 🎤 Audio Transcription using Faster Whisper
- 📝 AI Transcript Correction
- ✨ AI-generated Meeting Summary
- 📌 Key Points Extraction
- ✅ Action Item Detection
- 🌍 Automatic Language Detection
- 📄 Download Summary
- ⚡ Fast React + Express Interface

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- CSS
- Axios

### Backend
- Node.js
- Express.js
- Multer

### AI
- Faster Whisper
- Hugging Face Inference API
- Qwen 2.5 Instruct

### Python
- Faster Whisper
- Torch

---

## 📸 Screenshots

### Home

![Home](screenshots/chrome_AsTascNndf.png)

---

### Processing

![Processing](screenshots/chrome_BYjsNwAZ73.png)

---

### Results

![Results](screenshots/chrome_eKHSNRUuXW.png)

---

## 📂 Project Structure

```
Meeting-Summarizer/

│

├── frontend/

│ ├── src/

│ └── public/

│

├── backend/

│ ├── controllers/

│ ├── routes/

│ ├── services/

│ └── middleware/

│

├── transcriber/

│ ├── app.py

│ └── transcribe.py

│

└── screenshots/
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/devaa57/Meeting-Summarizer.git
```

---

### Backend

```bash
cd backend

npm install
```

Create a `.env`

```env
HF_API_KEY=your_key
PORT=5000
PYTHON_PATH=path_to_python
```

Run

```bash
npm start
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

### Python

```bash
cd transcriber

pip install -r requirements.txt
```

---

## 📌 Future Improvements

- PDF Export
- Speaker Diarization
- Timestamped Transcript
- Search Transcript
- Dark Mode
- Cloud Deployment

---

## 👨‍💻 Author

**Devanshu Nirmal**

GitHub:
https://github.com/devaa57