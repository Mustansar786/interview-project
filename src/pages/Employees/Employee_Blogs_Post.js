import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { user_post_detail } from "../../DAL/Employees/Employees";
import { s3baseUrl } from "../../config/config";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MaterialTable from "material-table";
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

function Employee_Blogs_Post(props) {
  const tableRef = React.useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  //=================================STATES===========================\\
  const [blog_post, setBlog_Post] = useState([]);
  const [is_data_load, setDataLoad] = useState(false);
  //=================================FUNCTIONS===========================\\
  const get_post_detail = async () => {
    const response = await user_post_detail(props.match.params.id);
    console.log(response.data);
   if (response.data.length > 0) {
    setBlog_Post(response.data);
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
    await get_post_detail();
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
        Blog Posts
      </Typography>
      
         
      {/* =====================USER DETAIL========================== */}
      {blog_post.map((detail,i)=> {
          return (
              <>
      <Grid item xs={4} style={{ marginTop: 20 }}>
        <Paper elevation={3} className={classes.headPaper}>
         <img src={detail.image} style={{width:"100%",height:270}}></img>
         
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Blog Name:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.text}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Owner Name:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.owner.firstName + " " + detail.owner.lastName}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
              Likes:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.likes}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box p={1}>
              <Typography variant="h6" gutterBottom>
               Publish Date:
              </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="subtitle1" style={{ marginTop: 3 }}>
                {detail.publishDate.substring(0,10)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      </>
      )
      })}
      
      
    </Grid>
  );
}
export default withRouter(Employee_Blogs_Post);
