import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import axios from 'axios';
import EditNavbar from '../../components/editNavbar/index';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function FlightStatus() {
	const { id } = useParams();

	const [flight, setFlight] = useState([]);

	const [airport, setAirport] = useState([]);

	const [metar, setMetar] = useState([]);

	const [taf, setTaf] = useState([]);

	const [windy, setWindy] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFlight() {
			try {
				const response = await api.get(`flight/${id}`);
				setFlight(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchFlight();
	}, []);

	useEffect(() => {
		async function fetchAirport() {
			try {
				const response = await axios.get(
					`https://api-redemet.decea.mil.br/aerodromos/?api_key=${process.env.REACT_APP_REDEMET}&pais=Brasil`
				);

				setAirport([...response.data.data]);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchAirport();
	}, []);

	useEffect(() => {
		async function fetchMetar() {
			try {
				const response = await axios.get(
					`https://api-redemet.decea.mil.br/mensagens/metar/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
				);

				setMetar(response.data.data.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchMetar();
	}, []);

	useEffect(() => {
		async function fetchTaf() {
			try {
				const response = await axios.get(
					`https://api-redemet.decea.mil.br/mensagens/taf/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
				);

				setTaf(response.data.data.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchTaf();
	}, []);

	console.log(taf);
	// console.log(flight.aircraft);

	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<EditNavbar />
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Stack spacing={2}>
						<Card sx={{ maxWidth: 345 }}>
							<Card>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div'>
										Airport Information
									</Typography>
									<div>
										{airport
											.filter((currentAirport) => {
												return currentAirport.cod === flight.departure;
											})
											.map((airport) => {
												return (
													<div key={airport.id}>
														<h4>Departure</h4>
														<ul>
															<li>Code: {airport.cod}</li>
															<li>Name: {airport.nome}</li>
															<li>City: {airport.cidade}</li>
															<li>Elevation: {airport.altitude_pes}ft</li>
														</ul>
													</div>
												);
											})}
										{airport
											.filter((currentAirport) => {
												return currentAirport.cod === flight.arrival;
											})
											.map((airport) => {
												return (
													<div key={airport.id}>
														<h4>Arrival</h4>
														<ul>
															<li>Code: {airport.cod}</li>
															<li>Name: {airport.nome}</li>
															<li>City: {airport.cidade}</li>
															<li>Elevation: {airport.altitude_pes}ft</li>
														</ul>
													</div>
												);
											})}
										{airport
											.filter((currentAirport) => {
												return currentAirport.cod === flight.alternative;
											})
											.map((airport) => {
												return (
													<div key={airport.id}>
														<h4>Alternative</h4>
														<ul>
															<li>Code: {airport.cod}</li>
															<li>Name: {airport.nome}</li>
															<li>City: {airport.cidade}</li>
															<li>Elevation: {airport.altitude_pes}ft</li>
														</ul>
													</div>
												);
											})}
									</div>
								</CardContent>
							</Card>
						</Card>
						<Card sx={{ maxWidth: 345 }}>
							<Card>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div'>
										METAR
									</Typography>
									<div>
										{metar
											.filter((currentMetar) => {
												return currentMetar.id_localidade === flight.departure;
											})
											.map((metar) => {
												return (
													<div key={metar.id}>
														<h4>Departure</h4>
														<p>{metar.mens}</p>
													</div>
												);
											})}
									</div>
									<div>
										{metar
											.filter((currentMetar) => {
												return currentMetar.id_localidade === flight.arrival;
											})
											.map((metar) => {
												return (
													<div key={metar.id}>
														<h4>Arrival</h4>
														<p>{metar.mens}</p>
													</div>
												);
											})}
									</div>
									<div>
										{metar
											.filter((currentMetar) => {
												return (
													currentMetar.id_localidade === flight.alternative
												);
											})
											.map((metar) => {
												return (
													<div key={metar.id}>
														<h4>Alternative</h4>
														<p>{metar.mens}</p>
													</div>
												);
											})}
									</div>
								</CardContent>
							</Card>
						</Card>
						<Card sx={{ maxWidth: 345 }}>
							<Card>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div'>
										TAF
									</Typography>
									<div>
										{taf
											.filter((currentTaf) => {
												return currentTaf.id_localidade === flight.departure;
											})
											.map((taf) => {
												return (
													<div key={taf.id}>
														<h4>Departure</h4>
														<p>{taf.mens}</p>
													</div>
												);
											})}
									</div>
									<div>
										{taf
											.filter((currentTaf) => {
												return currentTaf.id_localidade === flight.arrival;
											})
											.map((taf) => {
												return (
													<div key={taf.id}>
														<h4>Arrival</h4>
														<p>{taf.mens}</p>
													</div>
												);
											})}
									</div>
									<div>
										{taf
											.filter((currentTaf) => {
												return currentTaf.id_localidade === flight.alternative;
											})
											.map((taf) => {
												return (
													<div key={taf.id}>
														<h4>Alternative</h4>
														<p>{taf.mens}</p>
													</div>
												);
											})}
									</div>
								</CardContent>
							</Card>
						</Card>
						<Card sx={{ maxWidth: 345 }}>
							<Card>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div'>
										Fuel Information
									</Typography>
									{flight.aircraft.map((currentAircraft) => {
										return (
											<div key={currentAircraft.id}>
												<p>
													{`Total Fuel Available: ${currentAircraft.fuelCapacity} liters`}
												</p>
												<p>
													Fuel Required:{' '}
													{currentAircraft.fuelPerHour *
														(flight.flightTime / 60)}{' '}
													liters
												</p>
											</div>
										);
									})}
								</CardContent>
							</Card>
						</Card>
					</Stack>
				</Grid>
				<Grid item>
					<div id='windy'></div>
				</Grid>
			</Grid>
		</>
	);
}
