# Project Architecture - Truestate Assignment

## Overview
This project is a monorepo containing both the backend and frontend of the Truestate Assignment application.

- **Backend**: Node.js + Express
- **Frontend**: React.js
- **Data**: CSV/JSON files in `backend/data/` (large files tracked via Git LFS)

This document explains the folder structure, data flow, and deployment instructions.

---

## Folder Structure

root/
├── backend/
│ ├── src/
│ │ ├── controllers/ # Handle business logic and request processing
│ │ ├── services/ # Data processing and service functions
│ │ ├── utils/ # Utility/helper functions
│ │ ├── routes/ # API route definitions
│ │ ├── models/ # Data models (if needed)
│ │ └── index.js # Backend entry point
│ ├── package.json
│ └── README.md
│
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # React pages (if Next.js)
│ │ ├── routes/ # React Router routes
│ │ ├── services/ # API calls and helpers
│ │ ├── utils/ # Utility functions
│ │ ├── hooks/ # Custom React hooks
│ │ ├── styles/ # CSS/SCSS files
│ │ └── App.js # Main React entry file
│ ├── public/ # Static files
│ ├── package.json
│ └── README.md
│
├── docs/
│ └── architecture.md # This file
│
├── README.md # Root project README
└── package.json # Optional for monorepo setup

---

## Data Flow

1. **Frontend** sends API requests to the **Backend**.  
2. **Backend** reads data from `backend/data/` (CSV/JSON) and processes it.  
3. Backend returns JSON responses to frontend.  
4. Frontend renders the data using React components.  

---

## Backend

- **Entry point**: `backend/src/index.js`  
- **Controllers**: Handle the main business logic  
- **Routes**: Define API endpoints  
- **Services**: Process data and implement core functionalities  
- **Utils**: Helper functions  
- **Models**: Define data models if needed  
- **Data files**: `backend/data/truestate_assignment_dataset.csv` and `backend/data/sales.json` (tracked via Git LFS)  

---

## Frontend

- **Entry point**: `frontend/src/App.jsx`  
- **Components**: Reusable UI components  
- **Pages**: For routing in Next.js or React Router  
- **Routes**: Frontend routing definitions (React Router)  
- **Services**: Functions to fetch data from backend APIs  
- **Utils**: Helper functions  
- **Hooks**: Custom React hooks for state and effects  
- **Styles**: CSS/SCSS for styling  
- **Public**: Static assets like images and favicon  

---

## Deployment Notes

- Use **Git LFS** for large backend data files (`backend/data/*.csv`, `backend/data/*.json`)  
- Backend: `node backend/src/index.js`  
- Frontend: `npm start` (after `npm install`)  
- Keep frontend and backend as separate folders inside the monorepo  
- Large files are **not committed directly** to Git; they are tracked with LFS  

---

## Notes

- Follow folder naming conventions for maintainability  
- Ensure `.gitignore` excludes `node_modules/`, `build/`, `dist/` in both frontend and backend  
- This structure supports scalable development and easier collaboration  

