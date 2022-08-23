import { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { api } from '../../api/api';
import ResponsiveUserBar from '../../components/UserNavbar';
import { FlightsCard } from '../../components/FlightsCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Paper } from '@mui/material';

export function UserHome() {
  const [flights, setFlights] = useState([]);

  const [user, setUser] = useState([]);

  const { loading, setLoading } = useContext(LoadingContext);

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
  }, [setLoading]);

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
  }, [setLoading]);

  function userInformation() {
    if (flights.length === 0) {
      return (
        <>
          <h6 style={{ marginLeft: '30px', marginTop: '25px' }}>
            You don't have any flight logged yet
          </h6>
          <p style={{ marginLeft: '30px', marginTop: '25px' }}>
            Start by adding a new aircraft, then you are ready to log a new
            flight!
          </p>
        </>
      );
    } else {
      return (
        <h4 style={{ marginLeft: '15px', marginTop: '25px' }}>My Flights</h4>
      );
    }
  }

  return loading ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <Paper sx={{ height: '100vh' }}>
      <ResponsiveUserBar />
      <h3
        style={{ marginLeft: '15px', marginTop: '25px' }}
      >{`Hi, ${user.firstName} ${user.lastName}!`}</h3>
      {userInformation()}
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
                <FlightsCard currentFlight={currentFlight} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Paper>
  );
}
