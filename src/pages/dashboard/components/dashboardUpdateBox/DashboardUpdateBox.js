import React, { useEffect, useState } from "react"; //, { useState }
import { BoxContainer, IconAvatars, FooterButton } from '../boxContainer/BoxContainer';
import { Grid, Typography } from '@material-ui/core';
// import MessageIcon from '../../../../images/icons/dashboardMessageIcon.png';
// import PatientIcon from '../../../../images/icons/dashboardPatientIcon.png';
// import LabIcon from '../../../../images/icons/dashboardLabIcon.png';
// import UnsignedIcon from '../../../../images/icons/dashboardUnsignedIcon.png';
import ProfileIcon from '../../../../images/icons/profile.png'
import RenovationIcon from '../../../../images/icons/renovation.png'
import ConstructionIcon from '../../../../images/icons/construction.png'
import ArchitectureIcon from '../../../../images/icons/architecture.png'

// styles
import useStyles from "./styles";
import axios from "axios";
import { baseUrlForFiles } from "../../../../Configuration/baseUrlForFiles";
export default function DashboardUpdateBox(props) {
  var classes = useStyles();
  const [dashboardData, setDashboardData] = useState(null)
  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    const res = await axios.get(`${baseUrlForFiles}/api/dashboard/getallcounteddocuments`)
    if (res.data.responseCode === 1) {
      setDashboardData(res.data.data)
    }
  }
  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ height: '80%' }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <BoxContainer>
              <IconAvatars title={"Total Clients"} value={dashboardData?.users[0]?.users} bgColor={"#fff"} imgUrl={ProfileIcon} />
              <FooterButton title={"View All"} linkUrl={'/app/users'} />
            </BoxContainer>
          </Grid>
          <Grid item xs={6}>
            <BoxContainer>
              <IconAvatars title={"Renovations"} bgColor={"#fff"} imgUrl={RenovationIcon} />
              <Grid container>
                <MessageStatus title={"Active Orders"} value={dashboardData?.renovationOrders[0]?.renovationActive ?? '0'} />
                <MessageStatus title={"Order History"} value={dashboardData?.renovationOrders[0]?.renovationHistory ?? '0'} />
              </Grid>
              <FooterButton title={"View All"} linkUrl={'/app/renovation'} />
            </BoxContainer>
          </Grid>
          <Grid item xs={6}>
            <BoxContainer>
              <IconAvatars title={"Construction"} bgColor={"#fff"} imgUrl={ConstructionIcon} />
              <Grid container>
                <MessageStatus title={"Active Orders"} value={dashboardData?.constructionOrders[0]?.constructionActive ?? '0'} />
                <MessageStatus title={"Order History"} value={dashboardData?.constructionOrders[0]?.constructionHistory ?? '0'} />
              </Grid>
              <FooterButton title={"View All"} linkUrl={'/app/construction'} />
            </BoxContainer>
          </Grid>
          <Grid item xs={6}>
            <BoxContainer>
              <IconAvatars title={"Architecture"} bgColor={"#fff"} imgUrl={ArchitectureIcon} />
              <Grid container>
                <MessageStatus title={"Active Orders"} value={dashboardData?.architectureOrders[0]?.architectureActive ?? '0'} />
                <MessageStatus title={"Order History"} value={dashboardData?.architectureOrders[0]?.architectureHistory ?? '0'} />
              </Grid>
              <FooterButton title={"View All"} linkUrl={'/app/architecture'} />
            </BoxContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

{/* Messages Patient, Messages Provider components */ }
function MessageStatus(props) {
  var classes = useStyles();
  return (
    <Typography className={`${classes.subtitle2} ${classes.fontStyle}`} variant="subtitle2">
      {props.title}
      {props.value ?
        <>&nbsp;:&nbsp;{props.value}</>
        : null}
    </Typography>
  );
}


{/* Appointment Time, Name, CheckUp Details components */ }
function AppointmentDetails(props) {
  var classes = useStyles();
  return (
    <Grid container className={classes.subTitleContainer}>
      <Typography className={classes.fontStyle} variant={props.variant}>
        {props.title}
      </Typography>
    </Grid>
  );
}

