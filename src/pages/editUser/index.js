import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitFunction() {
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
            <TextField
              id='firstName'
              name='firstName'
              value={form.firstName || ''}
              onChange={handleChange}
              label='Fist Name'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.firstName)}
            />
            <TextField
              id='lastName'
              name='lastName'
              value={form.lastName || ''}
              onChange={handleChange}
              label='Last Name'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
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
              value={form.email || ''}
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
              value={form.password || ''}
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
              value={form.passwordConfirmation || ''}
              onChange={handleChange}
              label='Confirm Password'
              variant='outlined'
              sx={{ width: '80%', marginBottom: '15px' }}
              error={Boolean(errors.passwordConfirmation)}
              helperText={errors.passwordConfirmation?.message}
            />
            <div>
              <Button
                variant='contained'
                onClick={handleSubmit(submitFunction)}
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
