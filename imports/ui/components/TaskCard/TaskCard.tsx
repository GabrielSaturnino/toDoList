import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toDosApi } from '../../../modules/toDos/api/toDosApi';
import { Navigate } from 'react-router-dom';
import { taskCardStyle } from './TaskCardStyle';
import { IToDos } from '../../../modules/toDos/api/toDosSch';

const options = [
    'Excluir',
    'Editar'
];

const ITEM_HEIGHT = 48;

interface ITaskCard {
    doc: IToDos;
}

export const TaskCard = (props: ITaskCard) => {
    const { doc } = props;


    const [completa, setCompleta] = useState(false);
    const [navigate, setNavigate] = useState(' ');
    const [opt, setOpt] = useState('');
    const [ver, setVer] = useState('');

    const handleCompleta = () => {
        setCompleta(!completa);
        console.log(doc.complete)
        toDosApi.update(doc, (e, r) => {
            console.log(e, r);
        })
    }

    if (opt === 'Excluir') {
        toDosApi.remove(doc);
    }

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {ver != '' && <Navigate to={'/toDos/view/' + ver} />}
            {opt === 'Editar' && <Navigate to={'/toDos/edit/' + doc._id} />}

            <Box sx={taskCardStyle.boxContainer}>
                <Box sx={taskCardStyle.boxMain} >
                    <Box onClick={handleCompleta}>
                        <Box sx={taskCardStyle.boxCheckBox}>
                            <Box sx={taskCardStyle.boxTaskCompleta}>{completa ? <DoneIcon color='primary' /> : ''}</Box>
                        </Box>
                    </Box>

                    <Box sx={taskCardStyle.boxContainerColum} onClick={() => setVer(doc._id)}>
                        {completa
                            ?
                            <Typography variant='h1' sx={taskCardStyle.tituloTaskCompleta}>{doc.title}</Typography>
                            :
                            <Typography variant='h1' sx={taskCardStyle.tituloTask}>{doc.title}</Typography>
                        }

                        <Typography sx={taskCardStyle.criadoPor} variant='caption'>Criada por: <span style={{ borderBottom: '2px solid gray', paddingBottom: '1px' }}>Você</span> </Typography>
                    </Box>
                </Box>
                <Box sx={taskCardStyle.boxMenu}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}

                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem
                                key={option}
                                selected={option === 'Edit'}
                                onClick={() => setOpt(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box >
        </>
    );
}