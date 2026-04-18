# Case Scribe AI 🩺 
### *Bridging Clinical Observations and Structured Documentation*

**Case Scribe AI** is an intelligent medical documentation prototype designed to streamline the SOAP (Subjective, Objective, Assessment, Plan) note-taking process. By leveraging Large Language Models (LLMs) and local orchestration, it provides a secure, efficient way for healthcare providers to transform messy patient encounter notes into professional, anonymized, and structured records.

---

## 🛠️ The Architecture
I designed this project with a **decoupled, hybrid-cloud architecture** to simulate a high-security medical environment where data privacy is paramount.

* **Frontend:** A high-performance **React 18** SPA built with **TypeScript** and **Tailwind CSS**. It handles real-time voice-to-text transcription locally via the Web Speech API.
* **Orchestration (The Brain):** A self-hosted **n8n** instance that manages the logic flow, PII (Personally Identifiable Information) stripping, and API communication.
* **LLM Engine:** **Llama-3.3-70b-versatile** running on **Groq's LPU (Language Processing Unit)**, chosen for its sub-2-second inference speed—essential for clinical efficiency.
* **Secure Tunneling:** **Cloudflare Tunnels** create a private, encrypted bridge between the live web frontend and the local n8n server.

---

## 🌟 Key Features & Engineering Decisions

### 🎙️ Intelligent Voice Capture
Rather than streaming heavy audio files to a server, I implemented **client-side transcription**.
* **The "Why":** This reduces bandwidth costs, lowers latency, and ensures the doctor sees immediate feedback as they speak.

### 🛡️ Automated Anonymization & PII Stripping
The system is programmed to detect and swap patient names and sensitive identifiers with generic tags (e.g., "[PATIENT]") before the data is stored or further processed.
* **The "Why":** This demonstrates a "Privacy-by-Design" approach essential for HIPAA-compliant environments.

### 📊 Smart SOAP Structuring
The AI doesn't just "summarize"; it categorizes clinical data points (Vitals, Symptoms, Diagnosis, Treatment Plan) into the correct SOAP quadrants.
* **Example:** It recognizes that "BP 140/90" is an **Objective** finding, while "Patient feels dizzy" is a **Subjective** symptom.
## 🧠 Technical Decisions & "The Why"

* **Why Decoupled Architecture?** I separated the React frontend from the n8n backend to simulate a high-security environment. This allows for modular updates without taking the whole system down.
* **Why Groq + Llama 3.3?** Speed is critical in healthcare. By using Groq's LPUs, I achieved sub-2-second inference times, ensuring doctors aren't left waiting for documentation.
* **Why Web Speech API?** Transcription happens locally in the browser to reduce latency and keep sensitive audio data off the server until it's converted to text.
---

## 🚀 Future Roadmap
* **RAG Implementation:** Integrating a Vector Database (like Pinecone) to link notes directly to PubMed research and treatment guidelines.
* **Multi-language Support:** Enabling transcription for doctors who consult in multiple dialects.
* **PDF Export:** Direct integration to generate print-ready clinical reports.

---

## 👨‍💻 About the Developer
Built by **[Akshay]** as a demonstration of full-stack AI orchestration and UI/UX design for the **Docquity Network** internship application. 

[LinkedIn](https://www.linkedin.com/in/akshay-koundal-52400814a ) [Mail id] (Akshaykoundal38@gmail.com) [Phone] (7018192809)
