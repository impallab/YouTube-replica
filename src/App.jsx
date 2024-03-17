import { useSelector } from 'react-redux'
import './App.css'
import Buttons from './components/Buttons'
import Feed from './components/Feed'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
function App() {
  const isOpen = useSelector((store) => store.app.isOpen);

  return (
    <div>
      <Navbar />
      <div className={`flex ${isOpen ? "px-60" : "px-32"}`}>
        <Buttons />
      </div>
      <Sidebar />
      <Feed />
    </div>
  )
}

export default App
