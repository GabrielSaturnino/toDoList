import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Meteor } from 'meteor/meteor';
import Box from '@mui/material/Box';
import { MyAppBarStyle } from './style';

export const AppBar = (props) => {

    return (
        <Box sx={MyAppBarStyle.mainBox}>
            <Container sx={MyAppBarStyle.container}>
                <Typography variant='h1' sx={MyAppBarStyle.titulo}>{props.titulo}</Typography>

                <Box sx={MyAppBarStyle.boxIcons} onClick={() => Meteor.logout()}>
                    <AccountCircleIcon />
                    <ArrowDropDownIcon />
                </Box>

            </Container>
        </Box>
    );
}