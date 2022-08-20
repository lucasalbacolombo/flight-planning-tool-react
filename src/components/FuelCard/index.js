import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function FuelCard(props) {
  return (
    <Grid item xs={11}>
      <Card
        sx={{
          backgroundColor: 'rgb(238, 241, 253)',
          marginBottom: '20px',
        }}
      >
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Fuel Information
          </Typography>
          {props.flight.aircraft.map((currentAircraft) => {
            return (
              <div key={currentAircraft._id}>
                <p>
                  {`Total Fuel Available: ${currentAircraft.fuelCapacity} liters`}
                </p>
                <p>
                  Fuel Required:{' '}
                  {(
                    currentAircraft.fuelPerHour *
                    (props.flight.flightTime / 60)
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
