import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Grid from '@mui/material/Grid';
import EditNavbar from '../../components/EditNavbar';
import { Paper } from '@mui/material';

export function NewFlight() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: '',
    eobt: '',
    departure: '',
    arrival: '',
    alternative: '',
    distance: '',
    flightTime: '',
    aircraft: [],
  });

  const [aircraft, setAircraft] = useState();

  const [loading, setLoading] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    async function fetchAircrafts() {
      try {
        const response = await api.get('/aircraft/aircrafts');

        setAircraft(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAircrafts();
  }, []);

  async function submitForm() {
    try {
      await api.post('/flight/create-flight', form);

      navigate('/user-home');
    } catch (error) {
      console.log(error);
    }
  }

  return loading ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <EditNavbar />
      <Paper>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { mt: 1, width: '100%' },
          }}
          onSubmit={handleSubmit}
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
              id='date'
              name='date'
              value={form.date}
              onChange={handleChange}
              label='Date'
              variant='outlined'
              sx={{ marginBottom: '20px', marginTop: '20px', width: '40%' }}
              className={style.input}
            />
            <TextField
              {...register('eobt', {
                required: 'Required',
                pattern: {
                  value: /^([0-9]{4})$/,
                  message: 'EOBT should have 4 numeric digits (e.g. 2230)',
                },
              })}
              id='eobt'
              name='eobt'
              value={form.eobt}
              onChange={handleChange}
              label='EOBT'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.eobt)}
              helperText={errors.eobt?.message}
            />
            <TextField
              {...register('departure', {
                required: 'Required',
                pattern: {
                  value: /^[A-Z]{4}$/,
                  message:
                    'Departure should have 4 uppercase letters (e.g. SBSP)',
                },
              })}
              id='departure'
              name='departure'
              value={form.departure}
              onChange={handleChange}
              label='Departure ICAO'
              variant='outlined'
              sx={{
                marginBottom: '20px',
                width: '40%',
                textTransform: 'uppercase',
              }}
              className={style.input}
              error={Boolean(errors.departure)}
              helperText={errors.departure?.message}
            />
            <TextField
              {...register('arrival', {
                required: 'Required',
                pattern: {
                  value: /^[A-Z]{4}$/,
                  message:
                    'Arrival should have 4 uppercase letters (e.g. SBSP)',
                },
              })}
              id='arrival'
              name='arrival'
              value={form.arrival}
              onChange={handleChange}
              label='Arrival ICAO'
              variant='outlined'
              sx={{
                marginBottom: '20px',
                width: '40%',
                textTransform: 'uppercase',
              }}
              className={style.input}
              error={Boolean(errors.arrival)}
              helperText={errors.arrival?.message}
            />
            <TextField
              {...register('alternative', {
                required: 'Required',
                pattern: {
                  value: /^[A-Z]{4}$/,
                  message:
                    'Alternative should have 4 uppercase letters (e.g. SBSP)',
                },
              })}
              id='alternative'
              name='alternative'
              value={form.alternative}
              onChange={handleChange}
              label='Alternative ICAO'
              variant='outlined'
              sx={{
                marginBottom: '20px',
                width: '40%',
                textTransform: 'uppercase',
              }}
              className={style.input}
              error={Boolean(errors.alternative)}
              helperText={errors.alternative?.message}
            />
            <TextField
              {...register('distance', {
                required: 'Required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please, insert only numbers',
                },
              })}
              id='distance'
              name='distance'
              value={form.distance}
              onChange={handleChange}
              label='Distance (Nautical Miles)'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.distance)}
              helperText={errors.distance?.message}
            />
            <TextField
              {...register('flightTime', {
                required: 'Required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please, insert only numbers',
                },
              })}
              id='flightTime'
              name='flightTime'
              value={form.flightTime}
              onChange={handleChange}
              label='Flight Time (Minutes)'
              variant='outlined'
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.flightTime)}
              helperText={errors.flightTime?.message}
            />
            <TextField
              {...register('aircraft', {
                required: 'Required',
              })}
              id='aircraft'
              name='aircraft'
              select
              label='Aircraft'
              value={form.aircraft}
              onChange={handleChange}
              sx={{ marginBottom: '20px', width: '40%' }}
              className={style.input}
              error={Boolean(errors.aircraft)}
              helperText={errors.aircraft?.message}
            >
              {aircraft.map((currentAircraft) => {
                return (
                  <MenuItem
                    key={currentAircraft._id}
                    value={currentAircraft._id}
                    onChange={handleChange}
                  >
                    {currentAircraft.registration}
                  </MenuItem>
                );
              })}
            </TextField>
            <Button
              sx={{ marginBottom: '30px' }}
              variant='contained'
              onClick={handleSubmit(submitForm)}
            >
              Create Flight <FlightTakeoffIcon />
            </Button>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
