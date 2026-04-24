# DGCA Drone Rules Assistant - Frontend

Modern React frontend for the RAG-based DGCA Drone Regulations Assistant.

## Features

- **Modern UI/UX** - Dark theme with glassmorphism effects and smooth animations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **React Router** - SPA navigation with /chat, /architecture, /documents routes
- **Framer Motion** - Smooth page transitions and animations
- **TailwindCSS** - Utility-first styling with custom design system

## Architecture Pages

1. **Home** (`/`) - Landing page with hero, stats, and system overview
2. **Chat** (`/chat`) - Interactive chat interface connected to FastAPI backend
3. **Architecture** (`/architecture`) - Detailed RAG pipeline documentation
4. **Documents** (`/documents`) - Indexed document library

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation with mobile menu
│   │   ├── Hero.jsx         # Landing page hero section
│   │   ├── ChatPage.jsx     # Chat interface
│   │   ├── Architecture.jsx # System architecture docs
│   │   ├── Documents.jsx    # Document library
│   │   └── Footer.jsx       # Site footer
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + custom styles
├── public/                  # Static assets
├── package.json
├── vite.config.js           # Vite + proxy config
├── tailwind.config.js       # Tailwind theme
└── postcss.config.js
```

## Quick Start

```bash
cd frontend
npm install
npm run dev          # Dev server on http://localhost:5173
npm run build        # Production build to ../web/dist
```

## Backend Integration

The Vite dev server proxies API calls to the FastAPI backend:
- `/chat` → `http://localhost:8000/chat`
- `/index` → `http://localhost:8000/index`

## Branding

System Architect: **Aribam Aditya Sharma**

Featured prominently throughout the UI with:
- Architect badge in hero section
- Footer credit
- System documentation

## Tech Stack

- React 18
- Vite 5
- React Router 6
- TailwindCSS 3
- Framer Motion
- Lucide React (icons)
