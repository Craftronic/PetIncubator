import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Helmet } from 'react-helmet'

// Extend the Window interface
declare global {
  interface Window {
      source: EventSource;
  }
}

ReactDOM.createRoot(document.querySelector('esp-app')!).render(
  <React.StrictMode>
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>PetIncubator</title>
        <meta name="description" content="A PetIncubator built with ESPHome" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {/* Load the app */}
      <App />
    </div>
  </React.StrictMode>,
)
