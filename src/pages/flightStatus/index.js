// import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import axios from 'axios';
import GoogleMaps from '../../components/GoogleMaps';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import EditNavbar from '../../components/EditNavbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
// import style from './style.module.css';

// const containerStyle = {
//   width: '100%',
//   height: '60vh',
// };

// const mapZoom = 7;

export function FlightStatus() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  // const [map, setMap] = React.useState(null);

  const [flightData, setFlightData] = useState({
    flight: {},
    airport: [],
    metar: [],
    taf: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: flight } = await api.get(`flight/${id}`);
        const {
          data: { data: airport },
        } = await axios.get(
          `https://api-redemet.decea.mil.br/aerodromos/?api_key=${process.env.REACT_APP_REDEMET}&pais=Brasil`
        );
        const {
          data: {
            data: { data: metar },
          },
        } = await axios.get(
          `https://api-redemet.decea.mil.br/mensagens/metar/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
        );

        const {
          data: {
            data: { data: taf },
          },
        } = await axios.get(
          `https://api-redemet.decea.mil.br/mensagens/taf/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
        );

        setFlightData({ flight, airport, metar, taf });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  // });

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  const departurePosition = {
    lat: Number(
      flightData.airport
        .filter((currentAirport) => {
          return currentAirport.cod === flightData.flight.departure;
        })
        .map((filteredAirport) => {
          return filteredAirport.lat_dec;
        })
    ),
    lng: Number(
      flightData.airport
        .filter((currentAirport) => {
          return currentAirport.cod === flightData.flight.departure;
        })
        .map((filteredAirport) => {
          return filteredAirport.lon_dec;
        })
    ),
  };

  const arrivalPosition = {
    lat: Number(
      flightData.airport
        .filter((currentAirport) => {
          return currentAirport.cod === flightData.flight.arrival;
        })
        .map((filteredAirport) => {
          return filteredAirport.lat_dec;
        })
    ),
    lng: Number(
      flightData.airport
        .filter((currentAirport) => {
          return currentAirport.cod === flightData.flight.arrival;
        })
        .map((filteredAirport) => {
          return filteredAirport.lon_dec;
        })
    ),
  };

  // const center = useMemo(() => ({ lat: -15.8625, lng: -47.9125 }), []);

  return loading ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <>
      <EditNavbar />
      <h3 style={{ margin: '20px' }}>Flight Status</h3>

      <Grid
        container
        spacing={2}
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <GoogleMaps
          departurePosition={departurePosition}
          arrivalPosition={arrivalPosition}
        />
        {/* <Grid item xs={11} style={{ marginBottom: '20px' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={departurePosition}
            zoom={mapZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
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
        </Grid> */}
        <Grid item xs={11}>
          <Card sx={{ backgroundColor: 'rgb(238, 241, 253)' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                <h4>Airport Information</h4>
              </Typography>
              <div>
                {flightData.airport
                  .filter((currentAirport) => {
                    return currentAirport.cod === flightData.flight.departure;
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
                {flightData.airport
                  .filter((currentAirport) => {
                    return currentAirport.cod === flightData.flight.arrival;
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

                {flightData.airport
                  .filter((currentAirport) => {
                    return currentAirport.cod === flightData.flight.alternative;
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
        <Grid item xs={11}>
          <Card sx={{ backgroundColor: 'rgb(238, 241, 253)' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                METAR
              </Typography>
              <div>
                {flightData.metar
                  .filter((currentMetar) => {
                    return (
                      currentMetar.id_localidade === flightData.flight.departure
                    );
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
                {flightData.metar
                  .filter((currentMetar) => {
                    return (
                      currentMetar.id_localidade === flightData.flight.arrival
                    );
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
                {flightData.metar
                  .filter((currentMetar) => {
                    return (
                      currentMetar.id_localidade ===
                      flightData.flight.alternative
                    );
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
        <Grid item xs={11}>
          <Card sx={{ backgroundColor: 'rgb(238, 241, 253)' }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                TAF
              </Typography>
              <div>
                {flightData.taf
                  .filter((currentTaf) => {
                    return (
                      currentTaf.id_localidade === flightData.flight.departure
                    );
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
                {flightData.taf
                  .filter((currentTaf) => {
                    return (
                      currentTaf.id_localidade === flightData.flight.arrival
                    );
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
                {flightData.taf
                  .filter((currentTaf) => {
                    return (
                      currentTaf.id_localidade === flightData.flight.alternative
                    );
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
              {flightData.flight.aircraft.map((currentAircraft) => {
                return (
                  <div key={currentAircraft.id}>
                    <p>
                      {`Total Fuel Available: ${currentAircraft.fuelCapacity} liters`}
                    </p>
                    <p>
                      Fuel Required:{' '}
                      {(
                        currentAircraft.fuelPerHour *
                        (flightData.flight.flightTime / 60)
                      ).toFixed(2)}{' '}
                      liters
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
