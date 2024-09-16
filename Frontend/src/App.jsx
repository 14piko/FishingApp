import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Homepage from './pages/Homepage'
import UsersView from './pages/users/UsersView'

function App() {
  
 
  return (
    <>
        <NavBar />
        <Routes>
          <Route path={RoutesNames.HOME} element={<Homepage />} />

          <Route path={RoutesNames.USER_VIEW} element={<UsersView />} />
        </Routes>
    </>
  )
}

export default App