import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RotateRing from './RotateRing.jsx'
import LightPosOrbit from './LightPosOrbit.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RotateRing /> */}
    {/* <LightPosOrbit /> */}
    <App />
  </StrictMode>,
)
