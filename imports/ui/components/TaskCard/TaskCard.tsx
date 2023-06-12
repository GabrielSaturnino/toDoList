import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toDosApi } from '../../../modules/toDos/api/toDosApi';
import { taskCardStyle } from './TaskCardStyle';
import { IToDos } from '../../../modules/toDos/api/toDosSch';
import { getUser } from '/imports/libs/getUser';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { showNotification } from '../../GeneralComponents/ShowNotification';
import { RenderComPermissao } from '/imports/seguranca/ui/components/RenderComPermisao';
import { Recurso } from '/imports/modules/example/config/Recursos';

const ITEM_HEIGHT = 48;

interface ITaskCard {
    doc: IToDos;
    showModal: ({ url: string; modalOnClose: Boolean; style: Object; });
}

export const TaskCard = (props: ITaskCard) => {
    const { doc } = props;
    const showModal = props.showModal;
    const user = getUser();
    const id: string = doc._id;

    const [completa, setCompleta] = useState(false);

    const handleCompleta = () => {
        setCompleta(!completa);

        const newDoc = doc.complete === true ? false : true;
        doc.complete = newDoc;

        toDosApi.update(doc, (e, r) => {
            console.log(e, r);
        })
    }

    const handleRemove = () => {
        if (doc.createdby !== user._id) alert('Somente o criador da tarefa pode deleta-la');
        else {
            toDosApi.remove(doc, (e: IMeteorError) => {
                if (!e) {
                    showNotification &&
                        showNotification({
                            type: 'success',
                            title: 'Operação realizada!',
                            description: `A tarefa foi removida com sucesso!`
                        });
                } else {
                    console.log('Error:', e);
                    showNotification &&
                        showNotification({
                            type: 'warning',
                            title: 'Operação não realizada!',
                            description: `Erro ao realizar a operação: ${e.reason}`
                        });
                }
            });
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
            <Box sx={taskCardStyle.boxContainer}>
                <Box sx={taskCardStyle.boxMain} >
                    <Box onClick={handleCompleta}>
                        <Box sx={taskCardStyle.boxCheckBox}>
                            <Box sx={taskCardStyle.boxTaskCompleta}>{doc.complete ? <DoneIcon color='primary' /> : ''}</Box>
                        </Box>
                    </Box>

                    <RenderComPermissao recursos={[Recurso.EXAMPLE_VIEW]}>
                        <Box sx={taskCardStyle.boxContainerColum}
                            onClick={() => showModal && showModal({
                                url: `/toDos/view/${id}`,
                                modalOnClose: false,
                                style: {
                                    position: 'absolute' as 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    maxWidth: { xs: '100vw', sm: '727px', lg: '1000px' },
                                    bgcolor: 'background.paper',
                                    background: 'white',
                                    boxShadow: 24,

                                    maxHeight: { xs: '100vh', sm: 'fit-content' },
                                    borderRadius: { xs: '0', sm: '8px' }
                                },
                            })}>
                            {doc.complete
                                ?
                                <Typography variant='h1' sx={taskCardStyle.tituloTaskCompleta}>{doc.title}</Typography>
                                :
                                <Typography variant='h1' sx={taskCardStyle.tituloTask}>{doc.title}</Typography>
                            }

                            <Typography sx={taskCardStyle.criadoPor} variant='caption'>Criada por: <span style={{ borderBottom: '2px solid gray', paddingBottom: '1px' }}>{user._id === doc.createdby ? 'Você' : doc.userName}</span> </Typography>
                        </Box>
                    </RenderComPermissao>
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
                        <MenuItem onClick={handleRemove}>Excluir</MenuItem>
                        <MenuItem onClick={() => showModal && showModal({
                            url: `/toDos/edit/${id}`,
                            modalOnClose: false,
                            style: {
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth: { xs: '100vw', sm: '727px', lg: '1000px' },
                                bgcolor: 'background.paper',
                                background: 'white',
                                boxShadow: 24,

                                maxHeight: { xs: '100vh', sm: 'fit-content' },
                                borderRadius: { xs: '0', sm: '8px' }
                            },
                        })}>Editar</MenuItem>
                    </Menu>
                </Box>
            </Box >
        </>
    );
}