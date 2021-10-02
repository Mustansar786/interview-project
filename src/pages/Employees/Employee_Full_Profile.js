import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { profile_detail } from "../../DAL/Employees/Employees";
import { s3baseUrl } from "../../config/config";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Rating from "@material-ui/lab/Rating";
import { color_palette } from "../../theme/theme";

//=================================STYLE===========================\\

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headPaper: {
    height: "auto",
  },
  title: {
    textAlign: "center",
    width: "100%",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
}));

//=================================MAIN FUNCTION===========================\\

function Employee_Profile(props) {
  const tableRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  //=================================STATES===========================\\
  const [detail, setDetail] = useState({});
  const [is_data_load, setDataLoad] = useState(false);
  //=================================FUNCTIONS===========================\\
  const get_profile_detail = async () => {
    const response = await profile_detail(props.match.params.id);
    console.log(response);
   if (response !== null) {
       setDetail(response);
     setDataLoad(true);
   } else {
    enqueueSnackbar("something went wrong", { variant: "error" });
  }
  };
  const handleback = () => {
    history.goBack();
  };

 

  //=================================USE EFFECT===========================\\
  useEffect(async () => {
    await get_profile_detail();
  }, []);
  //=================================DESIGN===========================\\
  if (is_data_load == false) {
    return <CircularProgress style={{ marginLeft: "50%", marginTop: "15%" }} />;
  }
  
  
  //=================================DETAIL DESIGN===========================\\

  return (
    <Grid container className={classes.root} spacing={3}>
      <ArrowBackIcon
        style={{
          cursor: "pointer",
          marginLeft: "50px",
          marginTop: "10px",
        }}
        onClick={handleback}
      />
      <Typography variant="h4" className={classes.title}>
        User Profile Detail
      </Typography>
      
         
      {/* =====================USER DETAIL========================== */}
      <Grid item xs={4} style={{ marginTop: 20 }}>
        <Paper elevation={3}>
         <img src={detail.picture} style={{width:"100%",height:270}}></img>
        </Paper>
      </Grid>
      <Grid item xs={8} style={{ marginTop: 20 }}>
        <Paper elevation={3} className={classes.headPaper} >
          
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
                Name:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
              {detail.firstName + " " + detail.lastName}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Date of Birth:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.dateOfBirth}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Email:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.email}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Registration Date:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.registerDate}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Phone:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.phone}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      
    </Grid>
  );
}
export default withRouter(Employee_Profile);
