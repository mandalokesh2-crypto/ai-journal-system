\# AI Assisted Journal System



This project implements a journaling system where users record experiences after immersive nature sessions.



Features



\- Create journal entries

\- View previous entries

\- AI emotion analysis

\- Insights on user mental state



Tech Stack



Backend

Node.js + Express



Frontend

React



Database

SQLite



LLM

Google Gemini API



Run Backend



cd backend

npm install

node server.js



Run Frontend



cd frontend

npm install

npm start

## API Key Setup



This project uses the Google Gemini API for emotion analysis.



Before running the project, replace the placeholder API key in:



backend/routes/journal.js



Change:



const GEMINI\_API\_KEY = "YOUR\_API\_KEY";



To:



const GEMINI\_API\_KEY = "AIzaSyA1I3oYJqe39hwiA1qvkA8961227fPj7nk";

