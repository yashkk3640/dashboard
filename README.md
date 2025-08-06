# Dashboard Vite + React

This project is a starter dashboard built with Vite, React, Chakra UI, React Router, and PrimeFlex.

## Features
- ⚡️ Vite for fast development
- ⚛️ React 19
- 💅 Chakra UI for beautiful, accessible components
- 🧩 React Router DOM for routing
- 🎨 PrimeFlex for utility-first CSS
- 🏷️ classnames for easy class management

## Getting Started

### Install dependencies

Using Yarn:
```bash
yarn install
```

Or using npm:
```bash
npm install
```

### Start the development server

Using Yarn:
```bash
yarn dev
```

Or using npm:
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Project Structure
```
├── src
│   ├── components
│   │   └── Navbar.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Notes
- Chakra UI components must be wrapped in `<ChakraProvider>` (see `App.jsx`).
- Routing is handled in `App.jsx` using React Router DOM.
- You can add more pages and components as needed.

---

Feel free to customize this template for your own dashboard needs!
