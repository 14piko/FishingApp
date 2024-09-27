import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { RoutesNames } from './constants';
import Homepage from './pages/Homepage';
import UsersView from './pages/users/UsersView';
import AddUsers from './pages/users/AddUsers';
import EditUsers from './pages/users/EditUsers';
import FishesView from './pages/fishes/FishesView';
import AddFishes from './pages/fishes/AddFishes';
import EditFishes from './pages/fishes/EditFishes';
import RiversView from './pages/rivers/RiversView';
import AddRiver from './pages/rivers/AddRivers';
import EditRiver from './pages/rivers/EditRivers';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path={RoutesNames.HOME} element={<Homepage />} />
          <Route path={RoutesNames.USER_VIEW} element={<UsersView />} />
          <Route path={RoutesNames.NEW_USER} element={<AddUsers />} />
          <Route path={RoutesNames.EDIT_USER} element={<EditUsers />} />
          <Route path={RoutesNames.FISH_VIEW} element={<FishesView />} />
          <Route path={RoutesNames.NEW_FISH} element={<AddFishes />} />
          <Route path={RoutesNames.EDIT_FISH} element={<EditFishes />} />
          <Route path={RoutesNames.RIVER_VIEW} element={<RiversView />} />
          <Route path={RoutesNames.NEW_RIVER} element={<AddRiver />} />
          <Route path={RoutesNames.EDIT_RIVER} element={<EditRiver />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;