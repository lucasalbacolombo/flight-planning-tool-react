import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

	console.log(form);

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
	);
}
