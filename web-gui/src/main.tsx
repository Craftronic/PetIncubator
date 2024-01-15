import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import initReactFastclick from 'react-fastclick'
initReactFastclick();

ReactDOM.createRoot(document.querySelector('esp-app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
