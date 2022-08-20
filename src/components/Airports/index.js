import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function Airports(props) {
  return (
    <Grid item xs={11}>
      <Card sx={{ backgroundColor: 'rgb(238, 241, 253)' }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            <h4>Airport Information</h4>
          </Typography>
          <div>
            {props.airport
              .filter((currentAirport) => {
                return currentAirport.cod === props.flight.departure;
              })
              .map((airport) => {
                return (
                  <div key={airport.id}>
                    <h5>Departure</h5>
                    <ul>
                      <li>Code: {airport.cod}</li>
                      <li>Name: {airport.nome}</li>
                      <li>City: {airport.cidade}</li>
                      <li>Elevation: {airport.altitude_pes}ft</li>
                      <li>
                        Coordinates:{' '}
                        {`${airport.lat_grau}°${airport.lat_min}'${airport.lat_sec}''${airport.lat_dir}   ${airport.lon_grau}°${airport.lon_min}'${airport.lon_sec}''${airport.lon_dir} `}
                      </li>
                    </ul>
                  </div>
                );
              })}
            {props.airport
              .filter((currentAirport) => {
                return currentAirport.cod === props.flight.arrival;
              })
              .map((airport) => {
                return (
                  <div key={airport.id}>
                    <h5>Arrival</h5>
                    <ul>
                      <li>Code: {airport.cod}</li>
                      <li>Name: {airport.nome}</li>
                      <li>City: {airport.cidade}</li>
                      <li>Elevation: {airport.altitude_pes}ft</li>
                      <li>
                        Coordinates:{' '}
                        {`${airport.lat_grau}°${airport.lat_min}'${airport.lat_sec}''${airport.lat_dir}   ${airport.lon_grau}°${airport.lon_min}'${airport.lon_sec}''${airport.lon_dir} `}
                      </li>
                    </ul>
                  </div>
                );
              })}

            {props.airport
              .filter((currentAirport) => {
                return currentAirport.cod === props.flight.alternative;
              })
              .map((airport) => {
                return (
                  <div key={airport.id}>
                    <h5>Alternative</h5>
                    <ul>
                      <li>Code: {airport.cod}</li>
                      <li>Name: {airport.nome}</li>
                      <li>City: {airport.cidade}</li>
                      <li>Elevation: {airport.altitude_pes}ft</li>
                      <li>
                        Coordinates:{' '}
                        {`${airport.lat_grau}°${airport.lat_min}'${airport.lat_sec}''${airport.lat_dir}   ${airport.lon_grau}°${airport.lon_min}'${airport.lon_sec}''${airport.lon_dir} `}
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
