import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { homeStyles } from './HomeStyle';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router'

const Home = () => {
    const [redirect, setRedirect] = useState(false);
    const currentUser = Meteor.user();
    return (
        <>
            <Container>
                <Typography sx={homeStyles.title} variant="h1" gutterBottom>
                    Olá, {currentUser?.username}
                </Typography>

                <Typography sx={homeStyles.desc} variant="caption" display="block" gutterBottom>
                    Seus projetos muito mais organizados. Veja as taefas adicionadas por seu time, por você e para você!
                </Typography>

                <Typography sx={homeStyles.subTitle} variant="h2" gutterBottom>
                    Adicionadas Recentemente
                </Typography>

                <Box sx={homeStyles.taskContainer}>
                    Aqui vão as tasks
                </Box>

                <Box sx={homeStyles.buttonFlex}>
                    <Button sx={homeStyles.buttonToTask} variant={'contained'} color={'primary'}
                        onClick={() => setRedirect(true)}>Ir para Tarefas &gt;&gt;</Button>
                </Box>
                {redirect && <Navigate to={'/toDos'} />}
            </Container>
        </>
    );
}

export default Home;
