import { Routes, Route } from 'react-router-dom';
import { AuthContextComponent } from './contexts/authContext';
import { ProtectedRoute } from './components/protectedRoute';
import { EditFlight } from './pages/editFlight';
import { EditUser } from './pages/editUser';
import { FlightInformation } from './pages/flightInfo';
import { FlightStatus } from './pages/flightStatus';
import { Home } from './pages/home';
import { NewFlight } from './pages/newFlight';
import { Login } from './pages/login';
import { SignUp } from './pages/signUp';
import { UserHome } from './pages/userHome';
import { AboutUs } from './pages/aboutUs';
import { Solution } from './pages/solutions';

function App() {
	return (
		<>
			<AuthContextComponent>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/login' element={<Login />} />
					<Route path='/aboutus' element={<AboutUs />} />
					<Route path='/solution' element={<Solution />} />
					<Route
						path='/flight-information'
						element={<ProtectedRoute component={FlightInformation} />}
					/>
					<Route
						path='/flight-status'
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
				</Routes>
			</AuthContextComponent>
		</>
	);
}

export default App;
