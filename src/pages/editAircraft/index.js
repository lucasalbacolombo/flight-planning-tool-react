import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import AircraftNavbar from '../../components/aircraftsNavbar/index';

export function EditAircraft() {
	const navigate = useNavigate();

	const { id } = useParams();

	const [form, setForm] = useState({
		registration: '',
		make: '',
		model: '',
		icaocode: '',
		fuelPerHour: '',
		fuelCapacity: '',
	});

	const [aircraft, setAircraft] = useState([]);

	const [loading, setLoading] = useState(true);

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	useEffect(() => {
		async function fetchAircraft() {
			try {
				const response = await api.get(`aircraft/${id}`);

				setForm(response.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}

		fetchAircraft(id);
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await api.patch(`/aircraft/edit/${id}`, form);

			navigate('/my-aircrafts');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDelete() {
		try {
			await api.delete(`/aircraft/delete/${id}`);
			navigate('/my-aircrafts');
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
			<AircraftNavbar />
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
					Update Aircraft
				</Button>
				<Button
					variant='outlined'
					color='error'
					startIcon={<DeleteIcon />}
					onClick={handleDelete}
				>
					DELETE Aircraft
				</Button>
			</Box>
		</>
	);
}
