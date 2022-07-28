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

	const [loading, setLoading] = useState(true);

	const [flightData, setFlightData] = useState({
		flight: {},
		airport: [],
		metar: [],
		taf: [],
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const { data: flight } = await api.get(`flight/${id}`);
				const {
					data: { data: airport },
				} = await axios.get(
					`https://api-redemet.decea.mil.br/aerodromos/?api_key=${process.env.REACT_APP_REDEMET}&pais=Brasil`
				);
				const {
					data: {
						data: { data: metar },
					},
				} = await axios.get(
					`https://api-redemet.decea.mil.br/mensagens/metar/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
				);

				const {
					data: {
						data: { data: taf },
					},
				} = await axios.get(
					`https://api-redemet.decea.mil.br/mensagens/taf/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
				);

				setFlightData({ flight, airport, metar, taf });
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, [id]);

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
										{flightData.airport
											.filter((currentAirport) => {
												return (
													currentAirport.cod === flightData.flight.departure
												);
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
										{flightData.airport
											.filter((currentAirport) => {
												return currentAirport.cod === flightData.flight.arrival;
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

										{flightData.airport
											.filter((currentAirport) => {
												return (
													currentAirport.cod === flightData.flight.alternative
												);
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
										{flightData.metar
											.filter((currentMetar) => {
												return (
													currentMetar.id_localidade ===
													flightData.flight.departure
												);
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
										{flightData.metar
											.filter((currentMetar) => {
												return (
													currentMetar.id_localidade ===
													flightData.flight.arrival
												);
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
										{flightData.metar
											.filter((currentMetar) => {
												return (
													currentMetar.id_localidade ===
													flightData.flight.alternative
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
										{flightData.taf
											.filter((currentTaf) => {
												return (
													currentTaf.id_localidade ===
													flightData.flight.departure
												);
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
										{flightData.taf
											.filter((currentTaf) => {
												return (
													currentTaf.id_localidade === flightData.flight.arrival
												);
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
										{flightData.taf
											.filter((currentTaf) => {
												return (
													currentTaf.id_localidade ===
													flightData.flight.alternative
												);
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
									{flightData.flight.aircraft.map((currentAircraft) => {
										return (
											<div key={currentAircraft.id}>
												<p>
													{`Total Fuel Available: ${currentAircraft.fuelCapacity} liters`}
												</p>
												<p>
													Fuel Required:{' '}
													{currentAircraft.fuelPerHour *
														(flightData.flight.flightTime / 60)}{' '}
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
			</Grid>
		</>
	);
}
