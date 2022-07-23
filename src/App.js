import { Routes, Route } from 'react-router-dom';
import { EditFlight } from './pages/editFlight';
import { EditUser } from './pages/editUser';
import { FlightInformation } from './pages/flightInfo';
import { FlightStatus } from './pages/flightStatus';
import { Home } from './pages/home';
import { NewFlight } from './pages/newFlight';
import { Login } from './pages/login';
import { SignUp } from './pages/signUp';
import { UserHome } from './pages/userHome';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
