import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export function FlightsCard({ currentFlight }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: '10px',
      }}
    >
      <CardContent>
        <Typography sx={{ minWidth: 275 }}>
          <strong>Date</strong>: {currentFlight.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <strong>EOBT</strong>: {currentFlight.eobt}
        </Typography>
        <Typography variant='body2'>DEP: {currentFlight.departure}</Typography>
        <Typography variant='body2'>ARR: {currentFlight.arrival}</Typography>
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
  );
}
