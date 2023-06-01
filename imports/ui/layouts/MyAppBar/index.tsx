import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Meteor } from 'meteor/meteor';
import Box from '@mui/material/Box';
import { MyAppBarStyle } from './style';
import { Navigate } from 'react-router-dom';

export const AppBar = (props) => {
    const [retorno, setRetorno] = useState(false);

    const mudarRetorno = () => {
        setRetorno(true);
    }
    return (
        <>
            {retorno ? <Navigate to={`${props.redirectPage}`} /> : ''}
            <Box sx={MyAppBarStyle.mainBox}>
                <Container sx={MyAppBarStyle.container}>
                    <Typography variant='h1' sx={MyAppBarStyle.titulo}>{props.redirectPage ? <ArrowBackIcon onClick={mudarRetorno} /> : ''} {props.titulo}</Typography>

                    <Box sx={MyAppBarStyle.boxIcons} onClick={() => Meteor.logout()}>
                        <AccountCircleIcon />
                        <ArrowDropDownIcon />
                    </Box>

                </Container>
            </Box>
        </>
    );
}