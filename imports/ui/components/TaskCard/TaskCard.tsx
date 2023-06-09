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
import { getUser } from '/imports/libs/getUser';

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
    const user = getUser();

    const [completa, setCompleta] = useState(false);
    const [opt, setOpt] = useState('');
    const [ver, setVer] = useState('');

    const handleCompleta = () => {
        setCompleta(!completa);

        const newDoc = doc.complete === true ? false : true;
        doc.complete = newDoc;
        console.log(doc.complete);

        toDosApi.update(doc, (e, r) => {
            console.log(e, r);
        })
    }

    if (opt === 'Excluir') {
        if (doc.createdby === user._id) toDosApi.remove(doc);
        else alert('Somente o criador da tarefa pode deleta-la');
    }

    if (opt === 'Editar') {
        if (doc.createdby !== user._id) {
            alert('Somente o criador da tarefa pode edita-la');
            setOpt('');
        }
    }

    // Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
                            <Box sx={taskCardStyle.boxTaskCompleta}>{doc.complete ? <DoneIcon color='primary' /> : ''}</Box>
                        </Box>
                    </Box>

                    <Box sx={taskCardStyle.boxContainerColum} onClick={() => setVer(doc._id)}>
                        {doc.complete
                            ?
                            <Typography variant='h1' sx={taskCardStyle.tituloTaskCompleta}>{doc.title}</Typography>
                            :
                            <Typography variant='h1' sx={taskCardStyle.tituloTask}>{doc.title}</Typography>
                        }

                        <Typography sx={taskCardStyle.criadoPor} variant='caption'>Criada por: <span style={{ borderBottom: '2px solid gray', paddingBottom: '1px' }}>{user._id === doc.createdby ? 'Você' : doc.userName}</span> </Typography>
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