# Altiplano Precipitation Trends (1981–2018)

Interactive data visualization of the research paper: **"Precipitation trends over the southern Andean Altiplano from 1981 to 2018"** (Rivera et al., 2020).

## 🛠 Quick Start (Local Development)

To run this project locally in **Visual Studio Code**:

### 1. Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version).

### 2. Manual Setup
1. Create a folder named `altiplano-viz` on your computer.
2. Open the folder in VS Code.
3. Copy all files from this environment into your local folder.
4. Open the VS Code terminal and run:
   ```bash
   npm install
   ```
5. Start the preview:
   ```bash
   npm run dev
   ```
6. Open the local link provided (usually `http://localhost:5173`).

---

## 🐙 Connecting to GitHub

If you want to host this on GitHub:

1. Create a **New Repository** on [GitHub](https://github.com/new).
2. In your VS Code terminal, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## 🚀 Deployment (See it live)

### Option A: Vercel (Easiest)
- Import your GitHub repo into [Vercel](https://vercel.com).
- It will automatically deploy your site and provide a URL.

### Option B: GitHub Pages
1. Install the helper: `npm install gh-pages --save-dev`
2. Add `"homepage": "https://YOUR_USER.github.io/YOUR_REPO"` to `package.json`.
3. Add these scripts to `package.json`:
   - `"predeploy": "npm run build"`
   - `"deploy": "gh-pages -d dist"`
4. Run `npm run deploy`.

---

## 📄 Research Context
The Southern Andean Altiplano (SAA) is facing significant drying trends. This application visualizes 38 years of CHIRPS precipitation data to highlight the ecological and social vulnerabilities of this high-altitude region.
