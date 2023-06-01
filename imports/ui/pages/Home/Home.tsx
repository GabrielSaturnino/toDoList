import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { homeStyles } from './HomeStyle';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router'
import { PageLayout } from '../../layouts/PageLayout';

const Home = () => {

    const [redirect, setRedirect] = useState(false);
    const currentUser = Meteor.user();
    console.log(currentUser?.username);

    return (
        <>
            <PageLayout title={'ToDo List'} actions={[]}>
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
                    {redirect && <Navigate to={'/meuModulo'} />}
                </Container>
            </PageLayout>
        </>
    )
};

export default Home;
