import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import SelectField from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import { IToDos } from '../../api/toDosSch';
import { IDefaultContainerProps, IDefaultDetailProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getUser } from '/imports/libs/getUser';
import { toDosStyleDetails, toDosView } from './style/toDosListStyle';
import { Typography } from '@mui/material';
import { Height } from '@mui/icons-material';

interface IToDosDetail extends IDefaultDetailProps {
	toDosDoc: IToDos;
	documento: IToDos[];
	save: (doc: IToDos, _callback?: any) => void;
}

const ToDosDetail = (props: IToDosDetail) => {
	const { isPrintView, screenState, loading, toDosDoc, save, navigate, closeComponent, documento } = props;

	const theme = useTheme();

	const [completa, setCompleta] = useState(documento[0]?.complete);
	const user = getUser();

	const handleCompleta = () => {
		setCompleta(!completa);

		const newDoc = documento[0]?.complete === true ? false : true;
		documento[0]?.complete = newDoc;

		toDosApi.update(documento[0], (e, r) => {
			console.log(e, r);
		})
	}

	const handleSubmit = (doc: IToDos) => {
		doc.complete = false;
		doc.userName = user.username;
		save(doc);
		closeComponent ? closeComponent() : navigate(`/toDos`);
	};

	return (
		<>
			{screenState === 'create' &&
				<Box sx={toDosStyleDetails.boxPrincipal}>
					<Box sx={toDosStyleDetails.boxFlex}>
						<DialogTitle>Adicionar Tarefa</DialogTitle>
						<CloseIcon sx={{ cursor: 'pointer', marginRight: '56px' }}
							onClick={() => {
								closeComponent ? closeComponent() : navigate(`/toDos`);
							}} />
					</Box>

					<Container sx={{ width: '80%' }}>
						<DialogContent>
							<SimpleForm
								key={'ExempleDetail-SimpleFormKEY'}
								mode={screenState}
								schema={toDosApi.getSchema()}
								doc={toDosDoc}
								onSubmit={handleSubmit}
								loading={loading}>

								<FormGroup key={'fieldsOne'}>
									<TextField key={'f1-tituloKEY'} placeholder="Titulo" name="title" />
									<TextField key={'f1-descricaoKEY'} placeholder="Descrição" name="description" style={{ height: '100px' }} />
								</FormGroup>
								<FormGroup key={'fieldsTwo'}>
									<SelectField key={'f2-tipoKEY'} placeholder="Selecione um tipo" name="type" />
								</FormGroup>
								<Box
									key={'Buttons'}
									sx={toDosStyleDetails.boxButtons}>

									<Box sx={toDosStyleDetails.boxSalvar}>
										<Button
											sx={toDosStyleDetails.btnSalvar}
											key={'b3'} color={'primary'} variant="contained" id="submit">
											{'Salvar'}
										</Button>
									</Box>
								</Box>
							</SimpleForm>
						</DialogContent>
					</Container>
				</Box>}

			{screenState === 'view' &&
				<Box sx={toDosView.boxMain}>
					<Box sx={toDosView.boxFlexIcon}>
						<CloseIcon sx={toDosView.icon}
							onClick={() => {
								closeComponent ? closeComponent() : navigate(`/toDos`);
							}} />
					</Box>
					<Container sx={{ marginTop: '46px' }}>
						<Box sx={toDosView.boxConteudo}>
							<Box sx={toDosView.boxCompletarTask} onClick={handleCompleta}></Box>
							<Typography variant='h1' sx={toDosView.tipografiaTitulo}> {documento[0]?.title} </Typography>
						</Box>
						<Box sx={{ height: '17rem' }}>
							<Typography variant='h2' sx={toDosView.tipografiaDesc}> Descrição </Typography>

							<Typography variant='body1' sx={toDosView.tipografiaDaDescricao}> {documento[0]?.description} </Typography>
						</Box>
						<Box>
							<Typography variant='h2' sx={toDosView.tipografiaTipo}> Tipo </Typography>

							<Typography variant='body1' sx={toDosView.tipografiaDoTipo}> {documento[0]?.type} </Typography>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								variant="contained"
								color='primary'
								sx={toDosView.btnEditar}>Editar</Button>
						</Box>
					</Container>
				</Box>
			}

		</>
	);
};

interface IToDosDetailContainer extends IDefaultContainerProps { }

export const ToDosDetailContainer = withTracker((props: IToDosDetailContainer) => {
	const { screenState, id, navigate, showNotification } = props;

	const subHandle = !!id ? toDosApi.subscribe('toDosDetail', { _id: id }) : null;
	let toDosDoc = id && subHandle?.ready() ? toDosApi.findOne({ _id: id }) : {};

	const tarefa = toDosApi.subscribe('toDosHome', { _id: id }, {});
	const documento = tarefa?.ready() ? toDosApi.find({ _id: id }).fetch() : [];

	return {
		screenState,
		documento,
		loading: !tarefa?.ready(),
		closeComponent: props.closeComponent,
		toDosDoc,
		save: (doc: IToDos, _callback: () => void) => {
			const selectedAction = screenState === 'create' ? 'insert' : 'update';
			toDosApi[selectedAction](doc, (e: IMeteorError, r: string) => {
				if (!e) {
					showNotification &&
						showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `O exemplo foi ${doc._id ? 'atualizado' : 'cadastrado'} com sucesso!`
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
	};
})(showLoading(ToDosDetail));
