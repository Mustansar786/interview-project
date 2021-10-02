import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { withRouter } from "react-router-dom";
import { app_logo_icon } from "../../assets";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { color_palette } from "../../theme/theme";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
 
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  hide: {
    display: "none",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
    width: 100,
    marginRight: theme.spacing(7),
    marginTop: theme.spacing(0),
  },
  name: {
    marginTop: theme.spacing(1),
    alignSelf: "center",
  },
}));

function Appbar(props) {
  const { children } = props;
  //console.log(props);
  const classes = useStyles();
  //for sidebar selected navigation
  const [selectedIndex, setSelectedIndex] = React.useState();
  //for profile menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //for sidebar
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const Logout = async () => {
  
  };
  const ChangePassword = () => {
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ height: 67 }}
        position="fixed"
        
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              props.history.push("/dashboard");
              setSelectedIndex(0);
            }}
            style={{ cursor: "pointer" }}
          >Employees Listing</Typography>
         
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* children */}
        {children}
      </main>
    </div>
  );
}

export default withRouter(Appbar);
