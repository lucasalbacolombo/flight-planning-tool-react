import * as React from 'react';
import styles from './style.module.css';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ExploreIcon from '@mui/icons-material/Explore';

const Footer = () => {
	return (
		<AppBar position='static' className={styles.footer}>
			<Container maxWidth='xl'>
				<Grid
					container
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<span style={{ fontSize: '13px' }}>
						&copy; Copyright 2022 All rights reserved
					</span>
					<ExploreIcon sx={{ fontSize: 40 }}></ExploreIcon>
				</Grid>
			</Container>
		</AppBar>
	);
};
export default Footer;
