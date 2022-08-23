import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function Taf(props) {
  return (
    <Grid item xs={11}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            TAF
          </Typography>
          <div>
            {props.taf
              .filter((currentTaf) => {
                return currentTaf.id_localidade === props.flight.departure;
              })
              .map((taf) => {
                return (
                  <div key={taf.id_localidade}>
                    <h4>Departure</h4>
                    <p>{taf.mens}</p>
                  </div>
                );
              })}
          </div>
          <div>
            {props.taf
              .filter((currentTaf) => {
                return currentTaf.id_localidade === props.flight.arrival;
              })
              .map((taf) => {
                return (
                  <div key={taf.id_localidade}>
                    <h4>Arrival</h4>
                    <p>{taf.mens}</p>
                  </div>
                );
              })}
          </div>
          <div>
            {props.taf
              .filter((currentTaf) => {
                return currentTaf.id_localidade === props.flight.alternative;
              })
              .map((taf) => {
                return (
                  <div key={taf.id_localidade}>
                    <h4>Alternative</h4>
                    <p>{taf.mens}</p>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
