import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FlightIcon from '@mui/icons-material/Flight';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import EditNavbar from '../../components/EditNavbar';

export function NewAircraft() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    registration: '',
    make: '',
    model: '',
    icaocode: '',
    fuelPerHour: '',
    fuelCapacity: '',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitForm() {
    try {
      await api.post('/aircraft/create-aircraft', form);

      navigate('/user-home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <EditNavbar />
      <Paper sx={{ height: '100vh' }}>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { mt: 1, width: '100%' },
          }}
        >
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            sx={{ width: '100%' }}
            className={style.grid}
          >
            <TextField
              {...register('registration', {
                required: 'Required',
              })}
              id='registration'
              name='registration'
              value={form.registration}
              onChange={handleChange}
              label='Registration (e.g. PR-ABC)'
              variant='outlined'
              sx={{ marginBottom: '20px', marginTop: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.registration)}
              helperText={errors.registration?.message}
            />
            <TextField
              {...register('make', {
                required: 'Required',
              })}
              id='make'
              name='make'
              value={form.make}
              onChange={handleChange}
              label='Make'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.make)}
              helperText={errors.make?.message}
            />
            <TextField
              {...register('model', {
                required: 'Required',
              })}
              id='model'
              name='model'
              value={form.model}
              onChange={handleChange}
              label='Model'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.model)}
              helperText={errors.model?.message}
            />
            <TextField
              {...register('icaoCode', {
                required: 'Required',
              })}
              id='icaoCode'
              name='icaoCode'
              value={form.icaoCode}
              onChange={handleChange}
              label='ICAO Code'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.icaoCode)}
              helperText={errors.icaoCode?.message}
            />
            <TextField
              {...register('fuelPerHour', {
                required: 'Required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please, insert only numbers',
                },
              })}
              id='fuelPerHour'
              name='fuelPerHour'
              value={form.fuelPerHour}
              onChange={handleChange}
              label='Liters Per Hour'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.fuelPerHour)}
              helperText={errors.fuelPerHour?.message}
            />
            <TextField
              {...register('fuelCapacity', {
                required: 'Required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please, insert only numbers',
                },
              })}
              id='fuelCapacity'
              name='fuelCapacity'
              value={form.fuelCapacity}
              onChange={handleChange}
              label='Fuel Capacity (Liters)'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.fuelCapacity)}
              helperText={errors.fuelCapacity?.message}
            />
            <Button
              variant='contained'
              onClick={handleSubmit(submitForm)}
              sx={{ marginBottom: '30px' }}
            >
              Add Aircraft <FlightIcon />
            </Button>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
