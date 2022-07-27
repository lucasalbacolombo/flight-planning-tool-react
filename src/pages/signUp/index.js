import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
				//toast aqui
				return;
			}

			await api.post('/user/signup', form);
			//toast aqui

			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<ResponsiveAppBar></ResponsiveAppBar>
			<Box
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				sx={{
					display: 'flex',
					height: '100vh',
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
							value={form.name}
							onChange={handleChange}
							label='Name'
							style={{ marginBottom: '15px' }}
							variant='outlined'
						/>
						<TextField
							id='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							label='E-mail'
							style={{ marginBottom: '15px' }}
							variant='outlined'
						/>
						<TextField
							id='password'
							type='password'
							name='password'
							value={form.password}
							onChange={handleChange}
							label='Password'
							style={{ marginBottom: '15px' }}
							variant='outlined'
						/>
						<TextField
							id='passwordConfirmation'
							type='password'
							name='passwordConfirmation'
							value={form.passwordConfirmation}
							onChange={handleChange}
							label='Confirm Password'
							style={{ marginBottom: '15px' }}
							variant='outlined'
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
