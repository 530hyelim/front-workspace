import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Practice from './Practice.tsx'

createRoot(document.getElementById('root')!).render(
  // <> 없어도 상관없긴 함
  <>
    {/* <App /> */}
    <Practice />
  </>,
)