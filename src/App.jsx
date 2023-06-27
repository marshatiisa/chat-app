import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './pages/components/PrivateRoutes'

import Room from './pages/Room'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />

        <Route element={<PrivateRoute />}>
        <Route path="/" element={<Room/>} />

        </Route>

      </Routes>
   </Router>
    </>
  )
}

export default App
