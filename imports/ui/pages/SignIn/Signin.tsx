// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Container from '@mui/material/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signinStyle } from './SigninStyle';
import { Box } from '@mui/material';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import Typography from '@mui/material/Typography';

interface ISignIn {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignIn = (props: ISignIn) => {
	const [redirectToReferer, setRedirectToReferer] = useState(false);

	const location = useLocation();

	const { handleExibirAppBar, handleOcultarAppBar } = useContext(FixedMenuLayoutContext);

	const { showNotification, navigate, user } = props;

	useEffect(() => {
		handleOcultarAppBar();
		return () => handleExibirAppBar();
	}, []);

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;
		Meteor.loginWithPassword(email, password, (err: any) => {
			if (err) {
				showNotification({
					type: 'warning',
					title: 'Acesso negado!',
					description:
						err.reason === 'Incorrect password'
							? 'Email ou senha inválidos'
							: err.reason === 'User not found'
								? 'Este email não está cadastrado em nossa base de dados.'
								: ''
				});
			} else {
				showNotification({
					type: 'sucess',
					title: 'Acesso autorizado!',
					description: 'Login de usuário realizado em nossa base de dados!'
				});
				setRedirectToReferer(true);
			}
		});
	};

	const SocialLoginButton = ({ onLogin, buttonText, iconClass, customCss, iconOnly }) => (
		<Box
			onClick={onLogin}
			className="material-button-contained"
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				height: 50,
				color: '#FFF',
				...customCss
			}}>
			<i className={iconClass} />
			{!iconOnly && <span style={{ marginLeft: 15 }}>{buttonText}</span>}
		</Box>
	);

	const callbackLogin = (err) => {
		if (err) {
			console.log('Login Error: ', err);
			if (err.errorType === 'Accounts.LoginCancelledError') {
				showNotification('Autenticação cancelada', 'error');
				//self.setState({ error: 'AUtenticação cancelada' })
			} else {
				showNotification(err.error, 'error');
			}
		} else {
			setRedirectToReferer(true);
			navigate('/');
		}
	};

	React.useEffect(() => {
		if (!!user && !!user._id) navigate('/');
	}, [user]);

	React.useEffect(() => {
		if (location.pathname === '/signout') navigate('/signin');
	}, [location.pathname]);

	return (
		<>
			<Container sx={signinStyle.containerSignIn}>
				<Box
					sx={signinStyle.subContainerSignIn}>
					<Box>
						<Typography sx={signinStyle.labelAccessSystem} variant="h1" gutterBottom>
							ToDo List
						</Typography>
						<Box sx={signinStyle.containerSubtitle}>
							<Typography sx={signinStyle.containerTextSubtitle} variant="body1" gutterBottom>
								Boas-vindas a sua lista de tarefas.
							</Typography>
							<Typography sx={signinStyle.containerTextSubtitle} variant="body1" gutterBottom>
								Insira seu e-mail e senha para efetuar o login:
							</Typography>
						</Box>

						<SimpleForm
							schema={{
								email: { type: 'String', label: 'Email', optional: false },
								password: { type: 'String', label: 'Senha', optional: false }
							}}
							onSubmit={handleSubmit}>

							<Box sx={signinStyle.inputsBox}>
								<TextField sx={signinStyle.inputs} label="Email" fullWidth={true} name="email" type="email" placeholder="Digite seu email" />

								<TextField
									sx={signinStyle.inputsComShadow}
									label="Senha"
									fullWidth={true}
									name="password"
									placeholder="Digite sua senha"
									type="password"
								/>
								<Button sx={signinStyle.buttonEntrar} id="submit" variant={'contained'} color={'primary'}>
									Entrar
								</Button>
							</Box>
						</SimpleForm>

						<Box sx={signinStyle.boxFinal}>
							<Typography sx={signinStyle.boxFinalTypograph} variant="body2" gutterBottom>
								Esqueceu sua senha? <Typography sx={signinStyle.boxFinalBtn} variant="caption" display={'inline-block'} id="forgotPassword" color={'secondary'} onClick={() => navigate('/password-recovery')}>
									Clique aqui
								</Typography>
							</Typography>

							<Typography sx={signinStyle.boxFinalTypograph} variant="body2" gutterBottom>
								Novo por aqui? <Typography sx={signinStyle.boxFinalBtn} variant="caption" display={'inline-block'} id="newUser" color={'secondary'} onClick={() => navigate('/signup')}>
									Cadastre-se
								</Typography>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
};
