import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, Menu } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { appTopMenuStyle } from './AppTopMenuStyle';
import Typography from '@mui/material/Typography';
import { NavigateFunction, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { string } from 'prop-types';
import { Navigate } from 'react-router'

export const AppTopMenu = (props: ILayoutProps) => {
	const { user, showDrawer, showWindow, theme, themeOptions } = props;

	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<Object | null>(null);
	const [voltar, setVoltar] = useState(false);
	const open = Boolean(anchorEl);

	const location = useLocation();
	console.log(location.pathname);

	const openPage = (url: string) => () => {
		handleClose();
		navigate(url);
	};

	const viewProfile = () => {
		handleClose();
		showDrawer && showDrawer({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
	};

	const viewProfileMobile = () => {
		handleClose();
		showWindow && showWindow({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
	};

	const handleMenu = (event: React.SyntheticEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		setVoltar(false);
	}, [voltar])

	const handleReturn = () => {
		setVoltar(true);
	}

	return (
		<>
			{voltar ? <Navigate to={'/'} /> : ''}
			{location.pathname === '/password-recovery'
				||
				location.pathname === '/signin'
				||
				location.pathname === '/signup' ?
				<></>
				:
				<Box sx={{ width: '100%', backgroundColor: '#d5d5d5' }}>
					<Container
						sx={appTopMenuStyle.estiloContainer}>

						{location.pathname === '/toDos' ?
							<Typography onClick={handleReturn} sx={appTopMenuStyle.titulo} variant='h1'>
								<ArrowBackIcon />ToDo List</Typography>
							:
							<Typography sx={appTopMenuStyle.titulo} variant='h1'>ToDo List</Typography>
						}
						<Box
							onClick={handleMenu}
							sx={appTopMenuStyle.containerAccountCircle}>
							<>
								<AccountCircle id="Perfil" name="Perfil" fontSize='large' />
								<ArrowDropDownIcon
									style={{
										color: theme.palette.primary.main,
										width: 17
									}}
								/>
							</>
						</Box>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl as Element}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={open}
							onClose={handleClose}>
							{!user || !user._id
								? [
									<MenuItem key={'signin'} onClick={openPage('/signin')}>
										Entrar
									</MenuItem>
								]
								: [
									<MenuItem key={'userprofile'} onClick={viewProfile}>
										{user.username || 'Editar'}
									</MenuItem>,
									<MenuItem key={'signout'} onClick={openPage('/signout')}>
										<ExitToAppIcon fontSize="small" /> Sair
									</MenuItem>
								]}
						</Menu>
					</Container>
				</Box>
			}
		</>
	);
};
