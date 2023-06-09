export const taskCardStyle = {
    boxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '70px',
        borderBottom: '2px solid gray',
        '&:hover': {
            background: '#afadad'
        }
    },
    boxMain: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-arround',
        gap: 4
    },
    boxCheckBox: {
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    },
    boxTaskCompleta: {
        border: '1px solid gray',
        borderRadius: '50%',
        height: '26px',
        width: '26px',
        cursor: 'pointer'
    },
    boxContainerColum: {
        display: 'flex',
        flexDirection: 'column'
    },
    tituloTask: {
        fontSize: { xl: '1.1rem', lg: '1.1rem', md: '1.1rem', sm: '1.1rem', xs: '1.1rem' },
        lineHeight: { xl: '21px', lg: '15px', md: '15px', sm: '15px', xs: '15px' },
        fontWeigth: 500
    },
    tituloTaskCompleta: {
        textDecoration: 'line-through',
        fontSize: { xl: '1.1rem', lg: '1.1rem', md: '1.1rem', sm: '1.1rem', xs: '1.1rem' },
        lineHeight: { xl: '21px', lg: '15px', md: '15px', sm: '15px', xs: '15px' },
        fontWeigth: 500
    },
    criadoPor: {
        fontWeight: 'bold',
        fontSize: '0.95rem',
        lineHeight: '16px'
    },
    boxMenu: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '20px'
    }
}