import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
			console.log(error);
		}
	}

	return (
		<Box
			style={{ height: 'auto' }}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				'& > :not(style)': {
					m: 1,
					width: 350,
					height: 350,
				},
			}}
		>
			<Paper elevation={3}>
				<form onSubmit={handleSubmit}>
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
					<Button variant='contained' type='submit'>
						Login
					</Button>
				</form>
			</Paper>
		</Box>
	);
}
