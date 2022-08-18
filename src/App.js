import { Routes, Route } from 'react-router-dom';
import { AuthContextComponent } from './contexts/AuthContext';
import UserProvider from './contexts/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EditFlight } from './pages/editFlight';
import { EditUser } from './pages/editUser';
import { FlightStatus } from './pages/flightStatus';
import { Home } from './pages/home';
import { NewFlight } from './pages/newFlight';
import { Login } from './pages/login';
import { SignUp } from './pages/signUp';
import { UserHome } from './pages/userHome';
import { AboutUs } from './pages/aboutUs';
import { NewAircraft } from './pages/newAircraft/index';
import { EditAircraft } from './pages/editAircraft/index';
import { MyAircrafts } from './pages/myAircrafts/index';
import { ErrorPage } from './pages/errorPage';
import './style.css';

function App() {
  return (
    <>
      <AuthContextComponent>
        <UserProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='*' element={<ErrorPage />} />
            <Route
              path='/flight-status/:id'
              element={<ProtectedRoute component={FlightStatus} />}
            />
            <Route
              path='/edit-flight/:id'
              element={<ProtectedRoute component={EditFlight} />}
            />
            <Route
              path='/new-flight'
              element={<ProtectedRoute component={NewFlight} />}
            />
            <Route
              path='/user-home'
              element={<ProtectedRoute component={UserHome} />}
            />
            <Route
              path='/edit-user'
              element={<ProtectedRoute component={EditUser} />}
            />
            <Route
              path='/edit-aircraft/:id'
              element={<ProtectedRoute component={EditAircraft} />}
            />
            <Route
              path='/new-aircraft'
              element={<ProtectedRoute component={NewAircraft} />}
            />
            <Route
              path='/my-aircrafts'
              element={<ProtectedRoute component={MyAircrafts} />}
            />
          </Routes>
        </UserProvider>
      </AuthContextComponent>
    </>
  );
}

export default App;
