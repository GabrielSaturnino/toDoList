import React from 'react';
import { MeuModuloListContainer } from './meuModuloList';
import { MeuModuloDetailContainer } from './meuModuloDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';

export default (props: IDefaultContainerProps) => {
	const validState = ['view', 'edit', 'create'];

	let { screenState, meuModuloId } = useParams();

	const state = screenState ? screenState : props.screenState;

	const id = meuModuloId ? meuModuloId : props.id;

	if (!!state && validState.indexOf(state) !== -1) {
		if (state === 'view' && !!id) {
			return <MeuModuloDetailContainer {...props} screenState={state} id={id} />;
		} else if (state === 'edit' && !!id) {
			return <MeuModuloDetailContainer {...props} screenState={state} id={id} {...{ edit: true }} />;
		} else if (state === 'create') {
			return <MeuModuloDetailContainer {...props} screenState={state} id={id} {...{ create: true }} />;
		}
	} else {
		return <MeuModuloListContainer {...props} />;
	}
};
