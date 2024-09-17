import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Homepage from './pages/Homepage'
import UsersView from './pages/users/UsersView'
import AddUsers from './pages/users/AddUsers'
import EditUsers from './pages/users/EditUsers'

function App() {
  
 
  return (
    <>
        <NavBar />
        <Routes>
          <Route path={RoutesNames.HOME} element={<Homepage />} />

          <Route path={RoutesNames.USER_VIEW} element={<UsersView />} />
          <Route path={RoutesNames.NEW_USER} element={<AddUsers />} />
          <Route path={RoutesNames.EDIT_USER} element={<EditUsers />} />
        </Routes>
    </>
  )
}

export default App