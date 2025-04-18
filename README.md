# Tech Interview Prep Web App

A full-stack web application for generating customized technical interview questions and answers based on user preferences.

Generate tailored technical interview questions with AI based on role, field, experience, category, and difficulty level. Built with **Next.js App Router**, **Tailwind CSS**, and powered by **OpenRouter AI API**.

## 🌟 Features

- ✅ Role, field, experience, category, and difficulty-based question generation
- ✅ AI-powered question & answer generation via OpenRouter (GPT)
- ✅ Interactive interface to reveal answers and take notes
- ✅ Mark questions for review
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ Environment variables for secure API usage

## 🧰 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI API**: [OpenRouter API](https://openrouter.ai/)
- **Deployment**: [Vercel](https://vercel.com/) (recommended)

## 📁 Folder Structure

```
└── 📁tech-interview
    └── 📁public
        └── tip.png
    └── 📁src
        └── .DS_Store
        └── 📁app
            └── .DS_Store
            └── 📁api
                └── 📁generateQuestions
                    └── route.js
            └── globals.css
            └── layout.js
            └── page.js
            └── 📁questions
                └── page.jsx
        └── 📁components
            └── Form.jsx
            └── index.js
        └── 📁utils
            └── fetchQuestions.js
    └── .DS_Store
    └── .env.local
    └── .gitignore
    └── eslint.config.mjs
    └── jsconfig.json
    └── next.config.mjs
    └── package-lock.json
    └── package.json
    └── postcss.config.mjs
    └── README.md
    └── tailwind.config.js
```

## 🔐 Environment Variables

Create a `.env.local` file in the root and add:
Replace `your_openrouter_api_key` with your actual [OpenRouter API key](https://openrouter.ai/).

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/hemazyn/tech-interview.git
cd tech-interview
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📷 Screenshots

> (Add screenshots of your app UI here for better presentation.)

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js App Router.

## 🧑‍💻 Author
### Emmanuel Tofunmi
Frontend Developer & AI Enthusiast

[Linkedin](https://www.linkedin.com/in/devEmma/) - [Github](https://github.com/Hemazyn)

## 📄 License

This project is licensed under the MIT License — feel free to use and adapt!

---

**Made with ❤️ by Emmanuel Tofunmi**