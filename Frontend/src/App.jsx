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
import FishingsView from './pages/fishing/FishingsView';
import AddFishings from './pages/fishing/AddFishings';
import EditFishings from './pages/fishing/EditFishings';
import LoadingSpinner from './components/LoadingSpinner'
import { Container } from 'react-bootstrap'
import ErrorModal from './components/ErrorModal';
import useError from "./hooks/useError"

function App() {

  const { errors, showErrorModal, hideError } = useError();

  return (
    <>
      <LoadingSpinner />
      <ErrorModal show={showErrorModal} errors={errors} onHide={hideError} />
      <Container className='application'>
        <NavBar />
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

            <Route path={RoutesNames.FISHING_VIEW} element={<FishingsView />} />
            <Route path={RoutesNames.NEW_FISHING} element={<AddFishings />} />
            <Route path={RoutesNames.EDIT_FISHING} element={<EditFishings />} />
          </Routes>
        </Container>
      </>
  )
}

export default App;