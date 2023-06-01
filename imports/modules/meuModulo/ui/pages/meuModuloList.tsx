import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { meuModuloApi } from '../../api/meuModuloApi';
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import { initSearch } from '/imports/libs/searchUtils';
import { IDefaultContainerProps, IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { IMeuModulo } from '../../api/meuModuloSch';
import { IConfigList } from '/imports/typings/IFilterProperties';
import { showLoading } from '/imports/ui/components/Loading/Loading';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router'
import { meuModuloStyles } from './style/meuModuloListStyle';
import { AppBar } from '/imports/ui/layouts/MyAppBar';

const MeuModuloList = () => {

	const [redirect, setRedirect] = useState(false);
	const currentUser = Meteor.user();
	console.log(currentUser?.username);

	return (
		<>
			<AppBar titulo='ToDo List' />
			<Container>
				<Typography sx={meuModuloStyles.title} variant="h1" gutterBottom>
					Olá, {currentUser?.username}
				</Typography>

				<Typography sx={meuModuloStyles.desc} variant="caption" display="block" gutterBottom>
					Seus projetos muito mais organizados. Veja as taefas adicionadas por seu time, por você e para você!
				</Typography>

				<Typography sx={meuModuloStyles.subTitle} variant="h2" gutterBottom>
					Adicionadas Recentemente
				</Typography>

				<Box sx={meuModuloStyles.taskContainer}>
					Aqui vão as tasks
				</Box>

				<Box sx={meuModuloStyles.buttonFlex}>
					<Button sx={meuModuloStyles.buttonToTask} variant={'contained'} color={'primary'}
						onClick={() => setRedirect(true)}>Ir para Tarefas &gt;&gt;</Button>
				</Box>
				{redirect && <Navigate to={'/toDos'} />}
			</Container>
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

const meuModuloSearch = initSearch(
	meuModuloApi, // API
	subscribeConfig, // ReactiveVar subscribe configurations
	['title', 'description'] // list of fields
);

let onSearchMeuModuloTyping: NodeJS.Timeout;

const viewComplexTable = new ReactiveVar(false);

export const MeuModuloListContainer = withTracker((props: IDefaultContainerProps) => {
	const { showNotification } = props;

	//Reactive Search/Filter
	const config = subscribeConfig.get();
	const sort = {
		[config.sortProperties.field]: config.sortProperties.sortAscending ? 1 : -1
	};
	meuModuloSearch.setActualConfig(config);

	//Subscribe parameters
	const filter = { ...config.filter };
	// const filter = filtroPag;
	const limit = config.pageProperties.pageSize;
	const skip = (config.pageProperties.currentPage - 1) * config.pageProperties.pageSize;

	//Collection Subscribe
	const subHandle = meuModuloApi.subscribe('meuModuloList', filter, {
		sort,
		limit,
		skip
	});
	const meuModulos = subHandle?.ready() ? meuModuloApi.find(filter, { sort }).fetch() : [];

	return {
		meuModulos,
		loading: !!subHandle && !subHandle.ready(),
		remove: (doc: IMeuModulo) => {
			meuModuloApi.remove(doc, (e: IMeteorError) => {
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
			onSearchMeuModuloTyping && clearTimeout(onSearchMeuModuloTyping);
			onSearchMeuModuloTyping = setTimeout(() => {
				config.pageProperties.currentPage = 1;
				subscribeConfig.set(config);
				meuModuloSearch.onSearch(...params);
			}, 1000);
		},
		total: subHandle ? subHandle.total : meuModulos.length,
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
})(showLoading(MeuModuloList));
