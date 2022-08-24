import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Grid from '@mui/material/Grid';
import style from './style.module.css';

const containerStyle = {
  width: '100%',
  height: '60vh',
};

function GoogleMaps({ departurePosition, arrivalPosition }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const mapZoom = 6;

  return isLoaded ? (
    <Grid item xs={11} style={{ marginBottom: '20px' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={departurePosition}
        zoom={mapZoom}
        mapTypeId='terrain'
      >
        <Marker
          position={departurePosition}
          options={{
            label: { text: 'A', className: style.marker },
          }}
        />
        <Marker
          position={arrivalPosition}
          options={{
            label: { text: 'B', className: style.marker },
          }}
        />
      </GoogleMap>
    </Grid>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMaps);
