import React, { useState, useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import { initSearch } from '/imports/libs/searchUtils';
import shortid from 'shortid';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import { IDefaultContainerProps, IDefaultListProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { IToDos } from '../../api/toDosSch';
import { IConfigList } from '/imports/typings/IFilterProperties';
import { Recurso } from '../../config/Recursos';
import { RenderComPermissao } from '/imports/seguranca/ui/components/RenderComPermisao';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { TaskCard } from '/imports/ui/components/TaskCard/TaskCard';
import { toDosStyle } from './style/toDosListStyle';
import { getUser } from '/imports/libs/getUser';


interface IToDosList extends IDefaultListProps {
	remove: (doc: IToDos) => void;
	viewComplexTable: boolean;
	setViewComplexTable: (_enable: boolean) => void;
	toDoss: IToDos[];
	tarefasPublicas: IToDos[];
	tarefasPublicasConcluida: IToDos[];
	tarefasPrivadas: IToDos[];
	tarefasPrivadasConcluida: IToDos[];
	setFilter: (newFilter: Object) => void;
	clearFilter: () => void;
}

const ToDosList = (props: IToDosList) => {
	const {
		screenState,
		user,
		tarefasPublicas,
		tarefasPublicasConcluida,
		tarefasPrivadas,
		tarefasPrivadasConcluida,
		searchBy,
		showModal
	} = props;

	const [value, setValue] = useState('one');
	const [searchField, setSearchField] = useState('');
	const [andamento, setAndamento] = useState(false);
	const [concluidas, setConcluidas] = useState(false);
	const [publicas, setPublicas] = useState(tarefasPublicas);
	const [privadas, setPrivadas] = useState(tarefasPrivadas);

	const handleChangeValue = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	useEffect(() => {

		let toDosBuscadasPublicas = !!searchField ?
			tarefasPublicas.filter(task => {
				return task.title.toLowerCase().includes(searchField.toLowerCase());
			}) : tarefasPublicas;

		let toDosBuscadasPrivadas = !!searchField ?
			tarefasPrivadas.filter(task => {
				return task.title.toLowerCase().includes(searchField.toLowerCase());
			}) : tarefasPrivadas;

		setPublicas(toDosBuscadasPublicas);
		setPrivadas(toDosBuscadasPrivadas);
	}, [searchField]);

	const handleOpenContainerIncompleta = () => {
		setAndamento(!andamento);
		setPublicas(tarefasPublicas);
		setPrivadas(tarefasPrivadas);
	}

	const idToDos = shortid.generate();

	const [text, setText] = React.useState(searchBy || '');

	// @ts-ignore
	// @ts-ignore
	return (
		<Box>
			<Box sx={toDosStyle.tabsBox}>
				<Container>
					<Tabs
						value={value}
						onChange={handleChangeValue}
						aria-label="wrapped label tabs example"
					>
						<Tab
							value="one"
							label="Minhas Tarefas"
							wrapped
						/>
						<Tab value="two" label="Tarefas do Time" />
					</Tabs>
				</Container>
			</Box>
			<Container>


				<TextField
					sx={toDosStyle.searchField}
					id="input-with-icon-textfield"
					value={searchField}
					onChange={e => setSearchField(e.target.value)}
					label=""
					name='campoBusca'
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					variant="standard"
				/>

				<Box sx={toDosStyle.taskTitleBox} onClick={handleOpenContainerIncompleta}>
					{andamento ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}

					<Typography variant='h1' sx={toDosStyle.taskTitle}>Não Concluídas ({value === 'one' ?
						tarefasPrivadas.length : tarefasPublicas.length})</Typography>
				</Box>

				{andamento ?
					value === 'one' ?
						<Box sx={toDosStyle.taskCardContainer}>
							{searchField !== '' ? privadas.map(task => (
								<TaskCard key={task._id} doc={task} showModal={showModal} />
							)) :
								tarefasPrivadas.map(task => (
									<TaskCard key={task._id} doc={task} showModal={showModal} />
								))}
						</Box>
						:
						<Box sx={toDosStyle.taskCardContainer}>
							{searchField !== '' ? publicas.map(task => (
								<TaskCard key={task._id} doc={task} showModal={showModal} />
							)) :
								tarefasPublicas.map(task => (
									<TaskCard key={task._id} doc={task} showModal={showModal} />
								))}
						</Box>
					: ''}

				<Box sx={toDosStyle.taskTitleBox} onClick={() => setConcluidas(!concluidas)}>
					{concluidas ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
					<Typography variant='h1' sx={toDosStyle.taskTitle}>Concluídas ({value === 'one' ?
						tarefasPrivadasConcluida.length : tarefasPublicasConcluida.length})</Typography>
				</Box>
				{concluidas ?
					value === 'one' ?
						<Box sx={toDosStyle.taskCardContainer}>
							{tarefasPrivadasConcluida.map(task => (
								<TaskCard key={task._id} doc={task} showModal={showModal} />
							))}
						</Box>
						:
						<Box sx={toDosStyle.taskCardContainer}>
							{tarefasPublicasConcluida.map(task => (
								<TaskCard key={task._id} doc={task} showModal={showModal} />
							))}
						</Box>
					: ''}
			</Container>

			<Box sx={toDosStyle.buttonFlex}>
				<RenderComPermissao recursos={[Recurso.EXAMPLE_CREATE]}>
					<Button sx={toDosStyle.buttonAddTask} color='primary' variant={'contained'}
						id={'add'}
						onClick={() => showModal && showModal({
							url: `/toDos/create/${idToDos}`,
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
						})}
					>
						<AddIcon /> Adicionar Tarefa
					</Button>
				</RenderComPermissao>
			</Box>
		</Box >
	);
};

export const subscribeConfig = new ReactiveVar<IConfigList & { viewComplexTable: boolean }>({
	pageProperties: {
		currentPage: 1,
		pageSize: 25
	},
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
});

const toDosSearch = initSearch(
	toDosApi, // API
	subscribeConfig, // ReactiveVar subscribe configurations
	['title', 'description'] // list of fields
);

let onSearchToDosTyping: NodeJS.Timeout;

const viewComplexTable = new ReactiveVar(false);

export const ToDosListContainer = withTracker((props: IDefaultContainerProps) => {
	const { showNotification } = props;

	//Reactive Search/Filter
	const config = subscribeConfig.get();
	const sort = {
		[config.sortProperties.field]: config.sortProperties.sortAscending ? 1 : -1
	};
	toDosSearch.setActualConfig(config);

	//Subscribe parameters
	const filter = { ...config.filter };
	// const filter = filtroPag;
	const limit = config.pageProperties.pageSize;
	const skip = (config.pageProperties.currentPage - 1) * config.pageProperties.pageSize;

	//Collection Subscribe
	const subHandle = toDosApi.subscribe('toDosList', filter, {
		sort,
		limit,
		skip
	});
	const user = getUser();
	const toDoss = subHandle?.ready() ? toDosApi.find(filter, { sort }).fetch() : [];

	// Tarefas Publicas
	const toDossPublica = toDosApi.subscribe('toDosPublica', { type: 'publica', complete: false }, {});
	const tarefasPublicas = toDossPublica?.ready() ? toDosApi.find({ type: 'publica', complete: false }).fetch() : [];

	const toDossPublicaConcluida = toDosApi.subscribe('toDosPublicaConcluida', { complete: true }, {});
	const tarefasPublicasConcluida = toDossPublicaConcluida?.ready() ? toDosApi.find({ type: 'publica', complete: true }).fetch() : [];

	const toDossPrivada = toDosApi.subscribe('toDosPublica', { type: 'pessoal', complete: false, createdby: user._id }, {});
	const tarefasPrivadas = toDossPrivada?.ready() ? toDosApi.find({ type: 'pessoal', complete: false, createdby: user._id }).fetch() : [];

	const toDossPrivadaConcluida = toDosApi.subscribe('toDosPublica', { type: 'pessoal', complete: true }, {});
	const tarefasPrivadasConcluida = toDossPrivadaConcluida?.ready() ? toDosApi.find({ type: 'pessoal', complete: true }).fetch() : [];

	return {
		showModal: props.showModal,
		tarefasPublicas,
		tarefasPublicasConcluida,
		tarefasPrivadas,
		tarefasPrivadasConcluida,
		toDoss,
		user,
		loading: !!subHandle && !subHandle.ready(),
		remove: (doc: IToDos) => {
			toDosApi.remove(doc, (e: IMeteorError) => {
				if (!e) {
					showNotification &&
						showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `O exemplo foi removido com sucesso!`
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
		},

	};
})(showLoading(ToDosList));
