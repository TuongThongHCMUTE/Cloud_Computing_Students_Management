import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// context
import AppReducer from 'reducers/AppReducer';
import AppContext from 'store/AppContext';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

// ===========================|| APP ||=========================== //

const App = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const initialSate = { 
        userInfo: currentUser ? currentUser : null 
    };
    const [state, dispatch] = useReducer(AppReducer, initialSate);

    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <NavigationScroll>
                        <AppContext.Provider value={{ state, dispatch }}>
                            <Routes />
                        </AppContext.Provider>
                    </NavigationScroll>
                </LocalizationProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
