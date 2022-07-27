import ResponsiveAppBar from '../../components/navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Footer from '../../components/footer/index';

export function Solution() {
	return (
		<>
			<ResponsiveAppBar />

			<Box
				sx={{
					flexGrow: 1,
					margin: '20px',
					height: '90vh',
				}}
			>
				<Grid container spacing={4}>
					<Grid item xs={5} sx={{ textAlign: 'justify' }}>
						<h2>Pilot's Flight Planning Tool</h2>
						<p>
							Online Flight planning app designed to make life easier for pilots
							who fly in Brazilian airspace. The ultimate online and mobile
							flight planner for professional and student pilots. Fast, easy to
							use, and easy to learn software that provides all meteorological
							information pilots need to plan a safe flight using weather
							information from the most reliable sources, such as the Brazilian
							Air Force and Windy.
						</p>
						<p>Check the functionalities available in the app:</p>
						<ul>
							<li>Flight Record System</li>
							<li>Airplane Record System</li>
							<li>Detailed Airport Information</li>
							<li>METAR weather data</li>
							<li>TAF weather data</li>
							<li>Fuel consumption information</li>
						</ul>
					</Grid>
					<Grid item xs={5}></Grid>
				</Grid>
			</Box>
			<Footer></Footer>
		</>
	);
}
