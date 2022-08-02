import React from "react"; //, { useState }
import Grid from '@material-ui/core/Grid';
import { BoxContainer, FooterButton, IconAvatarsSmall } from '../boxContainer/BoxContainer';
import CalendarIcon from '../../../../images/icons/dashboardCalendarIcon.png';
import { List, Avatar, Badge, Space, Select } from 'antd';
import PatientIcon from '../../../../images/icons/dashboardPatientIcon.png';

// styles
import useStyles from "./styles";
// import 'antd/dist/antd.css';
import "antd/lib/list/style/index.css";
import "antd/lib/avatar/style/index.css";
import "antd/lib/badge/style/index.css";
import "antd/lib/space/style/index.css";
import "antd/lib/dropdown/style/index.css";
import "antd/lib/select/style/index.css";





const data = [
  {
    title: 'Ashton Cox - General Checkup',
    dis: 'General Checkup',
    telehealth: 'Telehealth',
    status: 'Confirmed',
  },
  {
    title: 'Airi Satou -Chiropractic',
    status: 'Pending',
  },
  {
    title: 'Ant Design Title 3',
    status: 'In Lobby',
  },
  {
    title: 'Ant Design Title 4',
    dis: 'Chiropractic',
    telehealth: 'Telehealth'
  },
  {
    title: 'Ashton Cox - General Checkup',
    dis: 'General Checkup',
    telehealth: 'Telehealth',
    status: 'Confirmed',
  },

];
const days = [
  {
    title: 'Today',
    value: 'today',
  },
  {
    title: 'Tomorrow',
    value: 'tomorrow',
  },
  {
    title: 'Next Week',
    value: 'nextweek',
  },
];
export default function TodayAppointments(props) {

  var classes = useStyles();

  const dateChange = (label, item) => {


  }
  return (
    <>
      {/* Today’s Appointments component  */}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <BoxContainer>
          <IconAvatarsSmall title={"Today’s Appointments"} value={"10"} width={"260px"} textColor={"#6161ea"} bgColor={"#dde4ff"} imgUrl={CalendarIcon} />
          <div className={classes.daySearchBox}>
            {/* <Select size="large" placeholder="Select Day" defaultValue="today"
              onChange={dateChange}
            // filterOption={(input, option) => showSearch
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
            >
              {
                days.map((option, i) => (
                  <option value={option.value} key={i}>{option.title}</option>
                ))
              }
            </Select> */}
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            className={`${classes.todayAppointmentList} ${classes.fontStyle}`}
            renderItem={item => (
              <List.Item
                actions={[<>11:30 am</>, <>30mins</>]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={46} src={PatientIcon} />}
                  title={item.title}
                  description={<>{item.dis} <Space className={classes.telehealthBadge}><Badge style={{ backgroundColor: '#dde4ff', fontSize: 10, color: "#5F5BFF" }} count={item.telehealth} /></Space></>}
                />
                <div className={`${classes.todayAppointmentStatus} ${classes.fontStyle}`}>
                  {item.status === "Confirmed" ?
                    <span className={classes.confirmedStatus}>{item.status}</span>
                    : null}
                  {item.status === "In Lobby" ?
                    <span className={classes.inLobbyStatus}>{item.status}</span>
                    : null}
                  {item.status === "Pending" ?
                    <span className={classes.pendingStatus}>{item.status}</span>
                    : null}
                </div>
              </List.Item>
            )}
          />
          <FooterButton title={"Calender"} linkUrl={'/'} />
        </BoxContainer>
      </Grid>
    </>
  );
}


