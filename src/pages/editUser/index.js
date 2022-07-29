import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNavbar from '../../components/editNavbar/index';
import { Toaster, toast } from 'react-hot-toast';

export function EditUser() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			if (form.password !== form.passwordConfirmation) {
				toast.error('Wrong Password Confirmation');
				return;
			}

			await api.patch('/user/update-profile', form);

			navigate('/user-home');
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await api.get(`user/profile`);

				setForm(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchUser();
	}, []);

	async function handleDelete() {
		try {
			await api.delete(`/user/disable-profile`);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Toaster />
			<EditNavbar />
			<Box
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				sx={{
					display: 'flex',
					height: '85vh',
					justifyContent: 'center',
					flexWrap: 'wrap',
					'& > :not(style)': {
						m: 1,
						width: 380,
						height: 420,
					},
				}}
			>
				<Paper elevation={3}>
					<form onSubmit={handleSubmit} className={style.form}>
						<TextField
							id='name'
							name='name'
							value={form.name || ''}
							onChange={handleChange}
							label='Name'
							variant='outlined'
							sx={{ width: '80%', marginBottom: '15px' }}
							required
						/>
						<TextField
							id='email'
							name='email'
							value={form.email || ''}
							onChange={handleChange}
							label='E-mail'
							variant='outlined'
							sx={{ width: '80%', marginBottom: '15px' }}
							required
						/>
						<TextField
							id='password'
							type='password'
							name='password'
							value={form.password || ''}
							onChange={handleChange}
							label='Password'
							variant='outlined'
							sx={{ width: '80%', marginBottom: '15px' }}
							required
						/>
						<TextField
							id='passwordConfirmation'
							type='password'
							name='passwordConfirmation'
							value={form.passwordConfirmation || ''}
							onChange={handleChange}
							label='Confirm Password'
							variant='outlined'
							sx={{ width: '80%', marginBottom: '15px' }}
							required
						/>
						<div>
							<Button
								variant='contained'
								type='submit'
								style={{ margin: '15px' }}
							>
								Update
							</Button>
							<Button variant='outlined' color='error' onClick={handleDelete}>
								DELETE PROFILE <DeleteIcon />
							</Button>
						</div>
					</form>
				</Paper>
			</Box>
		</>
	);
}
