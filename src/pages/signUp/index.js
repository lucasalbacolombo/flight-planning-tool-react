import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ExploreIcon from '@mui/icons-material/Explore';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'react-hot-toast';
import style from './style.module.css';
import ResponsiveAppBar from '../../components/navbar/index';
import Footer from '../../components/footer/index';

export function SignUp() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	const navigate = useNavigate();

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

			await api.post('/user/signup', form);

			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Toaster />
			<ResponsiveAppBar></ResponsiveAppBar>
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
						<ExploreIcon sx={{ fontSize: 60, marginBottom: '15px' }} />
						<TextField
							id='name'
							name='name'
							value={form.name}
							onChange={handleChange}
							label='Name'
							variant='outlined'
							sx={{ width: '80%', marginBottom: '15px' }}
							required
						/>
						<TextField
							id='email'
							name='email'
							value={form.email}
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
							value={form.password}
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
							value={form.passwordConfirmation}
							onChange={handleChange}
							label='Confirm Password'
							variant='outlined'
							sx={{ width: '80%', marginBottom: '15px' }}
							required
						/>
						<Button variant='contained' type='submit'>
							SignUp
						</Button>
					</form>
				</Paper>
			</Box>
			<Footer></Footer>
		</>
	);
}
