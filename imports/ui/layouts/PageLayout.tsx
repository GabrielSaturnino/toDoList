import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';

export interface IPageLayout {
	title: string;
	children?: React.ReactNode;
	actions?: React.ReactNode[];
	hiddenTitleBar?: boolean;
	navigate?: { goBack: () => void };
	onBack?: () => void;
}

export const PageLayout = (props: IPageLayout) => {
	const { title, children, actions, hiddenTitleBar, navigate, onBack } = props;

	const theme = useTheme();

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				overflowX: 'hidden',
				background: 'red',
				maxHeight: '100%'
			}}>
			{!hiddenTitleBar ? (
				<Box
					sx={{
						position: 'relative',
						zIndex: 2,
						top: 0,
						left: 0,
						height: '75px',
						width: '100%',
						backgroundColor: theme.palette.primary.main
					}}>
					<Container
						sx={{
							backgroundColor: theme.palette.primary.main,
							color: '#FFF',
							height: 45,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}>
						<Typography
							component={'p'}
							sx={{
								position: 'absolute',
								top: 15,
								left: 190,
								display: 'flex',
								fontSize: '1.875rem',
								fontWeight: 900,
								fontStretch: 'normal',
								fontStyle: 'normal',
								lineHeight: '35.16px',
								letterSpacing: '0.78px',
								textAlign: 'center',
								color: '#000000',
								textTransform: 'none',
								flexDirection: 'row',
								alignItems: 'center',
								textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
							}}>
							{title || 'SEM TITULO'}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}>
							{actions}
						</Box>
					</Container>
				</Box>
			) : null}
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					paddingBottom: hiddenTitleBar ? 60 : undefined,
					overflowX: 'hidden',
					overflowY: 'auto',
					maxHeight: '100%',
					position: 'relative'
				}}>
				<Container
					id={'pageContainer'}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						width: '100%',
						flex: 0,
						padding: 8,
						backgroundColor: theme.palette.background.default
					}}>
					{children}
				</Container>
			</Box>
		</Box>
	);
};
