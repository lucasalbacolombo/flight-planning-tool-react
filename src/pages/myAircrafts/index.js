import { useState, useContext, useEffect } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { api } from '../../api/api';
import AircraftNavbar from '../../components/AircraftsNavbar';
import { AircraftsCard } from '../../components/AircraftsCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Paper } from '@mui/material';

export function MyAircrafts() {
  const [aircrafts, setAircrafts] = useState([]);

  const { loading, setLoading } = useContext(LoadingContext);

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
  }, [setLoading]);

  return loading ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <AircraftNavbar />
      <Paper sx={{ height: '100vh' }}>
        <h3 style={{ marginLeft: '15px', paddingTop: '15px' }}>My Aircrafts</h3>
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
                <AircraftsCard currentAircraft={currentAircraft} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}
