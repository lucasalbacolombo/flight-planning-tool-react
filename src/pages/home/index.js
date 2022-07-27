import ResponsiveAppBar from '../../components/navbar';
import { CarouselHome } from '../../components/carousel/index';
import Footer from '../../components/footer';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Grid from '@mui/material/Grid';

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
					height: 450,
					backgroundColor: '#F1F5F8',
				}}
				style={{ width: '100%' }}
			>
				<Grid item xs={3}>
					<FlightTakeoffIcon sx={{ fontSize: 220 }} />
				</Grid>
				<Grid item xs={6} sx={{ textAlign: 'justify' }}>
					All meteorological information pilots need to plan a safe flight using
					weather information from the most reliable sources, such as the
					Brazilian Air Force and Windy.
				</Grid>
			</Grid>

			<Footer></Footer>
		</>
	);
}
