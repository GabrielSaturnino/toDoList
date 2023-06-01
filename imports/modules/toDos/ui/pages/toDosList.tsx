import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import { initSearch } from '/imports/libs/searchUtils';
import { IDefaultContainerProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { IToDos } from '../../api/toDosSch';
import { IConfigList } from '/imports/typings/IFilterProperties';
import { showLoading } from '/imports/ui/components/Loading/Loading';
import { AppBar } from '/imports/ui/layouts/MyAppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { toDosStyle } from './style/toDosListStyle';


const ToDosList = () => {
	const [value, setValue] = useState('one');
	const [searchField, setSearchField] = useState('');
	const [open, setOpen] = React.useState(false);

	const [taskName, setTaskName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');

	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeValue = (event, newValue: string) => {
		console.log(taskName);
		console.log(taskDescription);
		setValue(newValue);
	};

	return (
		<>
			<AppBar titulo='ToDo List' redirectPage='/meuModulo' />
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
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					variant="standard"
				/>
				<Box sx={toDosStyle.buttonFlex}>
					<Button sx={toDosStyle.buttonAddTask} variant={'contained'} color={'primary'}
						onClick={handleClickOpen}><AddIcon /> Adicionar Tarefa</Button>
				</Box>
			</Container>

			<Dialog open={open} onClose={handleClose}>
				<Box sx={{ width: '727px', height: '856px' }}>
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
							onClick={handleClose} />
					</Box>

					<Container sx={{
						width: '80%',
					}}>

						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Email Address"
								value={taskName}
								onChange={e => setTaskName(e.target.value)}
								type="text"
								fullWidth
								variant="filled"
							/>
							<TextField
								id="standard-multiline-static"
								label="Multiline"
								value={taskDescription}
								onChange={e => setTaskDescription(e.target.value)}
								multiline
								rows={4}
								defaultValue="Default Value"
								variant="standard"
							/>
							<FormControl sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="demo-simple-select-helper-label">Tipo</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									value={age}
									label="Age"
									onChange={handleChange}
								>
									<MenuItem value="">
									</MenuItem>
									<MenuItem value={'pessoal'}>Pessoal</MenuItem>
									<MenuItem value={'publica'}>Publica</MenuItem>
								</Select>
							</FormControl>
						</DialogContent>
					</Container>
					<DialogActions>
						<Box sx={toDosStyle.buttonFlex}>
							<Button onClick={handleClose}>Salvar</Button>
						</Box>
					</DialogActions>
				</Box>
			</Dialog>
		</>
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
	const toDoss = subHandle?.ready() ? toDosApi.find(filter, { sort }).fetch() : [];

	return {
		toDoss,
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
		viewComplexTable: viewComplexTable.get(),
		setViewComplexTable: (enableComplexTable: boolean) => viewComplexTable.set(enableComplexTable),
		searchBy: config.searchBy,
		onSearch: (...params: any) => {
			onSearchToDosTyping && clearTimeout(onSearchToDosTyping);
			onSearchToDosTyping = setTimeout(() => {
				config.pageProperties.currentPage = 1;
				subscribeConfig.set(config);
				toDosSearch.onSearch(...params);
			}, 1000);
		},
		total: subHandle ? subHandle.total : toDoss.length,
		pageProperties: config.pageProperties,
		filter,
		sort,
		setPage: (page = 1) => {
			config.pageProperties.currentPage = page;
			subscribeConfig.set(config);
		},
		setFilter: (newFilter = {}) => {
			config.filter = { ...filter, ...newFilter };
			Object.keys(config.filter).forEach((key) => {
				if (config.filter[key] === null || config.filter[key] === undefined) {
					delete config.filter[key];
				}
			});
			subscribeConfig.set(config);
		},
		clearFilter: () => {
			config.filter = {};
			subscribeConfig.set(config);
		},
		setSort: (sort = { field: 'createdat', sortAscending: true }) => {
			config.sortProperties = sort;
			subscribeConfig.set(config);
		},
		setPageSize: (size = 25) => {
			config.pageProperties.pageSize = size;
			subscribeConfig.set(config);
		}
	};
})(showLoading(ToDosList));
