import ResponsiveAppBar from '../../components/navbar';
import style from './style.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Profile from '../../images/profile.png';
import Footer from '../../components/footer/index';

export function AboutUs() {
	return (
		<>
			<ResponsiveAppBar />
			<div className={style.flex}>
				<Box
					sx={{
						flexGrow: 1,
					}}
				>
					<Grid
						container
						spacing={2}
						direction='row'
						justifyContent='center'
						alignItems='center'
					>
						<Grid item xs={6}>
							<h2>Lucas Alba Colombo</h2>
							<p>
								Full Stack Developer graduated from Ironhack's Web Developer
								Bootcamp. Passionate about technology, programming, and
								aviation.
							</p>
							<p>
								Airplane Commercial Pilot, certified flight instructor, and
								aviation safety specialist with experience in light airplanes
								and flight instruction.
							</p>
							<div>
								<a href='https://www.linkedin.com/in/lucas-alba-colombo/'>
									<LinkedInIcon sx={{ fontSize: 55, color: 'black' }} />
								</a>
								<a href='https://github.com/lucasalbacolombo'>
									<GitHubIcon sx={{ fontSize: 50, color: 'black' }} />
								</a>
							</div>
						</Grid>
						<Grid
							item
							xs={6}
							container
							spacing={2}
							direction='row'
							justifyContent='center'
							alignItems='center'
						>
							<img src={Profile} alt='profile' className={style.img}></img>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Footer></Footer>
		</>
	);
}
