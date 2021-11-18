import React from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import Header from './Header';
import Banner from './Banner';
import Introduction from './Introduction';
import Merits from './Merits';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

// assets
import classes from './LandingPage.module.css';

//= ===============================|| AUTH3 - LOGIN ||================================//

const LandingPage = () => {
    return (
        <Grid container xs={12} sx={{ justifyContent: 'center' }}>
            <Grid className={classes.header} item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <Banner />
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <Introduction />
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <Merits />
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <About />
            </Grid>
            <Grid item lg={8} md={12} sm={12} xs={12}>
                <Contact />
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
    );
};

export default LandingPage;
