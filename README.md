# M S Yashwanth Kumar - AI Portfolio

This is a premium, modern, recruiter-focused portfolio website with an embedded AI Recruiter Assistant, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, and LangChain + Gemini.

## Features
- **Premium Design**: Apple/Linear/Perplexity AI aesthetic with glassmorphism and smooth animations.
- **AI Recruiter Assistant**: An embedded RAG-based AI chat that can answer natural language questions about your resume.
- **Responsive & Fast**: Fully optimized for mobile and desktop using Next.js App Router.
- **Dark Mode**: Beautiful deep dark mode out of the box.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 + Shadcn UI
- Animations: Framer Motion
- AI & RAG: LangChain, Vercel AI SDK, Google Gemini API
- Vector DB (Optional but configured): Pinecone

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the API keys:
- `GOOGLE_API_KEY`: Get this from Google AI Studio. (Required for the AI Assistant)
- `PINECONE_API_KEY`: Get this from Pinecone Console. (If using Pinecone)
- `PINECONE_INDEX`: Name of your Pinecone index.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Vector Database Ingestion (Pinecone)

If you want to use the full RAG pipeline with Pinecone instead of just the prompt context:
1. Ensure your `M_S_Yashwanth_Kumar_Resume_JUNE.pdf` is in the root directory.
2. Run the ingestion script:
```bash
npx ts-node scripts/ingest-resume.ts
```

## Deployment

This portfolio is ready to be deployed on Vercel.
1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add your `GOOGLE_API_KEY` (and Pinecone keys if used) to the Vercel Environment Variables.
4. Deploy!
