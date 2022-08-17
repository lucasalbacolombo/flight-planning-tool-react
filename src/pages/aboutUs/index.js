import ResponsiveAppBar from '../../components/HomeNavbar';
import style from './style.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Profile from '../../images/profile.png';

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
            alignContent='center'
            className={style.flex}
          >
            <Grid item xs={12} sm={6} className={style.item1}>
              <h2>Lucas Alba Colombo</h2>
              <p>
                Full Stack Developer graduated from Ironhack's Web Developer
                Bootcamp. Passionate about technology, programming, and
                aviation.
              </p>
              <p>
                Airplane Commercial Pilot, certified flight instructor, and
                aviation safety specialist. Flying experience in single and
                twin-engine airplanes and flight instruction.
              </p>
              <div className={style.socialMedia}>
                <a href='https://www.linkedin.com/in/lucas-alba-colombo/'>
                  <LinkedInIcon sx={{ fontSize: 55, color: '#002344' }} />
                </a>
                <a href='https://github.com/lucasalbacolombo'>
                  <GitHubIcon sx={{ fontSize: 50, color: '#002344' }} />
                </a>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              spacing={2}
              direction='row'
              justifyContent='center'
              alignItems='center'
              className={style.item2}
            >
              <img src={Profile} alt='profile' className={style.img}></img>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
