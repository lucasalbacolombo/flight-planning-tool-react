import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ExploreIcon from '@mui/icons-material/Explore';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'react-hot-toast';
import style from './style.module.css';
import ResponsiveAppBar from '../../components/HomeNavbar';
import Footer from '../../components/Footer';

export function SignUp() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitFunction(e) {
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
            height: 558,
          },
        }}
      >
        <Paper elevation={3}>
          <form className={style.form}>
            <ExploreIcon sx={{ fontSize: 60, marginBottom: '15px' }} />
            <TextField
              {...register('firstName', {
                required: 'Required',
              })}
              id='firstName'
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
              label='Fist Name'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
            <TextField
              {...register('lastName', {
                required: 'Required',
              })}
              id='lastName'
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              label='Last Name'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.lastName)}
              helperText={errors.firstName?.message}
            />
            <TextField
              {...register('email', {
                required: 'Required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Enter a valid e-mail address',
                },
              })}
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              label='E-mail'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('password', {
                required: 'Required',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    'Password must have: at least 8 characters, one upper case letter, one lower case letter, and one numeric digit.',
                },
              })}
              id='password'
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              label='Password'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <TextField
              {...register('passwordConfirmation', { required: 'Required' })}
              id='passwordConfirmation'
              type='password'
              name='passwordConfirmation'
              value={form.passwordConfirmation}
              onChange={handleChange}
              label='Confirm Password'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.passwordConfirmation)}
              helperText={errors.passwordConfirmation?.message}
            />
            <Button variant='contained' onClick={handleSubmit(submitFunction)}>
              SignUp
            </Button>
          </form>
        </Paper>
      </Box>
      <Footer></Footer>
    </>
  );
}
