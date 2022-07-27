import ResponsiveAppBar from '../../components/navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function Solution() {
	const itemData = [
		{
			img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
			title: 'Bed',
		},
		{
			img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
			title: 'Books',
		},
		{
			img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
			title: 'Sink',
		},
		{
			img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
			title: 'Kitchen',
		},
		{
			img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
			title: 'Blinds',
		},
		{
			img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
			title: 'Chairs',
		},
		{
			img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
			title: 'Laptop',
		},
		{
			img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
			title: 'Doors',
		},
		{
			img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
			title: 'Coffee',
		},
		{
			img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
			title: 'Storage',
		},
		{
			img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
			title: 'Candle',
		},
		{
			img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
			title: 'Coffee table',
		},
	];

	return (
		<>
			<ResponsiveAppBar />
			<>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<h2>Pilot's Flight Planning Tool</h2>
							<p>
								Online Flight planning app designed to make life easier for
								pilots who fly in Brazilian airspace. The ultimate online and
								mobile flight planner for professional and student pilots. Fast,
								easy to use, and easy to learn software that provides all
								meteorological information pilots need to plan a safe flight
								using weather information from the most reliable sources, such
								as the Brazilian Air Force and Windy.
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
						<Grid item xs={6}>
							<Box sx={{ width: 600, height: 600, overflowY: 'scroll' }}>
								<ImageList variant='masonry' cols={3} gap={8}>
									{itemData.map((item) => (
										<ImageListItem key={item.img}>
											<img
												src={`${item.img}?w=248&fit=crop&auto=format`}
												srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
												alt={item.title}
												loading='lazy'
											/>
										</ImageListItem>
									))}
								</ImageList>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</>
		</>
	);
}
