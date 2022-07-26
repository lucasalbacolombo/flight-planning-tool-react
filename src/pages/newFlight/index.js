import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ResponsiveUserBar from '../../components/userNavbar/index';

export function NewFlight() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		date: '',
		eobt: '',
		departure: '',
		arrival: '',
		alternative: '',
		distance: '',
		aircraft: '',
	});

	const [aircraft, setAircraft] = useState();

	const [loading, setLoading] = useState(true);

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	useEffect(() => {
		async function fetchAircrafts() {
			try {
				const response = await api.get('/aircraft/aircrafts');

				setAircraft(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchAircrafts();
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await api.post('/flight/create-flight', form);

			navigate('/flight-status');
		} catch (error) {
			console.log(error);
		}
	}

	return loading ? (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<ResponsiveUserBar />
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<TextField
					id='date'
					name='date'
					value={form.date}
					onChange={handleChange}
					label='Date'
					variant='outlined'
				/>
				<TextField
					id='eobt'
					name='eobt'
					value={form.eobt}
					onChange={handleChange}
					label='EOBT'
					variant='outlined'
				/>
				<TextField
					id='departure'
					name='departure'
					value={form.departure}
					onChange={handleChange}
					label='Departure'
					variant='outlined'
				/>
				<TextField
					id='arrival'
					name='arrival'
					value={form.arrival}
					onChange={handleChange}
					label='Arrival'
					variant='outlined'
				/>
				<TextField
					id='alternative'
					name='alternative'
					value={form.alternative}
					onChange={handleChange}
					label='Alternative'
					variant='outlined'
				/>
				<TextField
					id='distance'
					name='distance'
					value={form.distance}
					onChange={handleChange}
					label='Distance'
					variant='outlined'
				/>
				<div>
					<TextField
						id='aircraft'
						name='aircraft'
						select
						label='Aircraft'
						value={form.aircraft}
						onChange={handleChange}
						style={{ width: '200px' }}
					>
						{aircraft.map((currentAircraft) => {
							return (
								<MenuItem
									key={currentAircraft._id}
									value={currentAircraft._id}
									onChange={handleChange}
								>
									{currentAircraft.registration}
								</MenuItem>
							);
						})}
					</TextField>
				</div>
				<Button variant='contained' type='submit'>
					Create Flight <FlightTakeoffIcon />
				</Button>
			</Box>
		</>
	);
}
