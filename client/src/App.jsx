import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Workout from './pages/Workout'
import NavBar from './components/NavBar'
import StatsPage from './pages/StatsPage'
import EditPage from './pages/EditPage'
import DeletePage from './pages/DeletePage'
import CreateExercisePage from './pages/CreateExercisePage'

function App() {


  return (
    <div className='app'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/logworkout" element={<CreateExercisePage />}></Route>
          <Route path="/stats" element={<StatsPage />}></Route>
          <Route path="/workouts/:name" element={<Workout/>}></Route>
          <Route path="/workouts" element={<Workout/>}></Route>
          <Route path="/edit/:id" element={<EditPage/>}></Route>
          <Route path="/delete" element={<DeletePage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
