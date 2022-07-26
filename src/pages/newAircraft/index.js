import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FlightIcon from '@mui/icons-material/Flight';
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
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<TextField
					id='registration'
					name='registration'
					value={form.registration}
					onChange={handleChange}
					label='Registration'
					variant='outlined'
				/>
				<TextField
					id='make'
					name='make'
					value={form.make}
					onChange={handleChange}
					label='Make'
					variant='outlined'
				/>
				<TextField
					id='model'
					name='model'
					value={form.model}
					onChange={handleChange}
					label='Model'
					variant='outlined'
				/>
				<TextField
					id='icaoCode'
					name='icaoCode'
					value={form.icaoCode}
					onChange={handleChange}
					label='ICAO Code'
					variant='outlined'
				/>
				<TextField
					id='fuelPerHour'
					name='fuelPerHour'
					value={form.fuelPerHour}
					onChange={handleChange}
					label='Fuel Per Hour'
					variant='outlined'
				/>
				<TextField
					id='fuelCapacity'
					name='fuelCapacity'
					value={form.fuelCapacity}
					onChange={handleChange}
					label='Fuel Capacity'
					variant='outlined'
				/>
				<Button variant='contained' type='submit'>
					Add Aircraft <FlightIcon />
				</Button>
			</Box>
		</>
	);
}
