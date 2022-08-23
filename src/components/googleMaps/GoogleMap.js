import React from 'react'
//material imports
import { Grid } from '@material-ui/core';
import useStyles from "./styles";
//map imports
import { Map, Marker, ZoomControl } from "pigeon-maps";
function GoogleMap({ coords }) {
    // handle styles
    var classes = useStyles();
    return (
        <Grid className={classes.mapStyles}>
            <Map height={250} defaultCenter={[coords.latitude , coords.longitude]} defaultZoom={18}>
                <ZoomControl />
                <Marker color={'red'} width={40} anchor={[coords.latitude ,coords.longitude]} />
            </Map>
        </Grid>
    )
}

export default GoogleMap