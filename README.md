
# 🧠 C3 – Career Clarity Chatbot

C3 is an AI-powered career guidance chatbot for Indian students after 10th and 12th. It helps users discover suitable career paths, exams, and courses based on their interests, stream, and goals.


---

## 🚀 Tech Stack

* **Next.js 14 (App Router)**
* **Vercel AI SDK** – Streaming chat with OpenAI
* **Shadcn UI** – Beautiful and accessible UI components
* **Tailwind CSS** – Utility-first styling
* **LangChain + Chroma**  – for RAG (Retrieval-Augmented Generation)

---

## 🌐 Live Demo

[https://career-clarity-chatbot.vercel.app/](https://career-clarity-chatbot.vercel.app/)

---

## 📁 Folder Structure

```
/app
  /chat         ← Chat UI page
  /api/chat     ← Backend API to stream OpenAI responses
/components     ← Chat bubbles, UI components
/lib            ← (Optional) LangChain or custom logic
/public         ← Static assets
.env.local      ← API keys
```

---

## 🧑‍💻 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Career_Clarity_Chatbot.git
cd Career_Clarity_Chatbot
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Run dev server

```bash
pnpm dev
```

Visit `http://localhost:3000`

---

## 🛠 Features

* 🧑‍🏫 GPT-powered conversational career guidance
* 📚 Dynamic system prompts for personalized advice
* 🖼 Beautiful UI using Shadcn components
* 🔄 Streaming responses with Vercel AI SDK
* 📂 LangChain RAG support to query custom PDFs/notes

---

## 🧩 Coming Soon

* 📝 Career interest quiz
* 📄 Career roadmaps with visuals
* 💾 Save or export career plan
* 🔐 Login + save chat history
* 🔍 Explore career paths by stream or domain


---

## 🤝 Credits

* [OpenAI](https://openai.com/)
* [Vercel AI SDK](https://sdk.vercel.ai)
* [Shadcn UI](https://ui.shadcn.com/)
* [LangChain](https://www.langchain.com/)
* [Chroma](https://www.trychroma.com/)

---

## 📬 Contact

Made with 💙 by [Priyadharsani Ganapathi](https://github.com/PriyaD17)

> Have ideas, feedback, or want to collaborate? Let’s connect!

---
