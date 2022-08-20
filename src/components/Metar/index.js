import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function Metar(props) {
  return (
    <Grid item xs={11}>
      <Card sx={{ backgroundColor: 'rgb(238, 241, 253)' }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            METAR
          </Typography>
          <div>
            {props.metar
              .filter((currentMetar) => {
                return currentMetar.id_localidade === props.flight.departure;
              })
              .map((metar) => {
                return (
                  <div key={metar.id_localidade}>
                    <h4>Departure</h4>
                    <p>{metar.mens}</p>
                  </div>
                );
              })}
          </div>
          <div>
            {props.metar
              .filter((currentMetar) => {
                return currentMetar.id_localidade === props.flight.arrival;
              })
              .map((metar) => {
                return (
                  <div key={metar.id_localidade}>
                    <h4>Arrival</h4>
                    <p>{metar.mens}</p>
                  </div>
                );
              })}
          </div>
          <div>
            {props.metar
              .filter((currentMetar) => {
                return currentMetar.id_localidade === props.flight.alternative;
              })
              .map((metar) => {
                return (
                  <div key={metar.id_localidade}>
                    <h4>Alternative</h4>
                    <p>{metar.mens}</p>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
