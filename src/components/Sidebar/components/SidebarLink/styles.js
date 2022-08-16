import {
  makeStyles
} from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: "1px solid 	#404040",
    color: "white",
    "&:hover, &:focus": {
      backgroundColor: "#596270",
    },
  },
  linkActive: {
    backgroundColor: "#596270",
  },
  linkNested: {
    fontSize: "14px",
    border: "none",
    padding: "3px 3px 3px 34px",

    "&:hover, &:focus": {
      backgroundColor: "#596270",
    },
    '& $linkText': {
      fontSize: 14,
    },
    '& $linkIcon': {
      minWidth: 33
    }
  },
  linkIcon: {
    color: "white",
    //color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
    minWidth: 48,
    "& img": {
      width: 24,
    }
  },
  linkIconActive: {
    color: "#00B4E5",
  },
  linkText: {
    fontFamily: "Lato",
    padding: 0,
    color: "white",
    // color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    borderBottom: "1px solid white",
    padding: "0px",
    marginTop: "0px",
    backgroundColor: "#11284B",
    position: "relative",
    top: "-1px",
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    color: "red",
  },
  eIcon: {
    color: "#fff",
    marginRight: 7
  },
  subMenu: {
    "& .MuiMenu-paper": {
      backgroundColor: "#11284B",
      boxShadow: "none",
      "& $linkNested": {
        padding: "3px 12px 3px 12px",
      },
      "& $linkTextHidden": {
        opacity: "1"
      }
    }
  }
}));
