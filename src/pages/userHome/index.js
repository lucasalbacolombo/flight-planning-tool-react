import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../api/api';
import { Link } from 'react-router-dom';
import ResponsiveUserBar from '../../components/userNavbar/index';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function UserHome() {
	const [flights, setFlights] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFlights() {
			try {
				const response = await api.get('/flight/flights');
				setFlights(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchFlights();
	}, []);

	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<ResponsiveUserBar />

			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Stack spacing={2}>
						<h3 style={{ marginLeft: '20px', marginTop: '25px' }}>
							My Flights
						</h3>
						{flights.map((currentFlight) => {
							return (
								<Card
									sx={{ minWidth: 275, margin: '25px' }}
									key={currentFlight._id}
								>
									<CardContent>
										<Typography sx={{ minWidth: 275 }}>
											Date: {currentFlight.date}
										</Typography>
										<Typography sx={{ mb: 1.5 }}>
											EOBT: {currentFlight.eobt}
										</Typography>
										<Typography variant='body2'>
											DEP: {currentFlight.departure}
										</Typography>
										<Typography variant='body2'>
											ARR: {currentFlight.arrival}
										</Typography>
										<Typography variant='body2'>
											ALT: {currentFlight.alternative}
										</Typography>
										<Typography variant='body2'>
											{`DISTANCE: ${currentFlight.distance} NM`}
										</Typography>
										<Typography variant='body2'>
											{`FLIGHT TIME: ${currentFlight.flightTime} minutes`}
										</Typography>
										{currentFlight.aircraft.map((currentAircraft) => {
											return (
												<Typography variant='body2' key={currentAircraft._id}>
													AIRCRAFT: {currentAircraft.registration}
												</Typography>
											);
										})}
									</CardContent>
									<CardActions>
										<Link
											to={`/flight-status/${currentFlight._id}`}
											style={{ textDecoration: 'none', color: 'black' }}
										>
											<Button size='small'>Flight Status</Button>
										</Link>
										<Link
											to={`/edit-flight/${currentFlight._id}`}
											style={{ textDecoration: 'none', color: 'black' }}
										>
											<Button size='small'>Edit Flight</Button>
										</Link>
									</CardActions>
								</Card>
							);
						})}
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}
