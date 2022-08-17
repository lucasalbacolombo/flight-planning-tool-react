import ResponsiveAppBar from '../../components/HomeNavbar';
import { CarouselHome } from '../../components/Carousel';
import Footer from '../../components/Footer';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Grid from '@mui/material/Grid';
import style from './style.module.css';

export function Home() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <CarouselHome></CarouselHome>

      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='center'
        sx={{
          height: '60vh',
          backgroundColor: '#F1F5F8',
        }}
        style={{ width: '100%' }}
        className={style.query}
      >
        <Grid item xs={3} className={style.grid1}>
          <FlightTakeoffIcon sx={{ fontSize: 220 }} className={style.icon} />
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'justify' }} className={style.grid2}>
          All meteorological information pilots need to plan a safe flight using
          weather information from the most reliable sources, such as the
          Brazilian Air Force.
        </Grid>
      </Grid>

      <Footer></Footer>
    </>
  );
}
