import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import axios from 'axios';
import { Airports } from '../../components/Airports';
import { Metar } from '../../components/Metar';
import { Taf } from '../../components/Taf';
import { FuelCard } from '../../components/FuelCard';
import GoogleMaps from '../../components/GoogleMaps';
import EditNavbar from '../../components/EditNavbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function FlightStatus() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [flight, setFlight] = useState([]);

  const [airport, setAirport] = useState([]);

  const [metar, setMetar] = useState([]);

  const [taf, setTaf] = useState([]);

  useEffect(() => {
    async function fetchFlight() {
      try {
        const response = await api.get(`flight/${id}`);

        setFlight(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFlight();
  }, [id]);

  useEffect(() => {
    async function fetchAirport() {
      try {
        const response = await axios.get(
          `https://api-redemet.decea.mil.br/aerodromos/?api_key=${process.env.REACT_APP_REDEMET}&pais=Brasil`
        );

        setAirport(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAirport();
  }, []);

  useEffect(() => {
    async function fetchMetar() {
      try {
        const response = await axios.get(
          `https://api-redemet.decea.mil.br/mensagens/metar/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
        );

        setMetar(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMetar();
  }, [flight]);

  useEffect(() => {
    async function fetchTaf() {
      try {
        const response = await axios.get(
          `https://api-redemet.decea.mil.br/mensagens/taf/${flight.departure},${flight.arrival},${flight.alternative}?api_key=${process.env.REACT_APP_REDEMET}`
        );

        setTaf(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTaf();
  }, [flight]);

  const departurePosition = {
    lat: Number(
      airport
        .filter((currentAirport) => {
          return currentAirport.cod === flight.departure;
        })
        .map((filteredAirport) => {
          return filteredAirport.lat_dec;
        })
    ),
    lng: Number(
      airport
        .filter((currentAirport) => {
          return currentAirport.cod === flight.departure;
        })
        .map((filteredAirport) => {
          return filteredAirport.lon_dec;
        })
    ),
  };

  const arrivalPosition = {
    lat: Number(
      airport
        .filter((currentAirport) => {
          return currentAirport.cod === flight.arrival;
        })
        .map((filteredAirport) => {
          return filteredAirport.lat_dec;
        })
    ),
    lng: Number(
      airport
        .filter((currentAirport) => {
          return currentAirport.cod === flight.arrival;
        })
        .map((filteredAirport) => {
          return filteredAirport.lon_dec;
        })
    ),
  };

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
          flight={flight}
        />
        <Airports flight={flight} airport={airport} />
        <Metar flight={flight} metar={metar} />
        <Taf flight={flight} taf={taf} />
        <FuelCard flight={flight} />
      </Grid>
    </>
  );
}
