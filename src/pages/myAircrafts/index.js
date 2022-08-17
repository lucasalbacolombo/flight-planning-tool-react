import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../api/api';
import { Link } from 'react-router-dom';
import AircraftNavbar from '../../components/AircraftsNavbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function MyAircrafts() {
  const [aircrafts, setAircrafts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAircrafts() {
      try {
        const response = await api.get('/aircraft/aircrafts');
        setAircrafts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAircrafts();
  }, []);

  return loading ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <AircraftNavbar />
      <h3 style={{ margin: '15px' }}>My Aircrafts</h3>
      <Grid
        container
        spacing={1}
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        {aircrafts.map((currentAircraft) => {
          return (
            <Grid item xs={12} sm={6} key={currentAircraft._id}>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: 'rgb(242, 244, 250)',
                  margin: '10px',
                }}
                key={currentAircraft._id}
              >
                <CardContent>
                  <Typography
                    sx={{ minWidth: 275, fontWeight: 'bold', mb: 1.5 }}
                  >
                    {currentAircraft.registration}
                  </Typography>
                  <Typography>Make: {currentAircraft.make}</Typography>
                  <Typography variant='body2'>
                    Model: {currentAircraft.model}
                  </Typography>
                  <Typography variant='body2'>
                    ICAO Code: {currentAircraft.icaoCode}
                  </Typography>
                  <Typography variant='body2'>
                    {`Fuel Capacity: ${currentAircraft.fuelCapacity} Liters`}
                  </Typography>
                  <Typography variant='body2'>
                    {`Fuel Consumption: ${currentAircraft.fuelPerHour} L/H`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/edit-aircraft/${currentAircraft._id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Button size='small'>Edit Aircraft</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
