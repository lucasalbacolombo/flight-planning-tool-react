import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export function AircraftsCard({ currentAircraft }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: '10px',
      }}
      key={currentAircraft._id}
    >
      <CardContent>
        <Typography sx={{ minWidth: 275, fontWeight: 'bold', mb: 1.5 }}>
          {currentAircraft.registration}
        </Typography>
        <Typography>Make: {currentAircraft.make}</Typography>
        <Typography variant='body2'>Model: {currentAircraft.model}</Typography>
        <Typography variant='body2'>
          ICAO Code: {currentAircraft.icaoCode}
        </Typography>
        <Typography variant='body2'>
          {`Fuel Capacity: ${currentAircraft.fuelCapacity} Liters`}
        </Typography>
        <Typography variant='body2'>
          {`Fuel Consumption: ${currentAircraft.fuelPerHour} L/H`}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/edit-aircraft/${currentAircraft._id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Button size='small'>Edit Aircraft</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
