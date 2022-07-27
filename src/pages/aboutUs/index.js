import ResponsiveAppBar from '../../components/navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Profile from '../../images/profile.png';

export function AboutUs() {
	return (
		<>
			<ResponsiveAppBar />
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<h2>Lucas Alba Colombo</h2>
						<p>
							Full Stack Developer graduated from Ironhack's Web Developer
							Bootcamp. Passionate about technology, programming, and aviation.
							Airplane Commercial Pilot, certified flight instructor, and
							aviation safety specialist with experience in light airplanes and
							flight instruction.
						</p>
						<p>
							<a href='https://www.linkedin.com/in/lucas-alba-colombo/'>
								<LinkedInIcon />
							</a>
							<a href='https://github.com/lucasalbacolombo'>
								<GitHubIcon />
							</a>
						</p>
					</Grid>
					<Grid item xs={6}>
						<img src={Profile} alt='profile'></img>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
