import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
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
		<Box sx={{ width: '90%' }}>
			<LinearProgress />
		</Box>
	) : (
		<>
			<AircraftNavbar />
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
						label='Fuel Per Hour'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<TextField
						id='fuelCapacity'
						name='fuelCapacity'
						value={form.fuelCapacity}
						onChange={handleChange}
						label='Fuel Capacity'
						variant='outlined'
						sx={{ marginBottom: '20px', width: '40%' }}
						className={style.input}
					/>
					<Button
						variant='contained'
						type='submit'
						sx={{ marginBottom: '15px', width: '20%' }}
						className={style.editBtn}
					>
						Update Aircraft
					</Button>
					<Button
						variant='outlined'
						color='error'
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
						sx={{ marginBottom: '10px', width: '20%' }}
						className={style.editBtn}
					>
						DELETE Aircraft
					</Button>
				</Grid>
			</Box>
		</>
	);
}
