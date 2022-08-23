import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function Metar({ metar, flight }) {
  return (
    <Grid item xs={11}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            METAR
          </Typography>
          <div>
            {metar
              .filter((currentMetar) => {
                return currentMetar.id_localidade === flight.departure;
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
            {metar
              .filter((currentMetar) => {
                return currentMetar.id_localidade === flight.arrival;
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
            {metar
              .filter((currentMetar) => {
                return currentMetar.id_localidade === flight.alternative;
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
