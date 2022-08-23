import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export function FuelInformation({ flight }) {
  return (
    <Grid item xs={11}>
      <Card
        sx={{
          marginBottom: '20px',
        }}
      >
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Fuel Information
          </Typography>
          {flight.aircraft?.map((currentAircraft) => {
            return (
              <div key={currentAircraft._id}>
                <p>
                  {`Total Fuel Available: ${currentAircraft.fuelCapacity} liters`}
                </p>
                <p>
                  Fuel Required:{' '}
                  {(
                    currentAircraft.fuelPerHour *
                    (flight.flightTime / 60)
                  ).toFixed(2)}{' '}
                  liters
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Grid>
  );
}
