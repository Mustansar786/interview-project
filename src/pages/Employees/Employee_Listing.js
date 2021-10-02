import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";
import ViewColumn from "@material-ui/icons/ViewColumn";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import { color_palette } from "../../theme/theme";
import { useSnackbar } from "notistack";
import {
    AppBar,
  Avatar,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Select,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Grid } from "@material-ui/core";
import { default_image } from "../../assets";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
    Employees_list,
} from "../../DAL/Employees/Employees";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

///-------dialog-transition-------///
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
///-----------------CSS-Classes---------------///
const useStyles = makeStyles((theme) => ({
  hed: {
    fontWeight: "bold",
  },
  clmwdth: {
    width: "10px",
  },
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  rightBtn: {
    marginRight: 5,
  },
  btnadd: {
    float: "right",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "90%",
     overflowY: "scroll",
  },
}));

function Employees_Listing(props) {
  const classes = useStyles();
  const tableRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState();
  const [reg_date, setReg_Date] = React.useState("");
  const [date_of_birth, setDate_Of_Birth] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState("all");
  const [page, setPage] = React.useState(0);
  const [totalPage, settotalpage] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  let [data, setData] = useState([]);
  const [status, setStatus] = React.useState("active");
  const [btn, setBtn] = React.useState(true);
  const [openfilter, setOpenfilter] = React.useState(false);


 
  const handleClickOpenfilter = () => {
    setOpenfilter(true);
  };

  const handleClosefilter = () => {
    setOpenfilter(false);
  };

 
  ///---------------------Functions-------------------///
  

  const handleStage = (stage) => {
    setSelectedBtn(stage);
    if(stage == "all"){
      FetchListing();
    }
    if(stage == "male"){
      MaleFetchListing();
    }
    if(stage == "female"){
      FemaleFetchListing();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgreeClose = async () => {};

  const handleChangePage = (event, newPage) => {
    setData([]);
    setIsLoading(false);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    tableRef.current.dataManager.changePageSize(parseInt(event.target.value));
    setData([]);
    setIsLoading(false);
    setRowsPerPage(parseInt(event.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenfilter(false)
    setBtn(false)
    setIsLoading(true);
    
    const response = await Employees_list(
      page,
      rowsPerPage
    );
    if (response.data.length > 0) {
      console.log(response);
      setData(response.data);
      settotalpage(response.total);
      
    } else {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
    setIsLoading(false);
    
  };

  const MaleFetchListing = async (page, rowsPerPage) => {
    setIsLoading(true);
    
    const response = await Employees_list(
      page,
      rowsPerPage
    );
    var male_arr = [];
    if (response.data.length > 0) {
      response.data.map((x,i)=>{
        if(x.title == "mr"){
          male_arr.push(x);
        }
      })
      console.log(response);
      setBtn(true)
      setSelectedBtn("male")
      setData(male_arr);
      settotalpage(male_arr.length);
      
    } else {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
    setIsLoading(false);
  };

  const FemaleFetchListing = async (page, rowsPerPage) => {
    setIsLoading(true);
    
    const response = await Employees_list(
      page,
      rowsPerPage
    );
    var female_arr = [];
     
    if (response.data.length > 0) {
      response.data.map((x,i)=>{
        if(x.title == "ms" || x.title == "mrs" || x.title == "miss"){
          female_arr.push(x);
        }
      })
      console.log(response);
      setBtn(true)
      setSelectedBtn("female")
      setData(female_arr);
      settotalpage(female_arr.length);
      
    } else {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
    setIsLoading(false);
  };

  const FetchListing = async (page, rowsPerPage) => {
    setIsLoading(true);
    
    const response = await Employees_list(
      page,
      rowsPerPage
    );
    if (response.data.length > 0) {
      console.log(response);
      setBtn(true)
      setSelectedBtn("all")
      setData(response.data);
      settotalpage(response.total);
      
    } else {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
    setIsLoading(false);
  };


  useEffect(() => {
    FetchListing( page, rowsPerPage);
  }, [ page, rowsPerPage]);


  const [columns, setColumns] = useState([
    {
      title: <span className={classes.hed}>#</span>,
      width: 150,
      render: (rowData) => <>{rowData.tableData.id + 1}</>,
      sorting: false,
    },
    {
      title: <span className={classes.hed}>Title</span>,
      render: (rowData) => (
        <>
        <div>
         {rowData.title ? 
         <>
            {rowData.title}
            </>
              : "N/A"}
          </div>
        </>
      ),
      sorting: false,
    },
    {
        title: <span className={classes.hed}>First Name</span>,
        render: (rowData) => (
          <>
          <div>
           {rowData.firstName ? 
           <>
              {rowData.firstName}
              </>
                : "N/A"}
            </div>
          </>
        ),
        sorting: false,
      },
      {
        title: <span className={classes.hed}>Last Name</span>,
        render: (rowData) => (
          <>
          <div>
           {rowData.lastName ? 
           <>
              {rowData.lastName}
              </>
                : "N/A"}
            </div>
          </>
        ),
        sorting: false,
      },
   
   
    {
      title: <span className={classes.hed}>Image</span>,
      render: (rowData) => (
        <>
          <img
            src={
              rowData.picture == ""
                ? default_image
                : rowData.picture
            }
            style={{ width: 50, height: 50, borderRadius: 50 }}
          ></img>
        </>
      ),
      sorting: false,
    },
    {
      title: <span className={classes.hed}>Profile Detail</span>,
      render: (rowData) => (
        <>
          <div style={{ minWidth: 100 }}>
            <Button
           onClick={() =>
            props.history.push({
              pathname: `/employees_listing/employee_profile/${rowData.id}`,
              user: rowData,
            })
          }
              variant="outlined"
              color="primary"
            >
              Detail
            </Button>
          </div>
        </>
      ),
      sorting: false,
    },
    {
      title: <span className={classes.hed}>User Posts</span>,
      render: (rowData) => (
        <>
          <div style={{ minWidth: 100 }}>
            <Button
           onClick={() =>
            props.history.push({
              pathname: `/employees_listing/employee_blogs_post/${rowData.id}`,
              user: rowData,
            })
          }
              variant="outlined"
              color="primary"
            >
              Posts
            </Button>
          </div>
        </>
      ),
      sorting: false,
    },
    {
      title: <span className={{ float: "right" }}>Actions</span>,
      render: (rowData) => (
        <div className={classes.mnu}>
          <Menu
            key="left"
            direction="right"
            align="center"
            position="anchor"
            viewScroll="auto"
            menuButton={
              <MoreVertIcon style={{ marginLeft: 20 }}></MoreVertIcon>
            }
          >
            <MenuItem
              className={classes.mnu}
            >
              Edit
            </MenuItem>
            
            <MenuItem
              className={classes.mnu}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      ),
      sorting: false,
    },
   
  ]);
  ///-------------styling-icons---------------------///
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => (
      <Edit className={classes.Icons} {...props} ref={ref} />
    )),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    DeleteIcon: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
  };
  let history = useHistory();
  return (
    <>
      <Button
        className={classes.rightBtn}
        onClick={() => handleStage("all")}
        variant={selectedBtn === "all" && "contained"}
        color="primary"
      >
        All
      </Button>
     
      <Button
        className={classes.rightBtn}
        onClick={() => handleStage("male")}
        variant={selectedBtn === "male" && "contained"}
        color="primary"
      >
        Male
      </Button>
      <Button
        className={classes.rightBtn}
        onClick={() => handleStage("female")}
        variant={selectedBtn === "female" && "contained"}
        color="primary"
      >
        Female
      </Button>
     
        <ButtonGroup
          disableElevation
          color="primary"
          style={{float:'right'}}
        >
          <Button
            onClick={FetchListing}
            variant={btn ? "contained" : "outlined"}
          >
            All Time
          </Button>
          <Button
            style={{ float: "right" }}
            onClick={handleClickOpenfilter}
            variant={!btn ? "contained" : "outlined"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 5 }}
            >
              <path
                d="M13.1165 0.25H0.883548C0.321452 0.25 0.0378205 0.932013 0.436097 1.33029L5.3125 6.20743V11.6406C5.3125 11.8471 5.41325 12.0406 5.58242 12.1591L7.69179 13.6351C8.10794 13.9264 8.6875 13.6312 8.6875 13.1167V6.20743L13.564 1.33029C13.9615 0.932804 13.6798 0.25 13.1165 0.25Z"
                fill={!btn ? "#fff" : "#1961de"}
              />
            </svg>
            Filter
          </Button>
        </ButtonGroup>

      <MaterialTable
        tableRef={tableRef}
        style={{ marginTop: "20px" }}
        isLoading={isLoading}
         title="Employees Data"
        
        columns={columns.map((c) => ({ ...c, tableData: undefined }))}
        data={data}
        icons={tableIcons}
        components={{
          Pagination: (props) => (
            <TablePagination
              component="div"
              count={totalPage}
              rowsPerPageOptions={[10, 20, 30, 40]}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ),
        }}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldAlignment: "right",
          searchFieldStyle: { marginRight: "0px" },
          searchFieldVariant: "standard",
          pageSize: rowsPerPage,
          emptyRowsWhenPaging: false,
          headerStyle: {
            backgroundColor: color_palette.primary,
            color: "white",
            fontWeight: "bold",
          },
        }}
      />

      <Dialog
        open={openfilter}
        onClose={handleClosefilter}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          onClick={handleClosefilter}
          style={{ marginLeft: 530 }}
          color="textSecondary"
        >
          <HighlightOffIcon />
        </IconButton>
        
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center", fontSize: 20, padding: 0 }}
        >
          <h2>{"FILTER"}</h2>
        </DialogTitle>

        <DialogActions>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
              <TextField
        id="date"
        label="Date of Borth"
        variant="outlined"
        type="date"
        fullWidth
        value={date_of_birth}
        onChange={(e)=> setDate_Of_Birth(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
           />
              </Grid>

              <Grid item xs={6}>
              <TextField
        id="date"
        label="Registration Date"
        variant="outlined"
        type="date"
        fullWidth
        value={reg_date}
        onChange={(e)=> setReg_Date(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
           />
              </Grid>
              <Grid item xs={12}>
              <TextField
        id="text"
        label="Age"
        fullWidth
        variant="outlined"
        type="number"
        value={age}
        onChange={(e)=> setAge(e.target.value)}
           />
              </Grid>

              <Grid item xs={12} style={{ marginTop: 20 }}>
                <div style={{ marginLeft: 257 }}>
                  <Button color="primary" variant="contained" type="submit">
                    Apply
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: 20 }}></div>
              </Grid>
            </Grid>
          </form>
        </DialogActions>
      </Dialog>

    </>
  );
}
export default withRouter(Employees_Listing);
