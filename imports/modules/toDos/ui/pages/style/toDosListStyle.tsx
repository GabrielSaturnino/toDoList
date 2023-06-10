export const toDosStyle = {
    tabsBox: {
        width: '100vw',
        marginTop: '15px',
        borderBottom: '1px solid gray',
    },
    searchField: {
        marginTop: '66px',
        border: '1px solid gray',
        borderRadius: '5px',
        width: { xl: '528px', lg: '528px', md: '528px', sm: '528px', xs: '310px' },
        height: '50px'
    },
    buttonFlex: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 50
    },
    buttonAddTask: {
        position: 'fixed',
        bottom: 50,
        width: '238px',
        height: '50px',
        color: 'black'
    },
    taskTitleBox: {
        marginBottom: '30px',
        marginTop: '54px',
        display: 'flex',
        alignItems: 'center',
        width: '250px'
    },
    taskTitle: {
        fontSize: { xl: '1.3rem', lg: '1.4rem', md: '1.4rem', sm: '1.4rem', xs: '1.3rem' },
        lineHeight: '25px',
        fontWeight: 700,
        marginLeft: '27px'
    },
    taskCardContainer: {
        overflowY: 'auto',
        height: '350px',
        borderTop: '2px solid gray',
        borderBottom: '2px solid gray'
    }
}

export const toDosStyleDetails = {
    boxPrincipal: {
        width: { xl: '727px' },
        height: '700px'
    },
    boxFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '20px'
    },
    boxButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        paddingTop: 20,
        paddingBottom: 20
    },
    boxSalvar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    btnSalvar: {
        width: '278px',
        height: '50px',
        color: 'black',
        fontWeight: 700,
        borderRadius: '10px',
        marginTop: '70px'
    }
}

export const toDosView = {
    boxMain: {
        width: { xl: '727px' },
        height: { xl: '947px' },
        border: '1px solid #C4C4C4',
        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.2)'
    },
    boxFlexIcon: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '28px',
    },
    icon: {
        cursor: 'pointer',
        marginRight: '56px'
    },
    boxConteudo: {
        marginBottom: '4.25rem',
        display: 'flex'
    },
    boxCompletarTask: {
        height: '26px',
        width: '26px',
        borderRadius: '50%',
        marginRight: '15px',
        border: '1px solid gray',
        cursor: 'pointer',
    },
    tipografiaTitulo: {
        fontWeight: 400,
        fontSize: { xl: '1.375rem', lg: '1.375rem', md: '1.375rem', sx: '1.375rem', xs: '1.375rem' }, lineHeight: '25px'
    },
    tipografiaDesc: {
        fontWeight: 'bold',
        fontSize: { xl: '1rem', lg: '1rem', md: '1rem', sx: '1rem', xs: '1rem' }, lineHeight: '25px',
    },
    tipografiaDaDescricao: {
        fontWeight: 400,
        marginTop: '0.62rem',
        fontSize: { xl: '1.12rem', lg: '1.12rem', md: '1.12rem', sx: '1.12rem', xs: '1.12rem' },
        lineHeight: '1.32rem',
        marginBottom: '4rem',
    },
    tipografiaTipo: {
        fontWeight: 700,
        fontSize: { xl: '0.87rem', lg: '0.87rem', md: '0.87rem', sx: '0.87rem', xs: '0.87rem' }, lineHeight: '16px'
    },
    tipografiaDoTipo: {
        fontWeight: 400,
        fontSize: { xl: '1.12rem', lg: '1.12rem', md: '1.12rem', sx: '1.12rem', xs: '1.12rem' },
        lineHeight: '21px',
        marginBottom: '4rem'
    },
    btnEditar: {
        width: '278px',
        height: '50px',
        borderRadius: '10px',
        border: '3px solid #C4C4C4',
        fontWeight: 700,
        fontSize: '1.12rem',
        lineHeight: '21px',
        color: 'black'
    }
}