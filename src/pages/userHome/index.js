import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../api/api';
import { Link } from 'react-router-dom';
import ResponsiveUserBar from '../../components/UserNavbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function UserHome() {
  const [flights, setFlights] = useState([]);

  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlights() {
      try {
        const response = await api.get('/flight/flights');
        setFlights(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFlights();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('/user/profile');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  function userRender() {
    if (flights.length === 0) {
      return (
        <>
          <h6 style={{ marginLeft: '10px', marginTop: '25px' }}>
            You don't have any flight logged yet
          </h6>
          <p style={{ marginLeft: '10px', marginTop: '25px' }}>
            Start by adding a new aircraft, then you are ready to log a new
            flight!
          </p>
        </>
      );
    } else {
      return (
        <h4 style={{ marginLeft: '10px', marginTop: '25px' }}>My Flights</h4>
      );
    }
  }

  console.log(flights);

  return loading ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <ResponsiveUserBar />
      <h3
        style={{ marginLeft: '10px', marginTop: '25px' }}
      >{`Hi, ${user.firstName} ${user.lastName}!`}</h3>
      {userRender()}
      <Box sx={{ flexGrow: 1 }} direction='row'>
        <Grid
          container
          spacing={2}
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          {flights.map((currentFlight) => {
            return (
              <Grid item xs={12} sm={6} key={currentFlight._id}>
                <Card
                  sx={{
                    minWidth: 275,
                    margin: '10px',
                    backgroundColor: 'rgb(242, 244, 250)',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ minWidth: 275 }}>
                      <strong>Date</strong>: {currentFlight.date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      <strong>EOBT</strong>: {currentFlight.eobt}
                    </Typography>
                    <Typography variant='body2'>
                      DEP: {currentFlight.departure}
                    </Typography>
                    <Typography variant='body2'>
                      ARR: {currentFlight.arrival}
                    </Typography>
                    <Typography variant='body2'>
                      ALT: {currentFlight.alternative}
                    </Typography>
                    <Typography variant='body2'>
                      {`DISTANCE: ${currentFlight.distance} NM`}
                    </Typography>
                    <Typography variant='body2'>
                      {`FLIGHT TIME: ${currentFlight.flightTime} minutes`}
                    </Typography>
                    {currentFlight.aircraft.map((currentAircraft) => {
                      return (
                        <Typography variant='body2' key={currentAircraft._id}>
                          AIRCRAFT: {currentAircraft.registration}
                        </Typography>
                      );
                    })}
                  </CardContent>
                  <CardActions>
                    <Link
                      to={`/flight-status/${currentFlight._id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <Button size='small'>Flight Status</Button>
                    </Link>
                    <Link
                      to={`/edit-flight/${currentFlight._id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <Button size='small'>Edit Flight</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
