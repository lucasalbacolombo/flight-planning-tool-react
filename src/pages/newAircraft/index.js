import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FlightIcon from '@mui/icons-material/Flight';
import Grid from '@mui/material/Grid';
import EditNavbar from '../../components/editNavbar/index';

export function NewAircraft() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		registration: '',
		make: '',
		model: '',
		icaocode: '',
		fuelPerHour: '',
		fuelCapacity: '',
	});

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await api.post('/aircraft/create-aircraft', form);

			navigate('/user-home');
		} catch (error) {
			console.log(error);
		}
	}

	return (
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
						id='registration'
						name='registration'
						value={form.registration}
						onChange={handleChange}
						label='Registration'
						variant='outlined'
						sx={{ marginBottom: '20px', marginTop: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='make'
						name='make'
						value={form.make}
						onChange={handleChange}
						label='Make'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='model'
						name='model'
						value={form.model}
						onChange={handleChange}
						label='Model'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='icaoCode'
						name='icaoCode'
						value={form.icaoCode}
						onChange={handleChange}
						label='ICAO Code'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='fuelPerHour'
						name='fuelPerHour'
						value={form.fuelPerHour}
						onChange={handleChange}
						label='Liters Per Hour'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='fuelCapacity'
						name='fuelCapacity'
						value={form.fuelCapacity}
						onChange={handleChange}
						label='Fuel Capacity (Liters)'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<Button
						variant='contained'
						type='submit'
						sx={{ marginBottom: '30px' }}
					>
						Add Aircraft <FlightIcon />
					</Button>
				</Grid>
			</Box>
		</>
	);
}
