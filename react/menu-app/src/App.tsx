import { Route, Routes } from 'react-router-dom'
import './App.css'
import MenuList from './pages/1.MenuList'
import Header from './components/header'

function App() {
  return (
    <div id="container">
      <Header />
      <section id="content">
        <div id="menu-container" className="text-center">
          <Routes>
            <Route path="/menus">
              <Route path='' element={<MenuList/>} />
            </Route>
          </Routes>
        </div>
      </section>
    </div>
  )
}

export default App