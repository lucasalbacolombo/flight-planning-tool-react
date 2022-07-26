import { useState, useContext } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import style from './style.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import { Paper } from '@mui/material';
import AircraftNavbar from '../../components/AircraftsNavbar';

export function EditAircraft() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    registration: '',
    make: '',
    model: '',
    icaoCode: '',
    fuelPerHour: '',
    fuelCapacity: '',
  });

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
    async function fetchAircraft() {
      try {
        const response = await api.get(`aircraft/${id}`);

        setForm(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAircraft(id);
  }, [id, setLoading]);

  async function submitForm() {
    try {
      await api.patch(`/aircraft/edit/${id}`, form);

      navigate('/my-aircrafts');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/aircraft/delete/${id}`);
      navigate('/my-aircrafts');
    } catch (error) {
      console.log(error);
    }
  }

  return loading ? (
    <Box sx={{ width: '90%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <AircraftNavbar />
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
              {...register('registration', {})}
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
              {...register('make', {})}
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
              {...register('model', {})}
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
              {...register('icaoCode', {})}
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
              sx={{ marginBottom: '15px', width: '20%' }}
              className={style.editBtn}
            >
              Update Aircraft
            </Button>
            <Button
              variant='outlined'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ marginBottom: '30px', width: '20%' }}
              className={style.editBtn}
            >
              DELETE Aircraft
            </Button>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
