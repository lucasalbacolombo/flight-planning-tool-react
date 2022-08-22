import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../api/api';
import style from './style.module.css';
import ResponsiveAppBar from '../../components/HomeNavbar';
import Footer from '../../components/Footer';
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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitForm() {
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
          <form className={style.form}>
            <ExploreIcon
              sx={{ fontSize: 60, marginBottom: '15px', width: '100%' }}
            />
            <TextField
              {...register('email', {
                required: 'Required',
              })}
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              label='E-mail'
              sx={{ width: '80%', marginBottom: '15px' }}
              variant='outlined'
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('password', {
                required: 'Required',
              })}
              id='password'
              type='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              label='Password'
              sx={{ width: '80%', marginBottom: '15px' }}
              variant='outlined'
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <Button variant='contained' onClick={handleSubmit(submitForm)}>
              Login
            </Button>
          </form>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}
