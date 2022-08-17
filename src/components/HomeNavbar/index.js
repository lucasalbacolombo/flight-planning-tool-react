import * as React from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ExploreIcon from '@mui/icons-material/Explore';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='static' className={styles.navbar}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
						<ExploreIcon
							sx={{
								display: { xs: 'none', md: 'flex' },
								mr: 1,
								fontSize: '40px',
							}}
						/>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign='center'>
									<Link
										to={'/aboutus'}
										style={{ textDecoration: 'none', color: 'black' }}
									>
										ABOUT US
									</Link>
								</Typography>
							</MenuItem>
						</Menu>
					</Box>

					<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
						<ExploreIcon
							sx={{
								display: { xs: 'flex', md: 'none' },
								mr: 1,
								fontSize: '35px',
							}}
						/>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							<Link
								to={'/aboutus'}
								style={{ textDecoration: 'none', color: 'white' }}
							>
								ABOUT US
							</Link>
						</Button>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign='center'>{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
						<Button color='inherit'>Login</Button>
					</Link>
					<Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
						<Button color='inherit'>SIGNUP</Button>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
