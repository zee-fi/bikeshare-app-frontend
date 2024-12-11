import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { BikeProvider } from './context/bike.context.js'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <BikeProvider>
        <App />
      </BikeProvider>
    </BrowserRouter>
  </StrictMode>
)
