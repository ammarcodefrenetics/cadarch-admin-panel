import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  fontStyle: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "500",
    letterSpacing: "0.4px",
  },
  todayAppointmentList: {
    '& .ant-avatar-image': {
      marginLeft: "20px",
    },
    '& h4': {
      marginTop: '0px',
      fontWeight: "600",
    },
    '& .ant-list-item-action li': {
      color: "#555555",
      fontSize: "12px",
    },
    '& .ant-list-item-action-split': {
      backgroundColor: "#555555"
    },
    '& .ant-list-item-meta-description': {
      color: "#444444",
      fontSize: "12px",
    }
  },
  telehealthBadge: {
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  todayAppointmentStatus: {
    fontSize: "10px",
  },
  confirmedStatus: {
    color: "#3FC80F",
  },
  inLobbyStatus: {
    color: "#BD9A38",
  },
  pendingStatus: {
    color: "#FB9600",
  },
  daySearchBox: {
    position: "absolute",
    top: "45px",
    right: "20px",
    '& .ant-select-selector': {
      borderRadius: "10px",
      minWidth: "150px",
    }
  }
}));
