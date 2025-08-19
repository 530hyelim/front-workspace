import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import Practice from './Practice.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      {/* <App /> */}
      <Practice />
    </BrowserRouter>
  </>,
)