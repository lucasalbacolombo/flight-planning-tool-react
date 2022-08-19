import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import style from './style.module.css';

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const mapZoom = 7;

function GoogleMaps(props) {
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const center = useMemo(() => ({ lat: -15.8625, lng: -47.9125 }), []);

  return isLoaded ? (
    <Grid item xs={11} style={{ marginBottom: '20px' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.departurePosition}
        zoom={mapZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId='terrain'
      >
        <Marker
          position={props.departurePosition}
          options={{
            label: { text: 'A', className: style.marker },
          }}
        />
        <Marker
          position={props.arrivalPosition}
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
