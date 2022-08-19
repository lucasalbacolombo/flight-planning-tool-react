import { useState, useContext, useEffect } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import EditNavbar from '../../components/EditNavbar';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

export function EditFlight() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    date: '',
    eobt: '',
    departure: '',
    arrival: '',
    alternative: '',
    distance: '',
    flightTime: '',
    aircraft: '',
  });

  const [aircraft, setAircraft] = useState([]);

  const { loading, setLoading } = useContext(LoadingContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    async function fetchFlight() {
      try {
        const response = await api.get(`flight/${id}`);

        setForm(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFlight(id);
  }, []);

  useEffect(() => {
    async function fetchAircraft() {
      try {
        const response = await api.get('/aircraft/aircrafts');

        setAircraft(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAircraft();
  }, []);

  async function handleDelete() {
    try {
      await api.delete(`/flight/delete/${id}`);
      navigate('/user-home');
    } catch (error) {
      console.log(error);
    }
  }

  async function submitForm() {
    try {
      await api.patch(`/flight/edit/${id}`, form);

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
      <Box
        component='form'
        sx={{ marginTop: '15px', '& > :not(style)': { mt: 1, width: '100%' } }}
      >
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{ width: '100%' }}
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
                message: 'Departure should have 4 letters (e.g. SBSP)',
              },
            })}
            id='departure'
            name='departure'
            value={form.departure.toUpperCase()}
            onChange={handleChange}
            label='Departure ICAO'
            variant='outlined'
            sx={{ marginBottom: '20px', width: '40%' }}
            className={style.input}
            error={Boolean(errors.departure)}
            helperText={errors.departure?.message}
          />
          <TextField
            {...register('arrival', {
              required: 'Required',
              pattern: {
                value: /^[A-Z]{4}$/,
                message: 'Arrival should have 4 letters (e.g. SBSP)',
              },
            })}
            id='arrival'
            name='arrival'
            value={form.arrival.toUpperCase()}
            onChange={handleChange}
            label='Arrival ICAO'
            variant='outlined'
            sx={{ marginBottom: '20px', width: '40%' }}
            className={style.input}
            error={Boolean(errors.arrival)}
            helperText={errors.arrival?.message}
          />
          <TextField
            {...register('alternative', {
              required: 'Required',
              pattern: {
                value: /^[A-Z]{4}$/,
                message: 'Alternative should have 4 letters (e.g. SBSP)',
              },
            })}
            id='alternative'
            name='alternative'
            value={form.alternative.toUpperCase()}
            onChange={handleChange}
            label='Alternative ICAO'
            variant='outlined'
            sx={{ marginBottom: '20px', width: '40%' }}
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
            id='aircraft'
            name='aircraft'
            select
            label='Aircraft'
            value={form.aircraft}
            onChange={handleChange}
            sx={{ marginBottom: '20px', width: '40%' }}
            className={style.input}
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
            variant='contained'
            onClick={handleSubmit(submitForm)}
            sx={{ marginBottom: '10px', width: '25%' }}
            className={style.editBtn}
          >
            Update Flight
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{ marginBottom: '30px', width: '25%' }}
            className={style.editBtn}
          >
            DELETE Flight
          </Button>
        </Grid>
      </Box>
    </>
  );
}
