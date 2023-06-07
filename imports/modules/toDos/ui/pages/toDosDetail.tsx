import React, { useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import SelectField from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import UploadFilesCollection from '../../../../ui/components/SimpleFormFields/UploadFiles/uploadFilesCollection';
import ChipInput from '../../../../ui/components/SimpleFormFields/ChipInput/ChipInput';
import SliderField from '/imports/ui/components/SimpleFormFields/SliderField/SliderField';
import AudioRecorder from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import Print from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import { PageLayout } from '/imports/ui/layouts/PageLayout';
import { IToDos } from '../../api/toDosSch';
import { IDefaultContainerProps, IDefaultDetailProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { useTheme } from '@mui/material/styles';
import { showLoading } from '/imports/ui/components/Loading/Loading';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface IToDosDetail extends IDefaultDetailProps {
	toDosDoc: IToDos;
	save: (doc: IToDos, _callback?: any) => void;
}

const ToDosDetail = (props: IToDosDetail) => {
	const { isPrintView, screenState, loading, toDosDoc, save, navigate, closeComponent } = props;


	const theme = useTheme();

	const handleSubmit = (doc: IToDos) => {
		doc.complete = 'incompleta';
		save(doc);
	};

	return (


		// <Dialog open={open} onClose={handleClose}>
		<Box sx={{ width: '727px', height: '700px' }}>
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginLeft: '20px'
			}}>
				<DialogTitle>Adicionar Tarefa</DialogTitle>
				<CloseIcon sx={{
					cursor: 'pointer',
					marginRight: '56px'
				}}
					onClick={() => {
						closeComponent ? closeComponent() : navigate(`/toDos`);
					}} />
			</Box>

			<Container sx={{
				width: '80%',
			}}>

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
						<div
							key={'Buttons'}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'left',
								paddingTop: 20,
								paddingBottom: 20
							}}>

							<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
								{!isPrintView && screenState === 'view' ? (
									<Button
										sx={{ width: '278px', height: '50px', color: 'black', fontWeight: 700, borderRadius: '10px', marginTop: '70px' }}
										key={'b2'}
										onClick={() => {
											navigate(`/toDos/edit/${toDosDoc._id}`);
										}}
										color={'primary'}
										variant="contained">
										{'Editar'}
									</Button>
								) : null}
								{!isPrintView && screenState !== 'view' ? (
									<Button
										sx={{ width: '278px', height: '50px', color: 'black', fontWeight: 700, borderRadius: '10px', marginTop: '70px' }}
										key={'b3'} color={'primary'} variant="contained" id="submit">
										{'Salvar'}
									</Button>
								) : null}
							</Box>
						</div>
					</SimpleForm>
				</DialogContent>
			</Container>

		</Box>
		// </Dialog>



	);
};

interface IToDosDetailContainer extends IDefaultContainerProps { }

export const ToDosDetailContainer = withTracker((props: IToDosDetailContainer) => {
	const { screenState, id, navigate, showNotification } = props;

	const subHandle = !!id ? toDosApi.subscribe('toDosDetail', { _id: id }) : null;
	let toDosDoc = id && subHandle?.ready() ? toDosApi.findOne({ _id: id }) : {};

	return {
		screenState,
		closeComponent: props.closeComponent,
		toDosDoc,
		save: (doc: IToDos, _callback: () => void) => {
			const selectedAction = screenState === 'create' ? 'insert' : 'update';
			toDosApi[selectedAction](doc, (e: IMeteorError, r: string) => {
				if (!e) {
					navigate(`/toDos/view/${screenState === 'create' ? r : doc._id}`);
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
