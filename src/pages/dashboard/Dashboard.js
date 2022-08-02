import React from "react"; //, { useState }
import Grid from '@material-ui/core/Grid';


// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import TodayAppointments from './components/todayAppointments/TodayAppointments';
import DashboardUpdateBox from './components/dashboardUpdateBox/DashboardUpdateBox';
import Graph from "./components/animatedGraph/Graph";





export default function Dashboard(props) {


  var classes = useStyles();

  return (
    <>
      <PageTitle title="Dashboard" />

      <Grid container spacing={1} className={classes.container}>
        
        <Graph />

        <DashboardUpdateBox />

        {/* <div className={classes.opacityContainer}>
          <span>Coming soon</span>
        </div> */}
      </Grid>

    </>
  );
}

