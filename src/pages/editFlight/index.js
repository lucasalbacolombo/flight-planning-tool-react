import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import EditNavbar from '../../components/editNavbar/index';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

export function EditFlight() {
	const navigate = useNavigate();

	const { id } = useParams();

	const [form, setForm] = useState({
		date: '',
		eobt: '',
		departure: '',
		arrival: '',
		alternative: '',
		distance: '',
		flightTime: '',
		aircraft: '',
	});

	const [aircraft, setAircraft] = useState([]);

	const [loading, setLoading] = useState(true);

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	useEffect(() => {
		async function fetchFlight() {
			try {
				const response = await api.get(`flight/${id}`);

				setForm(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchFlight(id);
	}, []);

	useEffect(() => {
		async function fetchAircraft() {
			try {
				const response = await api.get('/aircraft/aircrafts');

				setAircraft(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchAircraft();
	}, []);

	async function handleDelete() {
		try {
			await api.delete(`/flight/delete/${id}`);
			navigate('/user-home');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await api.patch(`/flight/edit/${id}`, form);

			navigate('/user-home');
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
			<EditNavbar />
			<Box
				component='form'
				sx={{ marginTop: '15px', '& > :not(style)': { mt: 1, width: '100%' } }}
				onSubmit={handleSubmit}
			>
				<Grid
					container
					direction='column'
					justifyContent='center'
					alignItems='center'
					sx={{ width: '100%' }}
				>
					<TextField
						id='date'
						name='date'
						value={form.date}
						onChange={handleChange}
						label='Date'
						variant='outlined'
						sx={{ marginBottom: '20px', marginTop: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='eobt'
						name='eobt'
						value={form.eobt}
						onChange={handleChange}
						label='EOBT'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='departure'
						name='departure'
						value={form.departure}
						onChange={handleChange}
						label='Departure'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='arrival'
						name='arrival'
						value={form.arrival}
						onChange={handleChange}
						label='Arrival'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='alternative'
						name='alternative'
						value={form.alternative}
						onChange={handleChange}
						label='Alternative'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='distance'
						name='distance'
						value={form.distance}
						onChange={handleChange}
						label='Distance (Nautical Miles)'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='flightTime'
						name='flightTime'
						value={form.flightTime}
						onChange={handleChange}
						label='Flight Time (Minutes)'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>

					<TextField
						id='aircraft'
						name='aircraft'
						select
						label='Aircraft'
						value={form.aircraft}
						onChange={handleChange}
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
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

					<Button
						variant='contained'
						type='submit'
						sx={{ marginBottom: '10px', width: '25%' }}
						className={style.editBtn}
					>
						Update Flight
					</Button>
					<Button
						variant='outlined'
						color='error'
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
						sx={{ marginBottom: '30px', width: '25%' }}
						className={style.editBtn}
					>
						DELETE Flight
					</Button>
				</Grid>
			</Box>
		</>
	);
}
