import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { api } from '../../api/api';
import style from './style.module.css';
import ResponsiveAppBar from '../../components/navbar/index';
import Footer from '../../components/footer/index';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';
import { Toaster, toast } from 'react-hot-toast';

export function Login() {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const { setLoggedInUser } = useContext(AuthContext);

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await api.post('/user/login', form);
			setLoggedInUser({ ...response.data });

			localStorage.setItem('loggedInUser', JSON.stringify(response.data));

			navigate('/user-home');
		} catch (error) {
			toast.error('Wrong e-mail or password');
			console.log(error);
		}
	}

	return (
		<>
			<Toaster />
			<ResponsiveAppBar />
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
						height: 350,
					},
				}}
			>
				<Paper elevation={3}>
					<form onSubmit={handleSubmit} className={style.form}>
						<ExploreIcon
							sx={{ fontSize: 60, marginBottom: '15px', width: '100%' }}
						/>
						<TextField
							id='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							label='E-mail'
							sx={{ width: '80%', marginBottom: '15px' }}
							variant='outlined'
							required
						/>
						<TextField
							id='password'
							type='password'
							name='password'
							value={form.password}
							onChange={handleChange}
							label='Password'
							sx={{ width: '80%', marginBottom: '15px' }}
							variant='outlined'
							required
						/>
						<Button variant='contained' type='submit'>
							Login
						</Button>
					</form>
				</Paper>
			</Box>
			<Footer />
		</>
	);
}
